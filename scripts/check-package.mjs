import { access, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const packageUrl = new URL('../package.json', import.meta.url)
const packageJson = JSON.parse(await readFile(packageUrl, 'utf8'))
const requiredFields = ['name', 'version', 'description', 'license', 'repository', 'engines', 'types', 'exports', 'files']

for (const field of requiredFields) {
  if (!packageJson[field]) {
    throw new Error(`package.json is missing ${field}`)
  }
}

if (packageJson.name !== 'prism-ui') {
  throw new Error(`Unexpected package name: ${packageJson.name}`)
}

if (!packageJson.peerDependencies?.['@mickyballadelli/matrix']) {
  throw new Error('Matrix must remain a peer dependency')
}

for (const [name, target] of Object.entries(packageJson.exports)) {
  if (typeof target !== 'string') {
    throw new Error(`Export ${name} must point to a string path`)
  }

  await access(new URL(target.replace(/^\.\//, ''), packageUrl))
}

for (const file of packageJson.files) {
  await access(new URL(file, packageUrl))
}

const packagePath = fileURLToPath(packageUrl)
console.log(`Package metadata is ready: ${packagePath}`)
