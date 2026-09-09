#!/bin/sh

set -eu

if [ "$#" -gt 1 ]; then
  echo "Usage: ./scripts/bump-version.sh [major|minor|patch|prerelease|version]" >&2
  exit 1
fi

root_directory=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$root_directory"

release_type=${1:-patch}
npm version "$release_type" --no-git-tag-version

echo "Version updated; package-lock.json was refreshed by npm."