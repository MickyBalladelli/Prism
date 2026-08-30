# Migration notes

## From the pre-P2 alpha surface

- Install `@mickyballadelli/matrix` alongside `@mickyballadelli/prism`; Matrix is a peer dependency.
- Apply `prismTheme` to an app root so component tokens, focus styles, and reduced-motion rules are active.
- `CodeViewer` previews in the showcase are read-only. Applications can still opt into `editable` and bind `code` to a writable Matrix signal.
- Table settings helpers are now safe to use with persisted values: pass untrusted strings through `parseTableSettings` before applying them.
- New composition primitives (`FormField`, `Stack`, `Grid`, `Separator`, `Avatar`, `Tag`, and `IconButton`) are additive and do not change existing component names.

Prism remains alpha software. Check the changelog before upgrading across minor versions.

## Matrix compatibility policy

Prism supports Matrix versions accepted by the `@mickyballadelli/matrix` peer range in `package.json`. Alpha releases may widen or raise that range when Prism needs a Matrix runtime contract; the changelog will call out those changes.
