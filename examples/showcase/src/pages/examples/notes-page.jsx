import { component, computed, createForm, effect, html, keyed, onMount, signal } from '@mickyballadelli/matrix'
import { Alert, Avatar, Button, Card, EmptyState, FormField, PlusIcon, SearchIcon, Tag, TextField } from 'prism-ui'
import { ExampleMetric, ExamplePageShell } from '../example-page-shell.jsx'

const defaultNotes = [
  { id: 'welcome', title: 'Welcome to the desk', body: 'Signals keep this note list and editor in sync.', tags: ['matrix', 'guide'], updated: 'Today' },
  { id: 'ideas', title: 'Ideas worth keeping', body: 'Search by title, body, or tag. The list stays fast and focused.', tags: ['planning'], updated: 'Yesterday' },
  { id: 'launch', title: 'Launch checklist', body: 'Polish the empty state, verify keyboard paths, and ship the calm version.', tags: ['release', 'product'], updated: 'Monday' }
]

function copyNotes(notes) {
  return notes.map(note => ({ ...note, tags: [...note.tags] }))
}

function readStoredNotes(storage, key) {
  try {
    const value = JSON.parse(storage?.getItem(key) ?? 'null')
    return Array.isArray(value) ? value : copyNotes(defaultNotes)
  } catch {
    return copyNotes(defaultNotes)
  }
}

function NoteRow({ note, selected, onSelect, onDelete }) {
  return (
    <li class={`notes-row ${selected ? 'is-selected' : ''}`}>
      <button class="notes-row-select" type="button" onClick={() => onSelect(note.id)}>
        <span class="notes-row-topline"><strong>{note.title || 'Untitled note'}</strong><small>{note.updated}</small></span>
        <span class="notes-row-preview">{note.body || 'No content yet'}</span>
        <span class="notes-row-tags">{note.tags.map(tag => <Tag key={`${note.id}-${tag}`} tone="neutral">{tag}</Tag>)}</span>
      </button>
      <Button class="notes-delete-button" variant="tertiary" ariaLabel={`Delete ${note.title || 'untitled note'}`} onClick={() => onDelete(note.id)}>Delete</Button>
    </li>
  )
}

export function NotesPage({ example, link }) {
  let storage = null
  try {
    storage = globalThis.localStorage
  } catch {
    storage = null
  }
  const storageKey = 'prism-showcase-notes'
  const notes = signal(readStoredNotes(storage, storageKey))
  const search = signal('')
  const selectedId = signal('welcome')
  const status = signal('')
  const editor = createForm({ title: defaultNotes[0].title, body: defaultNotes[0].body, tags: defaultNotes[0].tags.join(', ') }, {
    title: value => value.trim() ? undefined : 'Title is required',
    body: value => value.trim() ? undefined : 'Body is required'
  }, { name: 'showcase-notes-editor' })

  const filteredNotes = computed(() => {
    const query = search.value.trim().toLowerCase()
    if (!query) return notes.value
    return notes.value.filter(note => [note.title, note.body, ...note.tags].some(value => String(value).toLowerCase().includes(query)))
  })
  const noteRows = computed(() => keyed(filteredNotes.value.map(note => component(NoteRow, { note, selected: selectedId.value === note.id, onSelect: selectNote, onDelete: deleteNote }, note.id)), row => row.props.note.id))
  const editorStatus = computed(() => status.value ? Alert({ tone: status.value === 'Saved locally' ? 'success' : 'info', title: status.value, children: status.value === 'Saved locally' ? 'Your note is safe in this browser.' : 'The editor is still available for this session.' }) : null)
  const editorErrors = computed(() => Object.entries(editor.errors.value).map(([field, message]) => html`<li key=${field}>${message}</li>`))

  function selectNote(id) {
    const note = notes.value.find(candidate => candidate.id === id)
    if (!note) return
    selectedId.value = id
    editor.reset({ title: note.title, body: note.body, tags: note.tags.join(', ') })
    status.value = ''
  }

  function createNote() {
    selectedId.value = null
    editor.reset({ title: '', body: '', tags: '' })
    status.value = ''
  }

  function saveNote() {
    if (Object.keys(editor.validate()).length > 0) return false
    const values = editor.values.value
    const nextNote = {
      id: selectedId.value ?? `note-${Date.now()}`,
      title: values.title.trim(),
      body: values.body.trim(),
      tags: values.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      updated: 'Just now'
    }

    if (selectedId.value) {
      notes.update(items => items.map(note => note.id === selectedId.value ? nextNote : note))
    } else {
      notes.update(items => [nextNote, ...items])
      selectedId.value = nextNote.id
    }
    status.value = 'Saved locally'
    return true
  }

  function deleteNote(id) {
    notes.update(items => items.filter(note => note.id !== id))
    if (selectedId.value === id) createNote()
    status.value = 'Note deleted'
  }

  const stopStorage = effect(() => {
    try {
      storage?.setItem(storageKey, JSON.stringify(notes.value))
    } catch {
      status.value = 'Local storage is unavailable'
    }
  })
  onMount(() => stopStorage)

  const editorBody = control => html`<textarea class="notes-editor-textarea" id="${control.id}" aria-describedby="${control.ariaDescribedBy}" aria-invalid="${control.ariaInvalid ? 'true' : undefined}" ?required=${control.required} use:bind=${editor.fields.body} placeholder="Write what matters…"></textarea>`

  return (
    <ExamplePageShell example={example} link={link}>
      <section class="example-window notes-window" aria-label="Prism Notes application">
        <header class="notes-app-header">
          <div class="notes-app-brand"><span class="notes-brand-mark" aria-hidden="true">N</span><div><strong>Prism Notes</strong><small>A quieter place to think</small></div></div>
          <div class="notes-header-actions"><Tag tone="success">Saved locally</Tag><Avatar name="Ada Lovelace" status="online" size="small" /></div>
        </header>
        <div class="notes-metrics"><ExampleMetric label="Notes" value={computed(() => notes.value.length)} detail="in your desk" tone="info" /><ExampleMetric label="Matches" value={computed(() => filteredNotes.value.length)} detail="after search" tone="accent" /><ExampleMetric label="Storage" value="Local" detail="private by default" tone="success" /></div>
        <div class="notes-toolbar">
          <div class="notes-search"><SearchIcon size="1em" ariaLabel="Search" /><TextField value={search} ariaLabel="Search notes" placeholder="Search title, body, or tag" /></div>
          <Button icon={<PlusIcon />} onClick={createNote}>New note</Button>
        </div>
        <div class="notes-layout">
          <Card class="notes-list-card">
            <div class="notes-list-heading"><div><p class="eyebrow">Your desk</p><h2>All notes</h2></div><span>{computed(() => `${filteredNotes.value.length} shown`)}</span></div>
            {computed(() => filteredNotes.value.length ? html`<ul class="notes-list">${noteRows}</ul>` : EmptyState({ status: 'filtered', title: 'No notes found', description: 'Try another word, tag, or phrase.' }))}
          </Card>
          <Card class="notes-editor-card">
            <div class="notes-editor-heading"><div><p class="eyebrow">Writing desk</p><h2>{computed(() => selectedId.value ? 'Edit note' : 'New note')}</h2></div><span class="notes-editor-status">Autosave on</span></div>
            <form onSubmit={event => { event.preventDefault(); saveNote() }}>
              <FormField label="Title" required error={computed(() => editor.errors.value.title)} control={control => TextField({ ...control, value: editor.fields.title, placeholder: 'Give the note a clear name' })} />
              <FormField label="Body" required hint="Keep the useful sentence. The rest can wait." error={computed(() => editor.errors.value.body)} control={editorBody} />
              <FormField label="Tags" hint="Separate tags with commas." control={control => TextField({ ...control, value: editor.fields.tags, placeholder: 'work, ideas' })} />
              <ul class="notes-form-errors" role="alert">{editorErrors}</ul>
              <div class="notes-editor-actions"><Button type="submit">Save note</Button><Button type="button" variant="secondary" onClick={createNote}>New blank note</Button></div>
            </form>
            {editorStatus}
          </Card>
        </div>
      </section>
    </ExamplePageShell>
  )
}
