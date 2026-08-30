import { ArrowRightIcon, Button } from '@mickyballadelli/prism'

export function ShowDetailsButton({ onClick }) {
  return (
    <Button
      class="card-action"
      label="Show details"
      icon={<ArrowRightIcon />}
      iconPosition="end"
      onClick={onClick}
    />
  )
}
