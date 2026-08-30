# Prism application studies

These four pages adapt the Matrix examples into Prism surfaces. They live inside the showcase so each app can be inspected beside the component primitives it uses.

## Shopping Cart

The catalog, cart, and checkout views use Prism `Card`, `Button`, `Badge`, `FormField`, `TextField`, `EmptyState`, `Tag`, and `ToastRegion` components. Cart lines are keyed by product ID, totals are computed from the cart signal, and checkout validation stays inside the form boundary.

## Notes

The notes desk uses Prism `Card`, `TextField`, `FormField`, `Tag`, `Avatar`, `Alert`, and `EmptyState` components. Search is one computed filter over title, body, and tags. Note rows are keyed so selection changes do not recreate unrelated rows. Local storage is treated as an optional adapter.

## Dashboard

The operations view uses Prism `Card`, `Select`, `Progress`, `Badge`, `Tag`, and `Table` components. Metrics and trend bars are keyed, activity filtering stays reactive, and the async data boundary exposes refresh feedback. The timeline button records lightweight local interaction marks for the showcase demo.

## Real-time Chat

The chat view uses Prism `Card`, `Avatar`, `Pulse`, `Alert`, `TextField`, `Button`, and `Tag` components. Messages are keyed by socket message ID. The local echo socket mirrors the Matrix example and can be replaced by a real WebSocket adapter without changing the message surface.

## Performance notes

- Keep lists keyed by stable domain IDs.
- Keep derived totals, filters, and status labels in computed signals.
- Replace demo adapters with paginated or windowed services as data grows.
- Keep transport reconnect and backoff logic outside the render path.
