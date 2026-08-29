export const treeViewModels = Object.freeze({
  prism: Object.freeze({
    label: 'Prism',
    description: 'Floating glass tiles with the original Prism glow.'
  }),
  aurora: Object.freeze({
    label: 'Aurora',
    description: 'Soft iridescent light, generous spacing, and dreamy color.'
  }),
  nocturne: Object.freeze({
    label: 'Nocturne',
    description: 'A deep night-sky surface with cool luminous accents.'
  }),
  editorial: Object.freeze({
    label: 'Editorial',
    description: 'Quiet paper, strong typography, and a precise reading rhythm.'
  }),
  terminal: Object.freeze({
    label: 'Terminal',
    description: 'A focused command-deck treatment for technical navigation.'
  })
})

export const normalizeTreeViewModel = model => (
  typeof model === 'string' && Object.prototype.hasOwnProperty.call(treeViewModels, model)
    ? model
    : 'prism'
)
