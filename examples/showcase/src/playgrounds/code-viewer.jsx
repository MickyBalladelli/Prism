import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function CodeViewerPlayground() {
  const language = signal('javascript')
  const showLineNumbers = signal(true)
  const sampleCode = signal(codeLines(
    'const status = "ready"',
    '',
    'function announce(message) {',
    '  return `${message} · ${status}`',
    '}',
    '',
    'announce("Prism is live")'
  ))
  const javascript = computed(() => codeLines(
    'CodeViewer({',
    '  code: sampleCode,',
    `  language: "${language.value}",`,
    '  filename: "status.js",',
    `  lineNumbers: ${showLineNumbers.value},`,
    '  copyable: true,',
    '  syntaxColors: {',
    '    keyword: "#a8b5ff",',
    '    string: "#9ee4bf",',
    '    function: "#8bd9ff"',
    '  }',
    '})'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
  const codePreview = createCodePreview(codeLines(
    'CodeViewer({',
    '  code: sampleCode,',
    '  language,',
    '  filename: "status.js",',
    '  lineNumbers: showLineNumbers,',
    '  copyable: true,',
    '  syntaxColors: {',
    '    keyword: "#a8b5ff",',
    '    string: "#9ee4bf",',
    '    function: "#8bd9ff"',
    '  }',
    '})'
  ), { ...playgroundRuntime, sampleCode, language, showLineNumbers })

  return {
    javascript,
    jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="code-viewer-language">Language</label>
        <Select
          id="code-viewer-language"
          value={language}
          options={[
            { value: 'javascript', label: 'JavaScript' },
            { value: 'jsx', label: 'JSX' },
            { value: 'css', label: 'CSS' },
            { value: 'json', label: 'JSON' },
            { value: 'bash', label: 'Bash' }
          ]}
        />
        <CheckBox checked={showLineNumbers}>Show line numbers</CheckBox>
        <p class="playground-note">Edit the nested editor to change its displayed source. Use the controls to change how CodeViewer is configured.</p>
      </div>
    )
  }
}
