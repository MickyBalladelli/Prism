import { computed, Fragment, html, jsx, signal } from '@mickyballadelli/matrix'
import { compileJsx, jsRecipeToJsx } from './recipe-syntax.js'
import { Alert, AlertIcon, Avatar, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, createToastController, DownloadIcon, DropdownMenu, EmptyState, FileIcon, FolderIcon, FormField, Grid, Header, IconButton, ImageIcon, Label, Menu, MoreHorizontalIcon, Pagination, PlusIcon, Popover, Popup, Progress, Pulse, Select, SendIcon, Separator, serializeTableSettings, SettingsIcon, Skeleton, Spinner, SparkIcon, Stack, Table, Tabs, Tag, TextField, ToastRegion, Tooltip, TreeView } from 'prism-ui'

export const codeLines = (...lines) => lines.join('\n')

export const playgroundRuntime = {
  Alert,
  AlertIcon,
  Avatar,
  Background,
  Badge,
  Box,
  Button,
  Card,
  CheckBox,
  ClockIcon,
  CodeViewer,
  DownloadIcon,
  DropdownMenu,
  EmptyState,
  FileIcon,
  FolderIcon,
  FormField,
  Grid,
  Header,
  IconButton,
  ImageIcon,
  Label,
  Menu,
  MoreHorizontalIcon,
  Pagination,
  Popover,
  PlusIcon,
  Popup,
  Progress,
  Pulse,
  Select,
  SendIcon,
  Separator,
  serializeTableSettings,
  SettingsIcon,
  Skeleton,
  Spinner,
  SparkIcon,
  Stack,
  Table,
  Tabs,
  Tag,
  TextField,
  ToastRegion,
  Tooltip,
  TreeView,
  createToastController,
  computed,
  html,
  signal
}

export function createCodePreview(initialCode, scope = {}) {
  const javascript = signal(initialCode)
  let jsxSource = initialCode
  try {
    jsxSource = jsRecipeToJsx(initialCode)
  } catch {
    jsxSource = initialCode
  }
  const jsxCode = signal(jsxSource)
  const recipeLanguage = signal('jsx')

  const preview = (() => {
    try {
      const names = Object.keys(scope)
      const values = Object.values(scope)
      const source = compileJsx(jsxSource)
      return Function('jsx', 'Fragment', ...names, `'use strict'\nreturn (${source})`)(jsx, Fragment, ...values)
    } catch (error) {
      return html`<div class="playground-code-error"><strong>Preview paused</strong><span>${String(error?.message ?? error)}</span></div>`
    }
  })()

  return { javascript, jsxCode, recipeLanguage, preview, code: javascript }
}
