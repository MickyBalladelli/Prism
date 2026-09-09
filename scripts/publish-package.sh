#!/bin/sh

set -eu

root_directory=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$root_directory"

npm run check
npm pack --dry-run --cache .npm-cache
npm publish --access public --cache .npm-cache