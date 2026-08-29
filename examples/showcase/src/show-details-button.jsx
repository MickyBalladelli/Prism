import { Button } from 'prism-ui'

export function ShowDetailsButton({ onClick }) {
  return (
    <Button class="card-action" onClick={onClick}>
      <span class="button-icon" aria-hidden="true"></span>
      Show details
    </Button>
  )
}
