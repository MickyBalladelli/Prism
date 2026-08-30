export const treeViewModels = Object.freeze({
  prism: Object.freeze({
    label: 'Prism',
    description: 'Floating glass tiles with the original Prism glow.',
    background: Object.freeze({
      palette: 'midnight',
      animation: 'veil',
      baseColor: '#cdd8ee',
      accentColor: '#3657d6',
      glowColor: '#7ac7ff'
    })
  }),
  aurora: Object.freeze({
    label: 'Aurora',
    description: 'Soft iridescent light, generous spacing, and dreamy color.',
    background: Object.freeze({
      palette: 'aurora',
      animation: 'meridian',
      baseColor: '#d9d4f0',
      accentColor: '#6958de',
      glowColor: '#58bfc6'
    })
  }),
  nocturne: Object.freeze({
    label: 'Nocturne',
    description: 'A deep night-sky surface with cool luminous accents.',
    background: Object.freeze({
      palette: 'midnight',
      animation: 'veil',
      baseColor: '#080d1b',
      accentColor: '#7b8dff',
      glowColor: '#59c8ee'
    })
  }),
  editorial: Object.freeze({
    label: 'Editorial',
    description: 'Quiet paper, strong typography, and a precise reading rhythm.',
    background: Object.freeze({
      palette: 'tide',
      animation: 'silk',
      baseColor: '#e8dfd2',
      accentColor: '#2e6878',
      glowColor: '#df7654'
    })
  }),
  terminal: Object.freeze({
    label: 'Terminal',
    description: 'A focused command-deck treatment for technical navigation.',
    background: Object.freeze({
      palette: 'tide',
      animation: 'zephyr',
      baseColor: '#07100e',
      accentColor: '#45d483',
      glowColor: '#ffbd72'
    })
  })
})

export const normalizeTreeViewModel = model => (
  typeof model === 'string' && Object.prototype.hasOwnProperty.call(treeViewModels, model)
    ? model
    : 'prism'
)
