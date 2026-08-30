import { component, computed, keyed, onMount, signal } from '@mickyballadelli/matrix'
import { Alert, Avatar, Button, Card, ChatIcon, Pulse, SendIcon, Tag, TextField } from 'prism-ui'
import { ExampleMetric, ExamplePageShell } from '../example-page-shell.jsx'

const initialMessages = [
  { id: 'welcome', author: 'Matrix bot', text: 'Welcome to the local Prism chat.', time: '09:41' },
  { id: 'hint', author: 'Matrix bot', text: 'Send a message. The demo socket echoes it back.', time: '09:41' }
]

function createDemoSocket() {
  const listeners = new Map()
  let closed = false
  let sequence = 1
  const emit = (type, event = {}) => (listeners.get(type) ?? []).forEach(listener => listener(event))
  const socket = {
    readyState: 0,
    addEventListener(type, listener) {
      const current = listeners.get(type) ?? []
      current.push(listener)
      listeners.set(type, current)
    },
    removeEventListener(type, listener) {
      listeners.set(type, (listeners.get(type) ?? []).filter(candidate => candidate !== listener))
    },
    send(rawMessage) {
      if (closed || socket.readyState !== 1) throw new Error('Chat socket is not open')
      const message = JSON.parse(rawMessage)
      setTimeout(() => {
        if (!closed) emit('message', { data: JSON.stringify({ type: 'message', id: `echo-${sequence++}`, author: 'You', text: message.text, time: 'now' }) })
      }, 280)
    },
    close() {
      if (closed) return
      closed = true
      socket.readyState = 3
      emit('close')
    }
  }
  setTimeout(() => {
    if (!closed) {
      socket.readyState = 1
      emit('open')
    }
  }, 180)
  return socket
}

function ChatMessage({ message }) {
  const self = message.author === 'You'
  return (
    <li class={`chat-message ${self ? 'is-self' : ''}`}>
      {!self && <Avatar name={message.author} size="small" status="online" />}
      <div class="chat-message-bubble"><span class="chat-message-meta"><strong>{message.author}</strong><small>{message.time}</small></span><p>{message.text}</p></div>
      {self && <Avatar name={message.author} size="small" status="online" />}
    </li>
  )
}

export function ChatPage({ example, link }) {
  const socket = createDemoSocket()
  const messages = signal(initialMessages.map(message => ({ ...message })))
  const draft = signal('')
  const connection = signal('connecting')
  const messageViews = computed(() => keyed(messages.value.map(message => component(ChatMessage, { message }, message.id)), item => item.props.message.id))
  const connectionTone = computed(() => connection.value === 'connected' ? 'success' : connection.value === 'error' ? 'error' : 'warning')
  const connectionAlert = computed(() => connection.value === 'error' ? Alert({ tone: 'error', title: 'Connection issue', children: 'The local socket reported an error. Try sending again.' }) : connection.value === 'offline' ? Alert({ tone: 'warning', title: 'You are offline', children: 'Messages wait until the connection returns.' }) : null)

  const onOpen = () => connection.value = 'connected'
  const onClose = () => connection.value = 'offline'
  const onError = () => connection.value = 'error'
  const onMessage = event => {
    try {
      const message = JSON.parse(event.data)
      if (message?.type !== 'message' || typeof message.text !== 'string') return
      messages.update(items => [...items, { id: message.id, author: message.author ?? 'Remote user', text: message.text, time: message.time ?? 'now' }])
    } catch {
      connection.value = 'error'
    }
  }

  socket.addEventListener('open', onOpen)
  socket.addEventListener('close', onClose)
  socket.addEventListener('error', onError)
  socket.addEventListener('message', onMessage)

  onMount(() => () => {
    socket.removeEventListener('open', onOpen)
    socket.removeEventListener('close', onClose)
    socket.removeEventListener('error', onError)
    socket.removeEventListener('message', onMessage)
    socket.close()
  })

  function sendMessage() {
    const text = draft.value.trim()
    if (!text || socket.readyState !== 1) return false
    socket.send(JSON.stringify({ type: 'message', text }))
    draft.value = ''
    return true
  }

  return (
    <ExamplePageShell example={example} link={link}>
      <section class="example-window chat-window" aria-label="Prism real-time chat">
        <header class="chat-app-header">
          <div class="chat-room-title"><span class="chat-room-icon" aria-hidden="true"><ChatIcon size="1.2em" /></span><div><p class="eyebrow">Workspace / #lounge</p><h2>Prism Lounge</h2><p>A small room for clear thinking.</p></div></div>
          <div class="chat-header-actions"><Tag tone="success">Local echo</Tag><Avatar name="Ada Lovelace" status="online" size="small" /></div>
        </header>
        <div class="chat-metrics"><ExampleMetric label="Members" value="08" detail="in this room" tone="info" /><ExampleMetric label="Messages" value={computed(() => messages.value.length)} detail="this session" tone="accent" /><ExampleMetric label="Transport" value="WS" detail="ready when you are" tone="success" /></div>
        <div class="chat-layout">
          <Card class="chat-conversation-card">
          <div class="chat-conversation-heading"><div><p class="eyebrow">Conversation</p><h3>Say something useful.</h3></div><Pulse status={connectionTone} size="small" animation="once" ariaLabel={computed(() => `Connection ${connection.value}`)}>{connection}</Pulse></div>
            <div class="chat-status-message">{connectionAlert}</div>
            <ul class="chat-log" aria-live="polite">{messageViews}</ul>
            <form class="chat-compose" onSubmit={event => { event.preventDefault(); sendMessage() }}>
              <TextField value={draft} ariaLabel="Message" placeholder={computed(() => connection.value === 'connected' ? 'Write a message…' : 'Connecting…')} disabled={computed(() => connection.value !== 'connected')} />
              <Button type="submit" icon={<SendIcon />} iconPosition="end" disabled={computed(() => connection.value !== 'connected' || !draft.value.trim())}>Send</Button>
            </form>
          </Card>
          <Card class="chat-people-card">
            <div class="chat-people-heading"><p class="eyebrow">In the room</p><h3>People with you.</h3></div>
            <div class="chat-people-list"><div><Avatar name="Ada Lovelace" status="online" size="small" /><span class="chat-person-copy"><strong>Ada Lovelace</strong><small>Product lead</small></span><Pulse status="success" size="small" animation="once" ariaLabel="Online" /></div><div><Avatar name="Boudica" status="online" size="small" /><span class="chat-person-copy"><strong>Boudica</strong><small>Design systems</small></span><Pulse status="success" size="small" animation="once" ariaLabel="Online" /></div><div><Avatar name="Cato" status="away" size="small" /><span class="chat-person-copy"><strong>Cato</strong><small>Infrastructure</small></span><Pulse status="warning" size="small" animation="once" ariaLabel="Away" /></div></div>
            <div class="chat-people-note"><Tag tone="neutral">WebSocket-ready</Tag><p>Swap the local echo for a real <code>WebSocket</code> adapter when the backend is ready.</p></div>
          </Card>
        </div>
      </section>
    </ExamplePageShell>
  )
}
