import { component, computed, html, keyed, signal } from '@mickyballadelli/matrix'
import { Alert, Avatar, Button, Card, EmptyState, PlusIcon, SearchIcon, Tag, TextField, readStorageValue, writeStorageValue } from '@mickyballadelli/prism'
import { ExampleMetric, ExamplePageShell } from '../example-page-shell.jsx'

const storageKey = 'prism-showcase-notes'
const defaultNotes = [
  { id: 'welcome', title: 'Welcome to the desk', body: 'Signals keep this note list and editor in sync.', tags: ['matrix', 'guide'], updated: 'Today' },
  { id: 'ideas', title: 'Ideas worth keeping', body: 'Search by title, body, or tag. The list stays fast and focused.', tags: ['planning'], updated: 'Yesterday' },
  { id: 'launch', title: 'Launch checklist', body: 'Polish the empty state, verify keyboard paths, and ship the calm version.', tags: ['release', 'product'], updated: 'Monday' }
]

function copyNotes(notes) {
  return notes.map(note => ({ ...note, tags: [...note.tags] }))
}

function readStoredNotes() {
  try {
    const value = JSON.parse(readStorageValue(storageKey, 'null'))
    return Array.isArray(value) ? value : copyNotes(defaultNotes)
  } catch {
    return copyNotes(defaultNotes)
  }
}

function persistNotes(items) {
  return writeStorageValue(storageKey, JSON.stringify(items))
}

function parseTags(value) {
  return String(value ?? '').split(',').map(tag => tag.trim()).filter(Boolean)
}

function NoteRow({ note, selectedId, onSelect, onDelete }) {
  return (
    <li class={computed(() => `notes-row ${selectedId.value === note.id ? 'is-selected' : ''}`)}>
      <button class="notes-row-select" type="button" onClick={() => onSelect(note.id)}>
        <span class="notes-row-topline"><strong>{note.title || 'Untitled note'}</strong><small>{note.updated}</small></span>
        <span class="notes-row-preview">{note.body || 'No content yet'}</span>
        <span class="notes-row-tags">{note.tags.map(tag => <Tag key={`${note.id}-${tag}`} tone="neutral">{tag}</Tag>)}</span>
      </button>
      <button class="notes-delete-button prism-button prism-button-tertiary prism-button-small prism-button-rounded" type="button" aria-label={`Delete ${note.title || 'untitled note'}`} onClick={() => onDelete(note.id)}>Delete</button>
    </li>
  )
}

export function NotesPage({ example, link, navigateTo }) {
  const initialNotes = readStoredNotes()
  const notes = signal(initialNotes)
  const search = signal('')
  const selectedId = signal(initialNotes[0]?.id ?? null)
  const status = signal('')
  const selected = initialNotes.find(note => note.id === selectedId.peek())
  const title = signal(selected?.title ?? '')
  const body = signal(selected?.body ?? '')
  const tags = signal(selected?.tags?.join(', ') ?? '')
  const titleError = signal('')
  const bodyError = signal('')
  const editorEpoch = signal(0)

  const filteredNotes = computed(() => {
    const query = search.value.trim().toLowerCase()
    if (!query) return notes.value
    return notes.value.filter(note => [note.title, note.body, ...note.tags].some(value => String(value).toLowerCase().includes(query)))
  })
  const noteRows = computed(() => keyed(
    filteredNotes.value.map(note => component(NoteRow, { note, selectedId, onSelect: selectNote, onDelete: deleteNote }, note.id)),
    row => row.props.note.id
  ))
  const editorStatus = computed(() => status.value
    ? Alert({
      tone: status.value === 'Saved locally' ? 'success' : status.value === 'Note deleted' ? 'info' : 'info',
      title: status.value,
      children: status.value === 'Saved locally' ? 'Your note is safe in this browser.' : 'The editor is still available for this session.'
    })
    : null)
  const listContent = computed(() => filteredNotes.value.length
    ? html`<ul class="notes-list">${noteRows}</ul>`
    : EmptyState({ status: 'filtered', title: 'No notes found', description: 'Try another word, tag, or phrase.' }))

  function loadNote(note) {
    title.value = note?.title ?? ''
    body.value = note?.body ?? ''
    tags.value = note?.tags?.join(', ') ?? ''
    titleError.value = ''
    bodyError.value = ''
    editorEpoch.value += 1
  }

  const titleField = computed(() => {
    editorEpoch.value
    return html`<input class="text-field text-field-medium" aria-label="Title" placeholder="Give the note a clear name" use:bind=${title}>`
  })
  const bodyField = computed(() => {
    editorEpoch.value
    return html`<textarea class="notes-editor-textarea" aria-label="Body" placeholder="Write what matters…" use:bind=${body}></textarea>`
  })
  const tagsField = computed(() => {
    editorEpoch.value
    return html`<input class="text-field text-field-medium" aria-label="Tags" placeholder="work, ideas" use:bind=${tags}>`
  })

  function selectNote(id) {
    const note = notes.peek().find(candidate => candidate.id === id)
    if (!note) return
    selectedId.value = id
    loadNote(note)
    status.value = ''
  }

  function createNote() {
    selectedId.value = null
    loadNote()
    status.value = ''
  }

  function saveNote(event) {
    event?.preventDefault()
    const nextTitle = title.peek().trim()
    const nextBody = body.peek().trim()
    titleError.value = nextTitle ? '' : 'Title is required'
    bodyError.value = nextBody ? '' : 'Body is required'
    if (!nextTitle || !nextBody) return false

    const nextNote = {
      id: selectedId.peek() ?? `note-${Date.now()}`,
      title: nextTitle,
      body: nextBody,
      tags: parseTags(tags.peek()),
      updated: 'Just now'
    }

    const nextItems = selectedId.peek()
      ? notes.peek().map(note => note.id === nextNote.id ? nextNote : note)
      : [nextNote, ...notes.peek()]
    notes.value = nextItems
    selectedId.value = nextNote.id
    status.value = persistNotes(nextItems) ? 'Saved locally' : 'Local storage is unavailable'
    return true
  }

  function deleteNote(id) {
    const nextItems = notes.peek().filter(note => note.id !== id)
    notes.value = nextItems
    persistNotes(nextItems)
    if (selectedId.peek() === id) createNote()
    status.value = 'Note deleted'
  }

  return (
    <ExamplePageShell example={example} link={link} navigateTo={navigateTo}>
      <section class="example-window notes-window" aria-label="Prism Notes application">
        <header class="notes-app-header">
          <div class="notes-app-brand"><span class="notes-brand-mark" aria-hidden="true">N</span><div><strong>Prism Notes</strong><small>A quieter place to think</small></div></div>
          <div class="notes-header-actions"><Tag tone="success">Saved locally</Tag><Avatar name="Ada Lovelace" status="online" size="small" /></div>
        </header>
        <div class="notes-metrics"><ExampleMetric label="Notes" value={computed(() => notes.value.length)} detail="in your desk" tone="info" /><ExampleMetric label="Matches" value={computed(() => filteredNotes.value.length)} detail="after search" tone="accent" /><ExampleMetric label="Storage" value="Local" detail="private by default" tone="success" /></div>
        <div class="notes-toolbar">
          <div class="notes-search"><SearchIcon size="1em" ariaLabel="Search" /><TextField value={search} ariaLabel="Search notes" placeholder="Search title, body, or tag" /></div>
          <button class="prism-button prism-button-primary prism-button-medium prism-button-rounded" type="button" onClick={createNote}>
            <span class="prism-button-icon" aria-hidden="true">{PlusIcon({})}</span>
            <span class="prism-button-label">New note</span>
          </button>
        </div>
        <div class="notes-layout">
          <Card class="notes-list-card">
            <div class="notes-list-heading"><div><p class="eyebrow">Your desk</p><h2>All notes</h2></div><span>{computed(() => `${filteredNotes.value.length} shown`)}</span></div>
            {listContent}
          </Card>
          <Card class="notes-editor-card">
            <div class="notes-editor-heading"><div><p class="eyebrow">Writing desk</p><h2>{computed(() => selectedId.value ? 'Edit note' : 'New note')}</h2></div><span class="notes-editor-status">Saved on request</span></div>
            <form novalidate onSubmit={saveNote}>
              <label class="prism-form-field">
                <span class="prism-form-field-label">Title <span class="prism-form-field-required" aria-hidden="true">*</span></span>
                {titleField}
                {computed(() => titleError.value ? html`<div class="prism-form-field-error" role="alert">${titleError.value}</div>` : null)}
              </label>
              <label class="prism-form-field">
                <span class="prism-form-field-label">Body <span class="prism-form-field-required" aria-hidden="true">*</span></span>
                {bodyField}
                <div class="prism-form-field-hint">Keep the useful sentence. The rest can wait.</div>
                {computed(() => bodyError.value ? html`<div class="prism-form-field-error" role="alert">${bodyError.value}</div>` : null)}
              </label>
              <label class="prism-form-field">
                <span class="prism-form-field-label">Tags</span>
                {tagsField}
                <div class="prism-form-field-hint">Separate tags with commas.</div>
              </label>
              <div class="notes-editor-actions">
                <button class="prism-button prism-button-primary prism-button-medium prism-button-rounded" type="submit">Save note</button>
                <button class="prism-button prism-button-secondary prism-button-medium prism-button-rounded" type="button" onClick={createNote}>New blank note</button>
              </div>
            </form>
            {editorStatus}
          </Card>
        </div>
      </section>
    </ExamplePageShell>
  )
}
