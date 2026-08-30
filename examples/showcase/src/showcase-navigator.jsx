import { Navigator, TreeView } from '@mickyballadelli/prism'

export function ShowcaseNavigator({
  ariaLabel = 'Prism UI navigation',
  class: classValue = '',
  expanded,
  id,
  items = [],
  model = 'prism',
  onExpandedChange,
  onRender,
  sticky = false,
  stickyTop = '0px'
}) {
  return (
    <Navigator
      id={id}
      class={classValue}
      ariaLabel={ariaLabel}
      sticky={sticky}
      stickyTop={stickyTop}
    >
      <TreeView
        ariaLabel={ariaLabel}
        items={items}
        model={model}
        itemVariant="minimal"
        expanded={expanded}
        filter={true}
        expandCollapse={true}
        onExpandedChange={onExpandedChange}
        onRender={onRender}
      />
    </Navigator>
  )
}
