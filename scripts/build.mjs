import { readdir } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const sourceRoot = fileURLToPath(new URL('../src', import.meta.url))

async function collectJavaScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await collectJavaScriptFiles(path))
    } else if (entry.name.endsWith('.js')) {
      files.push(path)
    }
  }

  return files
}

const files = await collectJavaScriptFiles(sourceRoot)
for (const file of files) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' })
  } catch {
    process.exitCode = 1
  }
}

if (process.exitCode) {
  process.exit(process.exitCode)
}

console.log(`Build syntax check passed for ${files.length} source files`)
