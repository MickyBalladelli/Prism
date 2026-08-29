import { globalCss } from 'matrix'

export const prismThemeValues = Object.freeze({
  colors: Object.freeze({
    page: '#f5f7fb',
    surface: '#ffffff',
    surfaceGlass: 'rgb(255 255 255 / 84%)',
    surfaceCard: 'rgb(255 255 255 / 82%)',
    surfaceTint: '#f8faff',
    white: '#ffffff',
    whiteStrong: 'rgb(255 255 255 / 90%)',
    whiteSoft: 'rgb(255 255 255 / 24%)',
    whiteFaint: 'rgb(255 255 255 / 20%)',
    whiteTint: 'rgb(255 255 255 / 12%)',
    ink: '#1d2638',
    text: '#53617a',
    textMuted: '#6b7892',
    textSoft: '#7b879e',
    textSubtle: '#8a95a8',
    placeholder: '#aab3c2',
    border: '#e5e9f1',
    borderStrong: '#cbd3e1',
    borderInput: '#dbe1eb',
    borderFaint: '#edf0f5',
    accent: '#ef685a',
    accentBright: '#f26b5e',
    accentGlow: 'rgb(242 107 94 / 12%)',
    accentSoft: '#fff0ed',
    accentHover: '#dc594c',
    action: '#3657d6',
    actionEnd: '#4e73ea',
    actionHover: '#2f4dc5',
    actionHoverEnd: '#4569df',
    actionActive: '#2842ae',
    actionActiveEnd: '#3a58c7',
    primary: '#3657d6',
    primaryEnd: '#4e73ea',
    primaryHover: '#2f4dc5',
    primaryHoverEnd: '#4569df',
    primaryActive: '#2842ae',
    primaryActiveEnd: '#3a58c7',
    secondary: '#708099',
    secondaryEnd: '#8594ab',
    secondaryHover: '#62718a',
    secondaryHoverEnd: '#77859b',
    secondaryActive: '#556178',
    secondaryActiveEnd: '#677387',
    tertiary: '#f08a6b',
    tertiaryEnd: '#f4a17e',
    tertiaryHover: '#e57d5d',
    tertiaryHoverEnd: '#ef9471',
    tertiaryActive: '#cf684b',
    tertiaryActiveEnd: '#de7d5e',
    error: '#dc2626',
    errorEnd: '#ef4444',
    errorHover: '#c81f1f',
    errorHoverEnd: '#df3b3b',
    errorActive: '#b91c1c',
    errorActiveEnd: '#cd3030',
    warning: '#d97706',
    warningEnd: '#f59e0b',
    warningHover: '#c56b05',
    warningHoverEnd: '#e68f08',
    warningActive: '#a95b05',
    warningActiveEnd: '#c97908',
    information: '#0284c7',
    informationEnd: '#0ea5e9',
    informationHover: '#036fa8',
    informationHoverEnd: '#0b92d0',
    informationActive: '#075985',
    informationActiveEnd: '#0478b1',
    actionPreview: '#7787a4',
    actionPreviewHover: '#657593',
    actionGlow: 'rgb(54 87 214 / 24%)',
    actionHoverGlow: 'rgb(54 87 214 / 32%)',
    actionActiveShadow: 'rgb(40 66 174 / 30%)',
    actionFocusGlow: 'rgb(54 87 214 / 24%)',
    focus: '#4e73ea',
    focusGlow: 'rgb(78 115 234 / 14%)',
    focusStrongGlow: 'rgb(78 115 234 / 20%)',
    invalidGlow: 'rgb(239 104 90 / 12%)',
    success: '#3c9b7a',
    successBright: '#53c69d',
    successGlow: 'rgb(83 198 157 / 15%)',
    previewGlow: 'rgb(166 142 241 / 12%)',
    lavenderBorder: '#d9d1ff',
    lavenderSurface: '#f0edff',
    mintBorder: '#c7ebdf',
    mintSurface: '#eaf9f4',
    peachBorder: '#f5d5c9',
    peachSurface: '#fff1eb'
  }),
  fontSizes: Object.freeze({
    micro: '.7rem',
    label: '.72rem',
    small: '.75rem',
    bodySmall: '.78rem',
    compact: '.76rem',
    body: '.82rem',
    copy: '.9rem',
    cardCopy: '.92rem',
    ui: '.8rem',
    lead: '1.05rem',
    heading: '1.45rem',
    hero: 'clamp(3rem, 7vw, 5.8rem)',
    detailHero: 'clamp(3rem, 7vw, 5rem)'
  }),
  radii: Object.freeze({
    control: '.6rem',
    card: '1.25rem',
    preview: '.85rem',
    surface: '1rem'
  }),
  shadows: Object.freeze({
    card: '0 .9rem 2.5rem rgb(37 49 78 / 6%)',
    action: '0 .45rem 1rem rgb(54 87 214 / 24%), inset 0 1px 0 rgb(255 255 255 / 20%)',
    actionHover: '0 .6rem 1.2rem rgb(54 87 214 / 32%), inset 0 1px 0 rgb(255 255 255 / 24%)',
    actionActive: '0 .15rem .35rem rgb(54 87 214 / 20%), inset 0 2px 5px rgb(40 66 174 / 30%)',
    secondary: '0 .36rem .9rem rgb(112 128 153 / 20%), inset 0 1px 0 rgb(255 255 255 / 16%)',
    secondaryHover: '0 .52rem 1.1rem rgb(112 128 153 / 26%), inset 0 1px 0 rgb(255 255 255 / 20%)',
    secondaryActive: '0 .12rem .32rem rgb(112 128 153 / 18%), inset 0 2px 5px rgb(65 79 102 / 24%)',
    tertiary: '0 .42rem .96rem rgb(240 138 107 / 22%), inset 0 1px 0 rgb(255 255 255 / 18%)',
    tertiaryHover: '0 .56rem 1.14rem rgb(240 138 107 / 28%), inset 0 1px 0 rgb(255 255 255 / 22%)',
    tertiaryActive: '0 .12rem .32rem rgb(240 138 107 / 18%), inset 0 2px 5px rgb(150 80 55 / 26%)',
    error: '0 .4rem .92rem rgb(220 38 38 / 22%), inset 0 1px 0 rgb(255 255 255 / 16%)',
    errorHover: '0 .54rem 1.08rem rgb(220 38 38 / 28%), inset 0 1px 0 rgb(255 255 255 / 22%)',
    errorActive: '0 .12rem .32rem rgb(220 38 38 / 18%), inset 0 2px 5px rgb(127 29 29 / 26%)',
    warning: '0 .4rem .92rem rgb(217 119 6 / 22%), inset 0 1px 0 rgb(255 255 255 / 16%)',
    warningHover: '0 .54rem 1.08rem rgb(217 119 6 / 28%), inset 0 1px 0 rgb(255 255 255 / 22%)',
    warningActive: '0 .12rem .32rem rgb(217 119 6 / 18%), inset 0 2px 5px rgb(120 53 15 / 26%)',
    information: '0 .4rem .92rem rgb(2 132 199 / 22%), inset 0 1px 0 rgb(255 255 255 / 16%)',
    informationHover: '0 .54rem 1.08rem rgb(2 132 199 / 28%), inset 0 1px 0 rgb(255 255 255 / 22%)',
    informationActive: '0 .12rem .32rem rgb(2 132 199 / 18%), inset 0 2px 5px rgb(12 74 110 / 26%)',
    success: '0 .4rem .92rem rgb(60 155 122 / 22%), inset 0 1px 0 rgb(255 255 255 / 16%)',
    successHover: '0 .54rem 1.08rem rgb(60 155 122 / 28%), inset 0 1px 0 rgb(255 255 255 / 22%)',
    successActive: '0 .12rem .32rem rgb(60 155 122 / 18%), inset 0 2px 5px rgb(24 101 73 / 26%)'
  })
})

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

const buttonPalettes = Object.freeze({
  cobalt: Object.freeze({
    '--prism-button-primary-border': 'rgb(54 87 214 / 20%)',
    '--prism-button-primary-background': 'linear-gradient(135deg, #3657d6, #4e73ea)',
    '--prism-button-primary-background-hover': 'linear-gradient(135deg, #2f4dc5, #4569df)',
    '--prism-button-primary-background-active': 'linear-gradient(135deg, #2842ae, #3a58c7)',
    '--prism-button-primary-shadow': '0 .45rem 1rem rgb(54 87 214 / 24%), inset 0 1px 0 rgb(255 255 255 / 20%)',
    '--prism-button-primary-shadow-hover': '0 .6rem 1.2rem rgb(54 87 214 / 32%), inset 0 1px 0 rgb(255 255 255 / 24%)',
    '--prism-button-primary-shadow-active': '0 .15rem .35rem rgb(54 87 214 / 20%), inset 0 2px 5px rgb(40 66 174 / 30%)',
    '--prism-button-secondary-border': 'rgb(112 128 153 / 22%)',
    '--prism-button-secondary-background': 'linear-gradient(135deg, #708099, #8594ab)',
    '--prism-button-secondary-background-hover': 'linear-gradient(135deg, #62718a, #77859b)',
    '--prism-button-secondary-background-active': 'linear-gradient(135deg, #556178, #677387)',
    '--prism-button-secondary-shadow': '0 .36rem .9rem rgb(112 128 153 / 20%), inset 0 1px 0 rgb(255 255 255 / 16%)',
    '--prism-button-secondary-shadow-hover': '0 .52rem 1.1rem rgb(112 128 153 / 26%), inset 0 1px 0 rgb(255 255 255 / 20%)',
    '--prism-button-secondary-shadow-active': '0 .12rem .32rem rgb(112 128 153 / 18%), inset 0 2px 5px rgb(65 79 102 / 24%)',
    '--prism-button-tertiary-border': 'rgb(240 138 107 / 22%)',
    '--prism-button-tertiary-background': 'linear-gradient(135deg, #f08a6b, #f4a17e)',
    '--prism-button-tertiary-background-hover': 'linear-gradient(135deg, #e57d5d, #ef9471)',
    '--prism-button-tertiary-background-active': 'linear-gradient(135deg, #cf684b, #de7d5e)',
    '--prism-button-tertiary-shadow': '0 .42rem .96rem rgb(240 138 107 / 22%), inset 0 1px 0 rgb(255 255 255 / 18%)',
    '--prism-button-tertiary-shadow-hover': '0 .56rem 1.14rem rgb(240 138 107 / 28%), inset 0 1px 0 rgb(255 255 255 / 22%)',
    '--prism-button-tertiary-shadow-active': '0 .12rem .32rem rgb(240 138 107 / 18%), inset 0 2px 5px rgb(150 80 55 / 26%)'
  }),
  iris: Object.freeze({
    '--prism-button-primary-border': 'rgb(109 94 247 / 20%)',
    '--prism-button-primary-background': 'linear-gradient(135deg, #6d5ef7, #8a76ff)',
    '--prism-button-primary-background-hover': 'linear-gradient(135deg, #5f4eeb, #7b66f8)',
    '--prism-button-primary-background-active': 'linear-gradient(135deg, #5343d4, #6c57e4)',
    '--prism-button-primary-shadow': '0 .45rem 1rem rgb(109 94 247 / 24%), inset 0 1px 0 rgb(255 255 255 / 20%)',
    '--prism-button-primary-shadow-hover': '0 .6rem 1.2rem rgb(109 94 247 / 32%), inset 0 1px 0 rgb(255 255 255 / 24%)',
    '--prism-button-primary-shadow-active': '0 .15rem .35rem rgb(109 94 247 / 20%), inset 0 2px 5px rgb(65 52 165 / 30%)',
    '--prism-button-secondary-border': 'rgb(100 116 139 / 22%)',
    '--prism-button-secondary-background': 'linear-gradient(135deg, #64748b, #7a889c)',
    '--prism-button-secondary-background-hover': 'linear-gradient(135deg, #56657b, #6c7a8e)',
    '--prism-button-secondary-background-active': 'linear-gradient(135deg, #4a576b, #5e6c80)',
    '--prism-button-secondary-shadow': '0 .36rem .9rem rgb(100 116 139 / 20%), inset 0 1px 0 rgb(255 255 255 / 16%)',
    '--prism-button-secondary-shadow-hover': '0 .52rem 1.1rem rgb(100 116 139 / 26%), inset 0 1px 0 rgb(255 255 255 / 20%)',
    '--prism-button-secondary-shadow-active': '0 .12rem .32rem rgb(100 116 139 / 18%), inset 0 2px 5px rgb(51 65 85 / 24%)',
    '--prism-button-tertiary-border': 'rgb(242 107 94 / 22%)',
    '--prism-button-tertiary-background': 'linear-gradient(135deg, #f26b5e, #f58a74)',
    '--prism-button-tertiary-background-hover': 'linear-gradient(135deg, #e66054, #ee7d68)',
    '--prism-button-tertiary-background-active': 'linear-gradient(135deg, #cf554b, #dd6d5b)',
    '--prism-button-tertiary-shadow': '0 .42rem .96rem rgb(242 107 94 / 22%), inset 0 1px 0 rgb(255 255 255 / 18%)',
    '--prism-button-tertiary-shadow-hover': '0 .56rem 1.14rem rgb(242 107 94 / 28%), inset 0 1px 0 rgb(255 255 255 / 22%)',
    '--prism-button-tertiary-shadow-active': '0 .12rem .32rem rgb(242 107 94 / 18%), inset 0 2px 5px rgb(145 64 50 / 26%)'
  }),
  teal: Object.freeze({
    '--prism-button-primary-border': 'rgb(15 118 110 / 22%)',
    '--prism-button-primary-background': 'linear-gradient(135deg, #0f766e, #159b91)',
    '--prism-button-primary-background-hover': 'linear-gradient(135deg, #0d675f, #11867f)',
    '--prism-button-primary-background-active': 'linear-gradient(135deg, #0b5852, #0e726b)',
    '--prism-button-primary-shadow': '0 .45rem 1rem rgb(15 118 110 / 24%), inset 0 1px 0 rgb(255 255 255 / 20%)',
    '--prism-button-primary-shadow-hover': '0 .6rem 1.2rem rgb(15 118 110 / 32%), inset 0 1px 0 rgb(255 255 255 / 24%)',
    '--prism-button-primary-shadow-active': '0 .15rem .35rem rgb(15 118 110 / 20%), inset 0 2px 5px rgb(12 78 74 / 30%)',
    '--prism-button-secondary-border': 'rgb(107 124 147 / 22%)',
    '--prism-button-secondary-background': 'linear-gradient(135deg, #6b7c93, #8190a5)',
    '--prism-button-secondary-background-hover': 'linear-gradient(135deg, #5e7087, #74849a)',
    '--prism-button-secondary-background-active': 'linear-gradient(135deg, #526278, #66768d)',
    '--prism-button-secondary-shadow': '0 .36rem .9rem rgb(107 124 147 / 20%), inset 0 1px 0 rgb(255 255 255 / 16%)',
    '--prism-button-secondary-shadow-hover': '0 .52rem 1.1rem rgb(107 124 147 / 26%), inset 0 1px 0 rgb(255 255 255 / 20%)',
    '--prism-button-secondary-shadow-active': '0 .12rem .32rem rgb(107 124 147 / 18%), inset 0 2px 5px rgb(57 69 86 / 24%)',
    '--prism-button-tertiary-border': 'rgb(245 158 11 / 22%)',
    '--prism-button-tertiary-background': 'linear-gradient(135deg, #f59e0b, #f7b84a)',
    '--prism-button-tertiary-background-hover': 'linear-gradient(135deg, #e39107, #efae36)',
    '--prism-button-tertiary-background-active': 'linear-gradient(135deg, #c97c06, #d89522)',
    '--prism-button-tertiary-shadow': '0 .42rem .96rem rgb(245 158 11 / 22%), inset 0 1px 0 rgb(255 255 255 / 18%)',
    '--prism-button-tertiary-shadow-hover': '0 .56rem 1.14rem rgb(245 158 11 / 28%), inset 0 1px 0 rgb(255 255 255 / 22%)',
    '--prism-button-tertiary-shadow-active': '0 .12rem .32rem rgb(245 158 11 / 18%), inset 0 2px 5px rgb(146 94 20 / 26%)'
  })
})

const cssTokens = Object.freeze({
  '--prism-button-padding': '.6rem .8rem',
  '--prism-button-border-width': '1px',
  '--prism-button-radius': prismThemeValues.radii.control,
  '--prism-button-font-size': prismThemeValues.fontSizes.small,
  '--prism-button-font-weight': '750',
  '--prism-button-transform-hover': 'translateY(-1px)',
  '--prism-button-transform-active': 'translateY(1px) scale(.98)',
  '--prism-button-focus-outline': `3px solid ${prismThemeValues.colors.actionFocusGlow}`,
  '--prism-button-focus-offset': '3px',
  '--prism-button-disabled-opacity': '.55',
  '--prism-button-primary-text': prismThemeValues.colors.white,
  '--prism-button-primary-border': prismThemeValues.colors.whiteSoft,
  '--prism-button-primary-background': `linear-gradient(135deg, ${prismThemeValues.colors.primary}, ${prismThemeValues.colors.primaryEnd})`,
  '--prism-button-primary-background-hover': `linear-gradient(135deg, ${prismThemeValues.colors.primaryHover}, ${prismThemeValues.colors.primaryHoverEnd})`,
  '--prism-button-primary-background-active': `linear-gradient(135deg, ${prismThemeValues.colors.primaryActive}, ${prismThemeValues.colors.primaryActiveEnd})`,
  '--prism-button-primary-shadow': prismThemeValues.shadows.action,
  '--prism-button-primary-shadow-hover': prismThemeValues.shadows.actionHover,
  '--prism-button-primary-shadow-active': prismThemeValues.shadows.actionActive,
  '--prism-button-secondary-text': prismThemeValues.colors.white,
  '--prism-button-secondary-border': 'rgb(100 116 139 / 22%)',
  '--prism-button-secondary-background': `linear-gradient(135deg, ${prismThemeValues.colors.secondary}, ${prismThemeValues.colors.secondaryEnd})`,
  '--prism-button-secondary-background-hover': `linear-gradient(135deg, ${prismThemeValues.colors.secondaryHover}, ${prismThemeValues.colors.secondaryHoverEnd})`,
  '--prism-button-secondary-background-active': `linear-gradient(135deg, ${prismThemeValues.colors.secondaryActive}, ${prismThemeValues.colors.secondaryActiveEnd})`,
  '--prism-button-secondary-shadow': prismThemeValues.shadows.secondary,
  '--prism-button-secondary-shadow-hover': prismThemeValues.shadows.secondaryHover,
  '--prism-button-secondary-shadow-active': prismThemeValues.shadows.secondaryActive,
  '--prism-button-tertiary-text': prismThemeValues.colors.white,
  '--prism-button-tertiary-border': 'rgb(231 111 81 / 22%)',
  '--prism-button-tertiary-background': `linear-gradient(135deg, ${prismThemeValues.colors.tertiary}, ${prismThemeValues.colors.tertiaryEnd})`,
  '--prism-button-tertiary-background-hover': `linear-gradient(135deg, ${prismThemeValues.colors.tertiaryHover}, ${prismThemeValues.colors.tertiaryHoverEnd})`,
  '--prism-button-tertiary-background-active': `linear-gradient(135deg, ${prismThemeValues.colors.tertiaryActive}, ${prismThemeValues.colors.tertiaryActiveEnd})`,
  '--prism-button-tertiary-shadow': prismThemeValues.shadows.tertiary,
  '--prism-button-tertiary-shadow-hover': prismThemeValues.shadows.tertiaryHover,
  '--prism-button-tertiary-shadow-active': prismThemeValues.shadows.tertiaryActive,
  '--prism-button-error-text': prismThemeValues.colors.white,
  '--prism-button-error-border': 'rgb(220 38 38 / 22%)',
  '--prism-button-error-background': `linear-gradient(135deg, ${prismThemeValues.colors.error}, ${prismThemeValues.colors.errorEnd})`,
  '--prism-button-error-background-hover': `linear-gradient(135deg, ${prismThemeValues.colors.errorHover}, ${prismThemeValues.colors.errorHoverEnd})`,
  '--prism-button-error-background-active': `linear-gradient(135deg, ${prismThemeValues.colors.errorActive}, ${prismThemeValues.colors.errorActiveEnd})`,
  '--prism-button-error-shadow': prismThemeValues.shadows.error,
  '--prism-button-error-shadow-hover': prismThemeValues.shadows.errorHover,
  '--prism-button-error-shadow-active': prismThemeValues.shadows.errorActive,
  '--prism-button-warning-text': prismThemeValues.colors.white,
  '--prism-button-warning-border': 'rgb(217 119 6 / 22%)',
  '--prism-button-warning-background': `linear-gradient(135deg, ${prismThemeValues.colors.warning}, ${prismThemeValues.colors.warningEnd})`,
  '--prism-button-warning-background-hover': `linear-gradient(135deg, ${prismThemeValues.colors.warningHover}, ${prismThemeValues.colors.warningHoverEnd})`,
  '--prism-button-warning-background-active': `linear-gradient(135deg, ${prismThemeValues.colors.warningActive}, ${prismThemeValues.colors.warningActiveEnd})`,
  '--prism-button-warning-shadow': prismThemeValues.shadows.warning,
  '--prism-button-warning-shadow-hover': prismThemeValues.shadows.warningHover,
  '--prism-button-warning-shadow-active': prismThemeValues.shadows.warningActive,
  '--prism-button-information-text': prismThemeValues.colors.white,
  '--prism-button-information-border': 'rgb(2 132 199 / 22%)',
  '--prism-button-information-background': `linear-gradient(135deg, ${prismThemeValues.colors.information}, ${prismThemeValues.colors.informationEnd})`,
  '--prism-button-information-background-hover': `linear-gradient(135deg, ${prismThemeValues.colors.informationHover}, ${prismThemeValues.colors.informationHoverEnd})`,
  '--prism-button-information-background-active': `linear-gradient(135deg, ${prismThemeValues.colors.informationActive}, ${prismThemeValues.colors.informationActiveEnd})`,
  '--prism-button-information-shadow': prismThemeValues.shadows.information,
  '--prism-button-information-shadow-hover': prismThemeValues.shadows.informationHover,
  '--prism-button-information-shadow-active': prismThemeValues.shadows.informationActive,
  '--prism-button-success-text': prismThemeValues.colors.white,
  '--prism-button-success-border': 'rgb(60 155 122 / 22%)',
  '--prism-button-success-background': `linear-gradient(135deg, ${prismThemeValues.colors.success}, ${prismThemeValues.colors.successBright})`,
  '--prism-button-success-background-hover': `linear-gradient(135deg, #318b6d, ${prismThemeValues.colors.success})`,
  '--prism-button-success-background-active': `linear-gradient(135deg, #27765c, #3b8d71)`,
  '--prism-button-success-shadow': prismThemeValues.shadows.success,
  '--prism-button-success-shadow-hover': prismThemeValues.shadows.successHover,
  '--prism-button-success-shadow-active': prismThemeValues.shadows.successActive,
  '--prism-color-page': prismThemeValues.colors.page,
  '--prism-color-surface': prismThemeValues.colors.surface,
  '--prism-color-surface-glass': prismThemeValues.colors.surfaceGlass,
  '--prism-color-surface-card': prismThemeValues.colors.surfaceCard,
  '--prism-color-surface-tint': prismThemeValues.colors.surfaceTint,
  '--prism-color-white': prismThemeValues.colors.white,
  '--prism-color-white-strong': prismThemeValues.colors.whiteStrong,
  '--prism-color-white-soft': prismThemeValues.colors.whiteSoft,
  '--prism-color-white-faint': prismThemeValues.colors.whiteFaint,
  '--prism-color-white-tint': prismThemeValues.colors.whiteTint,
  '--prism-color-ink': prismThemeValues.colors.ink,
  '--prism-color-text': prismThemeValues.colors.text,
  '--prism-color-text-muted': prismThemeValues.colors.textMuted,
  '--prism-color-text-soft': prismThemeValues.colors.textSoft,
  '--prism-color-text-subtle': prismThemeValues.colors.textSubtle,
  '--prism-color-placeholder': prismThemeValues.colors.placeholder,
  '--prism-color-border': prismThemeValues.colors.border,
  '--prism-color-border-strong': prismThemeValues.colors.borderStrong,
  '--prism-color-border-input': prismThemeValues.colors.borderInput,
  '--prism-color-border-faint': prismThemeValues.colors.borderFaint,
  '--prism-color-accent': prismThemeValues.colors.accent,
  '--prism-color-accent-bright': prismThemeValues.colors.accentBright,
  '--prism-color-accent-glow': prismThemeValues.colors.accentGlow,
  '--prism-color-accent-soft': prismThemeValues.colors.accentSoft,
  '--prism-color-accent-hover': prismThemeValues.colors.accentHover,
  '--prism-color-action': prismThemeValues.colors.action,
  '--prism-color-action-end': prismThemeValues.colors.actionEnd,
  '--prism-color-action-hover': prismThemeValues.colors.actionHover,
  '--prism-color-action-hover-end': prismThemeValues.colors.actionHoverEnd,
  '--prism-color-action-active': prismThemeValues.colors.actionActive,
  '--prism-color-action-active-end': prismThemeValues.colors.actionActiveEnd,
  '--prism-color-primary': prismThemeValues.colors.primary,
  '--prism-color-primary-end': prismThemeValues.colors.primaryEnd,
  '--prism-color-primary-hover': prismThemeValues.colors.primaryHover,
  '--prism-color-primary-hover-end': prismThemeValues.colors.primaryHoverEnd,
  '--prism-color-primary-active': prismThemeValues.colors.primaryActive,
  '--prism-color-primary-active-end': prismThemeValues.colors.primaryActiveEnd,
  '--prism-color-secondary': prismThemeValues.colors.secondary,
  '--prism-color-secondary-end': prismThemeValues.colors.secondaryEnd,
  '--prism-color-secondary-hover': prismThemeValues.colors.secondaryHover,
  '--prism-color-secondary-hover-end': prismThemeValues.colors.secondaryHoverEnd,
  '--prism-color-secondary-active': prismThemeValues.colors.secondaryActive,
  '--prism-color-secondary-active-end': prismThemeValues.colors.secondaryActiveEnd,
  '--prism-color-tertiary': prismThemeValues.colors.tertiary,
  '--prism-color-tertiary-end': prismThemeValues.colors.tertiaryEnd,
  '--prism-color-tertiary-hover': prismThemeValues.colors.tertiaryHover,
  '--prism-color-tertiary-hover-end': prismThemeValues.colors.tertiaryHoverEnd,
  '--prism-color-tertiary-active': prismThemeValues.colors.tertiaryActive,
  '--prism-color-tertiary-active-end': prismThemeValues.colors.tertiaryActiveEnd,
  '--prism-color-error': prismThemeValues.colors.error,
  '--prism-color-error-end': prismThemeValues.colors.errorEnd,
  '--prism-color-warning': prismThemeValues.colors.warning,
  '--prism-color-warning-end': prismThemeValues.colors.warningEnd,
  '--prism-color-information': prismThemeValues.colors.information,
  '--prism-color-information-end': prismThemeValues.colors.informationEnd,
  '--prism-color-action-preview': prismThemeValues.colors.actionPreview,
  '--prism-color-action-preview-hover': prismThemeValues.colors.actionPreviewHover,
  '--prism-color-action-glow': prismThemeValues.colors.actionGlow,
  '--prism-color-action-hover-glow': prismThemeValues.colors.actionHoverGlow,
  '--prism-color-action-active-shadow': prismThemeValues.colors.actionActiveShadow,
  '--prism-color-action-focus-glow': prismThemeValues.colors.actionFocusGlow,
  '--prism-color-focus': prismThemeValues.colors.focus,
  '--prism-color-focus-glow': prismThemeValues.colors.focusGlow,
  '--prism-color-focus-strong-glow': prismThemeValues.colors.focusStrongGlow,
  '--prism-color-invalid-glow': prismThemeValues.colors.invalidGlow,
  '--prism-color-success': prismThemeValues.colors.success,
  '--prism-color-success-bright': prismThemeValues.colors.successBright,
  '--prism-color-success-glow': prismThemeValues.colors.successGlow,
  '--prism-color-preview-glow': prismThemeValues.colors.previewGlow,
  '--prism-color-lavender-border': prismThemeValues.colors.lavenderBorder,
  '--prism-color-lavender-surface': prismThemeValues.colors.lavenderSurface,
  '--prism-color-mint-border': prismThemeValues.colors.mintBorder,
  '--prism-color-mint-surface': prismThemeValues.colors.mintSurface,
  '--prism-color-peach-border': prismThemeValues.colors.peachBorder,
  '--prism-color-peach-surface': prismThemeValues.colors.peachSurface,
  '--prism-font-size-micro': prismThemeValues.fontSizes.micro,
  '--prism-font-size-label': prismThemeValues.fontSizes.label,
  '--prism-font-size-small': prismThemeValues.fontSizes.small,
  '--prism-font-size-body-small': prismThemeValues.fontSizes.bodySmall,
  '--prism-font-size-compact': prismThemeValues.fontSizes.compact,
  '--prism-font-size-body': prismThemeValues.fontSizes.body,
  '--prism-font-size-copy': prismThemeValues.fontSizes.copy,
  '--prism-font-size-card-copy': prismThemeValues.fontSizes.cardCopy,
  '--prism-font-size-ui': prismThemeValues.fontSizes.ui,
  '--prism-font-size-lead': prismThemeValues.fontSizes.lead,
  '--prism-font-size-heading': prismThemeValues.fontSizes.heading,
  '--prism-font-size-hero': prismThemeValues.fontSizes.hero,
  '--prism-font-size-detail-hero': prismThemeValues.fontSizes.detailHero,
  '--prism-radius-control': prismThemeValues.radii.control,
  '--prism-radius-card': prismThemeValues.radii.card,
  '--prism-radius-preview': prismThemeValues.radii.preview,
  '--prism-radius-surface': prismThemeValues.radii.surface,
  '--prism-shadow-card': prismThemeValues.shadows.card,
  '--prism-shadow-action': prismThemeValues.shadows.action,
  '--prism-shadow-action-hover': prismThemeValues.shadows.actionHover,
  '--prism-shadow-action-active': prismThemeValues.shadows.actionActive
})

const rootVariableRules = Object.entries(cssTokens)
  .map(([key, value]) => `${key}: ${value};`)
  .join('\n    ')

const buttonPaletteRules = Object.entries(buttonPalettes)
  .map(([name, values]) => `
  [data-prism-palette="${name}"] {
    ${Object.entries(values).map(([key, value]) => `${key}: ${value};`).join('\n    ')}
  }`)
  .join('\n')

const themeModelRules = `
  .prism-theme-model-aurora {
    --prism-color-page: #f3f6ff;
    --prism-color-surface: #ffffff;
    --prism-color-surface-glass: rgb(255 255 255 / 78%);
    --prism-color-surface-card: rgb(255 255 255 / 86%);
    --prism-color-surface-tint: #fbf8ff;
    --prism-color-white: #ffffff;
    --prism-color-white-strong: rgb(255 255 255 / 92%);
    --prism-color-white-tint: rgb(255 255 255 / 30%);
    --prism-color-ink: #272344;
    --prism-color-text: #605a7b;
    --prism-color-text-muted: #70688e;
    --prism-color-text-soft: #817b9b;
    --prism-color-text-subtle: #958fad;
    --prism-color-placeholder: #b2abc5;
    --prism-color-border: #e6e0f4;
    --prism-color-border-strong: #d2c8ea;
    --prism-color-border-input: #dcd4ef;
    --prism-color-border-faint: #f0ecf7;
    --prism-color-accent: #c15fce;
    --prism-color-accent-bright: #df7be8;
    --prism-color-accent-glow: rgb(223 123 232 / 15%);
    --prism-color-accent-soft: #fff0fc;
    --prism-color-action: #6958de;
    --prism-color-action-end: #58bfc6;
    --prism-color-action-hover: #5d4dcc;
    --prism-color-action-hover-end: #43aeb5;
    --prism-color-action-active: #4e3fb5;
    --prism-color-action-active-end: #32969e;
    --prism-color-focus: #7568ed;
    --prism-color-focus-glow: rgb(117 104 237 / 18%);
    --prism-color-focus-strong-glow: rgb(117 104 237 / 25%);
    --prism-color-preview-glow: rgb(202 159 255 / 18%);
    --prism-color-lavender-border: #d8caff;
    --prism-color-lavender-surface: #f4efff;
    --prism-color-mint-border: #c6e9e2;
    --prism-color-mint-surface: #ecfbf6;
    --prism-color-peach-border: #f3d4cf;
    --prism-color-peach-surface: #fff3f0;
    --prism-radius-control: .8rem;
    --prism-radius-card: 1.45rem;
    --prism-radius-preview: 1.15rem;
    --prism-radius-surface: 1.15rem;
    --prism-shadow-card: 0 .95rem 2.6rem rgb(109 94 247 / 10%);
    --prism-shadow-action: 0 .45rem 1rem rgb(105 88 222 / 22%);
    --prism-shadow-action-hover: 0 .6rem 1.25rem rgb(105 88 222 / 28%);
    --prism-shadow-action-active: 0 .15rem .35rem rgb(105 88 222 / 18%);
    --prism-button-primary-background: linear-gradient(135deg, #6958de, #58bfc6);
    --prism-button-primary-background-hover: linear-gradient(135deg, #5d4dcc, #43aeb5);
    --prism-button-primary-background-active: linear-gradient(135deg, #4e3fb5, #32969e);
    --prism-button-primary-shadow: 0 .45rem 1rem rgb(105 88 222 / 22%);
    --prism-button-primary-shadow-hover: 0 .6rem 1.25rem rgb(105 88 222 / 28%);
    --prism-button-primary-shadow-active: 0 .15rem .35rem rgb(105 88 222 / 18%);
    --prism-button-secondary-background: linear-gradient(135deg, #7d7a9e, #9691b5);
    --prism-button-secondary-background-hover: linear-gradient(135deg, #6d6a8f, #8580a4);
    --prism-button-secondary-background-active: linear-gradient(135deg, #5f5c7d, #74708f);
    --prism-button-secondary-shadow: 0 .36rem .9rem rgb(125 122 158 / 20%);
    --prism-button-secondary-shadow-hover: 0 .52rem 1.1rem rgb(125 122 158 / 26%);
    --prism-button-secondary-shadow-active: 0 .12rem .32rem rgb(95 92 125 / 24%);
    --prism-button-tertiary-background: linear-gradient(135deg, #c15fce, #ef91c7);
    --prism-button-tertiary-background-hover: linear-gradient(135deg, #ae4dbd, #df7db6);
    --prism-button-tertiary-background-active: linear-gradient(135deg, #963da5, #c865a0);
    --prism-button-tertiary-shadow: 0 .42rem .96rem rgb(193 95 206 / 22%);
    --prism-button-tertiary-shadow-hover: 0 .56rem 1.14rem rgb(193 95 206 / 28%);
    --prism-button-tertiary-shadow-active: 0 .12rem .32rem rgb(150 61 165 / 24%);
  }

  .prism-theme-model-nocturne {
    --prism-color-page: #080d1b;
    --prism-color-surface: #10172d;
    --prism-color-surface-glass: rgb(18 27 53 / 91%);
    --prism-color-surface-card: rgb(17 26 53 / 94%);
    --prism-color-surface-tint: #141f3d;
    --prism-color-white: #172342;
    --prism-color-white-strong: rgb(35 49 86 / 92%);
    --prism-color-white-tint: rgb(126 154 226 / 16%);
    --prism-color-ink: #eef4ff;
    --prism-color-text: #b5c6e8;
    --prism-color-text-muted: #9aadd4;
    --prism-color-text-soft: #8fa5d0;
    --prism-color-text-subtle: #768bb7;
    --prism-color-placeholder: #6278a5;
    --prism-color-border: #28375e;
    --prism-color-border-strong: #3b5283;
    --prism-color-border-input: #3a4e7d;
    --prism-color-border-faint: #1d2a4a;
    --prism-color-accent: #ff8da4;
    --prism-color-accent-bright: #ff9f91;
    --prism-color-accent-glow: rgb(255 141 164 / 16%);
    --prism-color-accent-soft: #34233d;
    --prism-color-action: #7b8dff;
    --prism-color-action-end: #59c8ee;
    --prism-color-action-hover: #91a1ff;
    --prism-color-action-hover-end: #73d5f4;
    --prism-color-action-active: #6275e7;
    --prism-color-action-active-end: #43afd7;
    --prism-color-focus: #a3caff;
    --prism-color-focus-glow: rgb(126 217 255 / 22%);
    --prism-color-focus-strong-glow: rgb(126 217 255 / 32%);
    --prism-color-preview-glow: rgb(92 111 218 / 23%);
    --prism-color-lavender-border: #5360a0;
    --prism-color-lavender-surface: #202957;
    --prism-color-mint-border: #3b7f79;
    --prism-color-mint-surface: #173a3e;
    --prism-color-peach-border: #895261;
    --prism-color-peach-surface: #3a2539;
    --prism-radius-control: .72rem;
    --prism-radius-card: 1.35rem;
    --prism-radius-preview: 1.1rem;
    --prism-radius-surface: 1rem;
    --prism-shadow-card: 0 .95rem 2.6rem rgb(0 0 0 / 28%);
    --prism-shadow-action: 0 .45rem 1rem rgb(68 104 221 / 30%);
    --prism-shadow-action-hover: 0 .6rem 1.25rem rgb(68 104 221 / 40%);
    --prism-shadow-action-active: 0 .15rem .35rem rgb(0 0 0 / 30%);
    --prism-button-primary-background: linear-gradient(135deg, #697cff, #4ab8df);
    --prism-button-primary-background-hover: linear-gradient(135deg, #8292ff, #68c7e8);
    --prism-button-primary-background-active: linear-gradient(135deg, #5669dc, #3aa3ca);
    --prism-button-primary-shadow: 0 .45rem 1rem rgb(68 104 221 / 30%);
    --prism-button-primary-shadow-hover: 0 .6rem 1.25rem rgb(68 104 221 / 40%);
    --prism-button-primary-shadow-active: 0 .15rem .35rem rgb(0 0 0 / 30%);
    --prism-button-secondary-background: linear-gradient(135deg, #465779, #6278a4);
    --prism-button-secondary-background-hover: linear-gradient(135deg, #53678d, #7188b5);
    --prism-button-secondary-background-active: linear-gradient(135deg, #394967, #52678f);
    --prism-button-secondary-shadow: 0 .36rem .9rem rgb(0 0 0 / 24%);
    --prism-button-secondary-shadow-hover: 0 .52rem 1.1rem rgb(0 0 0 / 32%);
    --prism-button-secondary-shadow-active: 0 .12rem .32rem rgb(0 0 0 / 30%);
    --prism-button-tertiary-background: linear-gradient(135deg, #e66f91, #f3a276);
    --prism-button-tertiary-background-hover: linear-gradient(135deg, #f381a0, #ffb188);
    --prism-button-tertiary-background-active: linear-gradient(135deg, #c95679, #d78361);
    --prism-button-tertiary-shadow: 0 .42rem .96rem rgb(230 111 145 / 24%);
    --prism-button-tertiary-shadow-hover: 0 .56rem 1.14rem rgb(230 111 145 / 34%);
    --prism-button-tertiary-shadow-active: 0 .12rem .32rem rgb(0 0 0 / 28%);
    --prism-button-focus-outline: 3px solid rgb(126 217 255 / 70%);
  }

  .prism-theme-model-editorial {
    font-family: Georgia, 'Times New Roman', serif;
    --prism-color-page: #f7f3ed;
    --prism-color-surface: #fffdf9;
    --prism-color-surface-glass: rgb(255 253 249 / 88%);
    --prism-color-surface-card: rgb(255 253 249 / 94%);
    --prism-color-surface-tint: #f3eee7;
    --prism-color-white: #fffdf9;
    --prism-color-white-strong: rgb(255 253 249 / 94%);
    --prism-color-white-tint: rgb(255 253 249 / 32%);
    --prism-color-ink: #2e2926;
    --prism-color-text: #615b56;
    --prism-color-text-muted: #746c65;
    --prism-color-text-soft: #817870;
    --prism-color-text-subtle: #9b9188;
    --prism-color-placeholder: #b6aaa0;
    --prism-color-border: #e5ddd4;
    --prism-color-border-strong: #d0c4b8;
    --prism-color-border-input: #d9cec3;
    --prism-color-border-faint: #eee8e1;
    --prism-color-accent: #c75a3e;
    --prism-color-accent-bright: #df7654;
    --prism-color-accent-glow: rgb(199 90 62 / 15%);
    --prism-color-accent-soft: #fff0e9;
    --prism-color-action: #2e6878;
    --prism-color-action-end: #4d8b8c;
    --prism-color-action-hover: #245666;
    --prism-color-action-hover-end: #3d797a;
    --prism-color-action-active: #1c4654;
    --prism-color-action-active-end: #306567;
    --prism-color-focus: #3b7c89;
    --prism-color-focus-glow: rgb(59 124 137 / 18%);
    --prism-color-focus-strong-glow: rgb(59 124 137 / 25%);
    --prism-color-preview-glow: rgb(229 151 119 / 17%);
    --prism-color-lavender-border: #d5c9df;
    --prism-color-lavender-surface: #f3edf7;
    --prism-color-mint-border: #c7ddd5;
    --prism-color-mint-surface: #edf7f2;
    --prism-color-peach-border: #eac5b8;
    --prism-color-peach-surface: #fff0e8;
    --prism-radius-control: .35rem;
    --prism-radius-card: .9rem;
    --prism-radius-preview: .55rem;
    --prism-radius-surface: .65rem;
    --prism-shadow-card: 0 .8rem 2rem rgb(74 58 45 / 8%);
    --prism-shadow-action: 0 .35rem .8rem rgb(46 104 120 / 20%);
    --prism-shadow-action-hover: 0 .5rem 1rem rgb(46 104 120 / 26%);
    --prism-shadow-action-active: 0 .1rem .25rem rgb(28 70 84 / 18%);
    --prism-button-primary-background: linear-gradient(135deg, #2e6878, #4d8b8c);
    --prism-button-primary-background-hover: linear-gradient(135deg, #245666, #3d797a);
    --prism-button-primary-background-active: linear-gradient(135deg, #1c4654, #306567);
    --prism-button-primary-shadow: 0 .35rem .8rem rgb(46 104 120 / 20%);
    --prism-button-primary-shadow-hover: 0 .5rem 1rem rgb(46 104 120 / 26%);
    --prism-button-primary-shadow-active: 0 .1rem .25rem rgb(28 70 84 / 18%);
    --prism-button-secondary-background: linear-gradient(135deg, #817870, #9a8e84);
    --prism-button-secondary-background-hover: linear-gradient(135deg, #71675f, #897c71);
    --prism-button-secondary-background-active: linear-gradient(135deg, #625950, #786b60);
    --prism-button-secondary-shadow: 0 .32rem .75rem rgb(97 91 86 / 16%);
    --prism-button-secondary-shadow-hover: 0 .48rem .95rem rgb(97 91 86 / 22%);
    --prism-button-secondary-shadow-active: 0 .1rem .25rem rgb(80 70 60 / 18%);
    --prism-button-tertiary-background: linear-gradient(135deg, #c75a3e, #df7654);
    --prism-button-tertiary-background-hover: linear-gradient(135deg, #b44a30, #d36445);
    --prism-button-tertiary-background-active: linear-gradient(135deg, #983c28, #b95038);
    --prism-button-tertiary-shadow: 0 .35rem .85rem rgb(199 90 62 / 20%);
    --prism-button-tertiary-shadow-hover: 0 .5rem 1rem rgb(199 90 62 / 26%);
    --prism-button-tertiary-shadow-active: 0 .1rem .25rem rgb(152 60 40 / 18%);
  }

  .prism-theme-model-terminal {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    --prism-color-page: #07100e;
    --prism-color-surface: #0d1815;
    --prism-color-surface-glass: rgb(13 24 21 / 93%);
    --prism-color-surface-card: rgb(13 24 21 / 96%);
    --prism-color-surface-tint: #10221c;
    --prism-color-white: #12251d;
    --prism-color-white-strong: rgb(28 59 45 / 94%);
    --prism-color-white-tint: rgb(91 224 148 / 15%);
    --prism-color-ink: #d8ffe4;
    --prism-color-text: #a7d8b6;
    --prism-color-text-muted: #8fc29e;
    --prism-color-text-soft: #7cae8c;
    --prism-color-text-subtle: #638e72;
    --prism-color-placeholder: #4d765d;
    --prism-color-border: #234b38;
    --prism-color-border-strong: #32674c;
    --prism-color-border-input: #2c5c43;
    --prism-color-border-faint: #173326;
    --prism-color-accent: #ffbd72;
    --prism-color-accent-bright: #ffd18e;
    --prism-color-accent-glow: rgb(255 189 114 / 15%);
    --prism-color-accent-soft: #34271b;
    --prism-color-action: #45d483;
    --prism-color-action-end: #92e66d;
    --prism-color-action-hover: #66e39a;
    --prism-color-action-hover-end: #aceb87;
    --prism-color-action-active: #2dbd6e;
    --prism-color-action-active-end: #75d253;
    --prism-color-focus: #79eca4;
    --prism-color-focus-glow: rgb(91 224 148 / 20%);
    --prism-color-focus-strong-glow: rgb(91 224 148 / 30%);
    --prism-color-preview-glow: rgb(62 190 116 / 17%);
    --prism-color-lavender-border: #35664e;
    --prism-color-lavender-surface: #163126;
    --prism-color-mint-border: #387256;
    --prism-color-mint-surface: #143326;
    --prism-color-peach-border: #795636;
    --prism-color-peach-surface: #30251a;
    --prism-radius-control: .35rem;
    --prism-radius-card: .75rem;
    --prism-radius-preview: .55rem;
    --prism-radius-surface: .6rem;
    --prism-shadow-card: 0 .8rem 2rem rgb(0 0 0 / 28%);
    --prism-shadow-action: 0 .35rem .8rem rgb(45 189 110 / 20%);
    --prism-shadow-action-hover: 0 .5rem 1rem rgb(45 189 110 / 30%);
    --prism-shadow-action-active: 0 .1rem .25rem rgb(0 0 0 / 30%);
    --prism-button-primary-background: linear-gradient(135deg, #35c879, #8cdf68);
    --prism-button-primary-background-hover: linear-gradient(135deg, #50dc8b, #a2eb82);
    --prism-button-primary-background-active: linear-gradient(135deg, #26ad65, #70c94f);
    --prism-button-primary-shadow: 0 .35rem .8rem rgb(45 189 110 / 20%);
    --prism-button-primary-shadow-hover: 0 .5rem 1rem rgb(45 189 110 / 30%);
    --prism-button-primary-shadow-active: 0 .1rem .25rem rgb(0 0 0 / 30%);
    --prism-button-secondary-background: linear-gradient(135deg, #315a47, #47765a);
    --prism-button-secondary-background-hover: linear-gradient(135deg, #3c6d53, #578866);
    --prism-button-secondary-background-active: linear-gradient(135deg, #274a3a, #3c644d);
    --prism-button-secondary-shadow: 0 .32rem .75rem rgb(0 0 0 / 24%);
    --prism-button-secondary-shadow-hover: 0 .48rem .95rem rgb(0 0 0 / 32%);
    --prism-button-secondary-shadow-active: 0 .1rem .25rem rgb(0 0 0 / 30%);
    --prism-button-tertiary-background: linear-gradient(135deg, #c9794a, #e6a45d);
    --prism-button-tertiary-background-hover: linear-gradient(135deg, #dc8956, #f0b36d);
    --prism-button-tertiary-background-active: linear-gradient(135deg, #a96039, #c98949);
    --prism-button-tertiary-shadow: 0 .35rem .85rem rgb(201 121 74 / 20%);
    --prism-button-tertiary-shadow-hover: 0 .5rem 1rem rgb(201 121 74 / 28%);
    --prism-button-tertiary-shadow-active: 0 .1rem .25rem rgb(0 0 0 / 28%);
    --prism-button-focus-outline: 3px solid rgb(91 224 148 / 70%);
  }
`

export const prismTheme = globalCss(`
  :root {
    ${rootVariableRules}
  }

  ${buttonPaletteRules}

  ${themeModelRules}

  .prism-icon {
    display: block;
    flex: 0 0 auto;
  }

  .prism-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .45rem;
    padding: var(--prism-button-padding);
    border: var(--prism-button-border-width) solid var(--prism-button-current-border);
    border-radius: var(--prism-button-radius);
    color: var(--prism-button-current-text);
    background: var(--prism-button-current-background);
    font-size: var(--prism-button-font-size);
    font-weight: var(--prism-button-font-weight);
    line-height: 1.1;
    cursor: pointer;
    box-shadow: var(--prism-button-current-shadow);
    appearance: none;
    transform: translateY(0);
    transition: background .18s ease, box-shadow .18s ease, transform .18s ease, opacity .18s ease, border-color .18s ease;
  }

  .prism-button-primary {
    --prism-button-current-text: var(--prism-button-primary-text);
    --prism-button-current-border: var(--prism-button-primary-border);
    --prism-button-current-background: var(--prism-button-primary-background);
    --prism-button-current-background-hover: var(--prism-button-primary-background-hover);
    --prism-button-current-background-active: var(--prism-button-primary-background-active);
    --prism-button-current-shadow: var(--prism-button-primary-shadow);
    --prism-button-current-shadow-hover: var(--prism-button-primary-shadow-hover);
    --prism-button-current-shadow-active: var(--prism-button-primary-shadow-active);
  }

  .prism-button-secondary {
    --prism-button-current-text: var(--prism-button-secondary-text);
    --prism-button-current-border: var(--prism-button-secondary-border);
    --prism-button-current-background: var(--prism-button-secondary-background);
    --prism-button-current-background-hover: var(--prism-button-secondary-background-hover);
    --prism-button-current-background-active: var(--prism-button-secondary-background-active);
    --prism-button-current-shadow: var(--prism-button-secondary-shadow);
    --prism-button-current-shadow-hover: var(--prism-button-secondary-shadow-hover);
    --prism-button-current-shadow-active: var(--prism-button-secondary-shadow-active);
  }

  .prism-button-tertiary {
    --prism-button-current-text: var(--prism-button-tertiary-text);
    --prism-button-current-border: var(--prism-button-tertiary-border);
    --prism-button-current-background: var(--prism-button-tertiary-background);
    --prism-button-current-background-hover: var(--prism-button-tertiary-background-hover);
    --prism-button-current-background-active: var(--prism-button-tertiary-background-active);
    --prism-button-current-shadow: var(--prism-button-tertiary-shadow);
    --prism-button-current-shadow-hover: var(--prism-button-tertiary-shadow-hover);
    --prism-button-current-shadow-active: var(--prism-button-tertiary-shadow-active);
  }

  .prism-button-error {
    --prism-button-current-text: var(--prism-button-error-text);
    --prism-button-current-border: var(--prism-button-error-border);
    --prism-button-current-background: var(--prism-button-error-background);
    --prism-button-current-background-hover: var(--prism-button-error-background-hover);
    --prism-button-current-background-active: var(--prism-button-error-background-active);
    --prism-button-current-shadow: var(--prism-button-error-shadow);
    --prism-button-current-shadow-hover: var(--prism-button-error-shadow-hover);
    --prism-button-current-shadow-active: var(--prism-button-error-shadow-active);
  }

  .prism-button-warning {
    --prism-button-current-text: var(--prism-button-warning-text);
    --prism-button-current-border: var(--prism-button-warning-border);
    --prism-button-current-background: var(--prism-button-warning-background);
    --prism-button-current-background-hover: var(--prism-button-warning-background-hover);
    --prism-button-current-background-active: var(--prism-button-warning-background-active);
    --prism-button-current-shadow: var(--prism-button-warning-shadow);
    --prism-button-current-shadow-hover: var(--prism-button-warning-shadow-hover);
    --prism-button-current-shadow-active: var(--prism-button-warning-shadow-active);
  }

  .prism-button-information {
    --prism-button-current-text: var(--prism-button-information-text);
    --prism-button-current-border: var(--prism-button-information-border);
    --prism-button-current-background: var(--prism-button-information-background);
    --prism-button-current-background-hover: var(--prism-button-information-background-hover);
    --prism-button-current-background-active: var(--prism-button-information-background-active);
    --prism-button-current-shadow: var(--prism-button-information-shadow);
    --prism-button-current-shadow-hover: var(--prism-button-information-shadow-hover);
    --prism-button-current-shadow-active: var(--prism-button-information-shadow-active);
  }

  .prism-button-success {
    --prism-button-current-text: var(--prism-button-success-text);
    --prism-button-current-border: var(--prism-button-success-border);
    --prism-button-current-background: var(--prism-button-success-background);
    --prism-button-current-background-hover: var(--prism-button-success-background-hover);
    --prism-button-current-background-active: var(--prism-button-success-background-active);
    --prism-button-current-shadow: var(--prism-button-success-shadow);
    --prism-button-current-shadow-hover: var(--prism-button-success-shadow-hover);
    --prism-button-current-shadow-active: var(--prism-button-success-shadow-active);
  }

  .prism-button:hover:not(:disabled) {
    background: var(--prism-button-current-background-hover);
    box-shadow: var(--prism-button-current-shadow-hover);
    transform: var(--prism-button-transform-hover);
  }

  .prism-button:active:not(:disabled) {
    background: var(--prism-button-current-background-active);
    box-shadow: var(--prism-button-current-shadow-active);
    transform: var(--prism-button-transform-active);
  }

  .prism-button:focus-visible {
    outline: var(--prism-button-focus-outline);
    outline-offset: var(--prism-button-focus-offset);
  }

  .prism-button:disabled {
    opacity: var(--prism-button-disabled-opacity);
    cursor: not-allowed;
  }

  .prism-select {
    position: relative;
    display: block;
    width: 100%;
  }

  .prism-select-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .8rem;
    width: 100%;
    padding: .72rem .8rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: var(--prism-radius-control);
    outline: none;
    color: var(--prism-color-ink);
    background: var(--prism-color-white);
    font: inherit;
    font-size: var(--prism-font-size-body);
    line-height: 1.2;
    text-align: left;
    cursor: pointer;
    appearance: none;
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
  }

  .prism-select-trigger:hover:not(:disabled) {
    border-color: var(--prism-color-border-strong);
    background: var(--prism-color-surface-tint);
  }

  .prism-select-trigger:focus-visible {
    border-color: var(--prism-color-focus);
    box-shadow: 0 0 0 .25rem var(--prism-color-focus-glow);
  }

  .prism-select-trigger:disabled {
    opacity: var(--prism-button-disabled-opacity);
    cursor: not-allowed;
  }

  .prism-select-chevron {
    width: .55rem;
    height: .55rem;
    flex: 0 0 .55rem;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
    transform: translateY(-.15rem) rotate(45deg);
    transition: transform .18s ease;
  }

  .prism-select-trigger[aria-expanded="true"] .prism-select-chevron {
    transform: translateY(.15rem) rotate(225deg);
  }

  .prism-select-menu {
    position: absolute;
    z-index: 20;
    display: grid;
    gap: .2rem;
    min-width: 100%;
    max-width: min(20rem, calc(100vw - 1rem));
    max-height: min(18rem, calc(100vh - 1rem));
    padding: .35rem;
    overflow: auto;
    border: 1px solid var(--prism-color-border-input);
    border-radius: var(--prism-radius-control);
    background: var(--prism-color-white);
    box-shadow: 0 .7rem 1.8rem rgb(37 49 78 / 15%), 0 .1rem .3rem rgb(37 49 78 / 8%);
  }

  .prism-select-menu[hidden] {
    display: none;
  }

  .prism-select-menu-bottom {
    top: calc(100% + .35rem);
    right: 0;
    left: 0;
  }

  .prism-select-menu-top {
    right: 0;
    bottom: calc(100% + .35rem);
    left: 0;
  }

  .prism-select-menu-right {
    top: 0;
    left: calc(100% + .35rem);
  }

  .prism-select-menu-left {
    top: 0;
    right: calc(100% + .35rem);
  }

  .prism-select-option {
    display: block;
    width: 100%;
    padding: .62rem .7rem;
    border: 0;
    border-radius: calc(var(--prism-radius-control) - .2rem);
    color: var(--prism-color-text);
    background: transparent;
    font: inherit;
    font-size: var(--prism-font-size-body);
    line-height: 1.25;
    text-align: left;
    cursor: pointer;
  }

  .prism-select-option:hover:not(:disabled),
  .prism-select-option[aria-selected="true"],
  .prism-select-option[data-active="true"] {
    color: var(--prism-color-ink);
    background: var(--prism-color-lavender-surface);
  }

  .prism-select-option:focus-visible {
    outline: 2px solid var(--prism-color-focus);
    outline-offset: -2px;
  }

  .prism-select-option:disabled {
    opacity: .48;
    cursor: not-allowed;
  }

  .prism-select-small .prism-select-trigger {
    padding: .56rem .68rem;
    font-size: var(--prism-font-size-small);
  }

  .prism-select-large .prism-select-trigger {
    padding: .86rem .95rem;
    font-size: var(--prism-font-size-copy);
  }

  .prism-code-viewer {
    --prism-code-background: #111a32;
    --prism-code-background-raised: #172344;
    --prism-code-foreground: #d9e4ff;
    --prism-code-gutter: #7081a8;
    --prism-code-border: rgb(139 169 255 / 25%);
    --prism-code-keyword: #a8b5ff;
    --prism-code-string: #9ee4bf;
    --prism-code-number: #ffbd72;
    --prism-code-comment: #7182a8;
    --prism-code-function: #8bd9ff;
    --prism-code-tag: #ff9db2;
    --prism-code-tag-name: #a8b5ff;
    --prism-code-attribute: #ffd27c;
    --prism-code-property: #c1a8ff;
    --prism-code-boolean: #ffad8d;
    --prism-code-operator: #90aaff;
    --prism-code-punctuation: #9aa9c8;
    --prism-code-font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
    --prism-code-font-size: .78rem;
    --prism-code-line-height: 1.7;
    --prism-code-tab-size: 2;
    --prism-code-min-height: 18rem;
    --prism-code-max-height: 32rem;
    display: block;
    overflow: hidden;
    border: 1px solid var(--prism-code-border);
    border-radius: var(--prism-radius-surface);
    color: var(--prism-code-foreground);
    background: var(--prism-code-background);
    box-shadow: 0 .8rem 1.8rem rgb(3 8 25 / 18%);
  }

  .prism-code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 2.65rem;
    padding: .5rem .65rem .5rem .85rem;
    border-bottom: 1px solid var(--prism-code-border);
    background: var(--prism-code-background-raised);
  }

  .prism-code-file {
    display: inline-flex;
    align-items: center;
    gap: .48rem;
    min-width: 0;
    color: var(--prism-code-foreground);
    font-family: var(--prism-code-font-family);
    font-size: .72rem;
    font-weight: 700;
  }

  .prism-code-file-dot {
    width: .45rem;
    height: .45rem;
    flex: 0 0 .45rem;
    border-radius: 50%;
    background: var(--prism-color-accent-bright);
    box-shadow: 0 0 0 .2rem var(--prism-color-accent-glow);
  }

  .prism-code-filename {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .prism-code-language {
    padding: .18rem .4rem;
    border: 1px solid var(--prism-code-border);
    border-radius: 999px;
    color: var(--prism-code-gutter);
    font-size: .6rem;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .prism-code-copy {
    display: inline-grid;
    width: 1.85rem;
    height: 1.85rem;
    place-items: center;
    padding: 0;
    border: 1px solid transparent;
    border-radius: .48rem;
    color: var(--prism-code-gutter);
    background: transparent;
    cursor: pointer;
    transition: color .18s ease, border-color .18s ease, background .18s ease, transform .18s ease;
  }

  .prism-code-copy:hover {
    border-color: var(--prism-code-border);
    color: var(--prism-code-foreground);
    background: rgb(255 255 255 / 8%);
    transform: translateY(-1px);
  }

  .prism-code-copy:focus-visible {
    outline: 2px solid var(--prism-color-focus);
    outline-offset: 2px;
  }

  .prism-code-viewer[data-copy-state="copied"] .prism-code-copy {
    color: var(--prism-color-success-bright);
  }

  .prism-code-viewer[data-copy-state="error"] .prism-code-copy {
    color: var(--prism-color-accent-bright);
  }

  .prism-code-body {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
  }

  .prism-code-gutter {
    min-width: 3.1rem;
    padding: 1.05rem .8rem 1.05rem .6rem;
    overflow: hidden;
    border-right: 1px solid var(--prism-code-border);
    color: var(--prism-code-gutter);
    font-family: var(--prism-code-font-family);
    font-size: var(--prism-code-font-size);
    line-height: var(--prism-code-line-height);
    text-align: right;
    user-select: none;
  }

  .prism-code-gutter-hidden {
    display: none;
  }

  .prism-code-gutter-lines {
    display: grid;
    align-content: start;
    transform: translateY(0);
  }

  .prism-code-gutter-line {
    display: block;
    line-height: var(--prism-code-line-height);
  }

  .prism-code-scroll {
    position: relative;
    min-width: 0;
    min-height: var(--prism-code-min-height);
    height: 24rem;
    max-height: var(--prism-code-max-height);
    overflow: hidden;
    background: var(--prism-code-background);
  }

  .prism-code-highlight,
  .prism-code-input {
    box-sizing: border-box;
    margin: 0;
    padding: 1.05rem 1.1rem;
    font-family: var(--prism-code-font-family);
    font-size: var(--prism-code-font-size);
    font-variant-ligatures: contextual;
    line-height: var(--prism-code-line-height);
    tab-size: var(--prism-code-tab-size);
    white-space: pre;
  }

  .prism-code-highlight {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: max-content;
    min-width: 100%;
    height: max-content;
    min-height: 100%;
    color: var(--prism-code-foreground);
    pointer-events: none;
    transform: translate(0, 0);
  }

  .prism-code-highlight code {
    font: inherit;
  }

  .prism-code-input {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    min-height: 100%;
    overflow: auto;
    border: 0 !important;
    outline: none;
    color: transparent;
    background: transparent !important;
    caret-color: var(--prism-code-foreground);
    resize: none;
    appearance: none;
    box-shadow: none !important;
    -webkit-text-fill-color: transparent;
  }

  .prism-code-input::selection {
    color: transparent;
    background: rgb(126 217 255 / 24%);
  }

  .prism-code-token-keyword {
    color: var(--prism-code-keyword);
  }

  .prism-code-token-string {
    color: var(--prism-code-string);
  }

  .prism-code-token-number {
    color: var(--prism-code-number);
  }

  .prism-code-token-comment {
    color: var(--prism-code-comment);
    font-style: italic;
  }

  .prism-code-token-function {
    color: var(--prism-code-function);
  }

  .prism-code-token-tag,
  .prism-code-token-tag-name {
    color: var(--prism-code-tag);
  }

  .prism-code-token-tag-name {
    color: var(--prism-code-tag-name);
  }

  .prism-code-token-attribute {
    color: var(--prism-code-attribute);
  }

  .prism-code-token-property {
    color: var(--prism-code-property);
  }

  .prism-code-token-boolean {
    color: var(--prism-code-boolean);
  }

  .prism-code-token-operator {
    color: var(--prism-code-operator);
  }

  .prism-code-token-punctuation {
    color: var(--prism-code-punctuation);
  }

  .prism-background {
    --prism-background-base: #071427;
    --prism-background-accent: #3657d6;
    --prism-background-glow: #7ac7ff;
    --prism-background-overlay-opacity: .22;
    --prism-background-padding: 1.5rem;
    --prism-background-radius: 1.4rem;
    --prism-background-min-height: 18rem;
    --prism-background-height: auto;
    position: relative;
    display: block;
    min-height: var(--prism-background-min-height);
    height: var(--prism-background-height);
    overflow: hidden;
    border: 1px solid rgb(122 199 255 / 16%);
    border-radius: var(--prism-background-radius);
    background:
      radial-gradient(circle at 80% 12%, rgb(122 199 255 / 20%), transparent 12rem),
      radial-gradient(circle at 12% 0%, rgb(54 87 214 / 22%), transparent 10rem),
      linear-gradient(145deg, color-mix(in srgb, var(--prism-background-base) 88%, black), var(--prism-background-base) 72%);
    box-shadow: 0 1.1rem 2.4rem rgb(5 11 29 / 24%);
    isolation: isolate;
  }

  .prism-background-layer,
  .prism-background-wash {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .prism-background-layer {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    opacity: 1;
  }

  .prism-background-wash {
    background:
      linear-gradient(180deg, rgb(3 7 18 / 16%), rgb(3 7 18 / 42%)),
      radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--prism-background-glow) 20%, transparent), transparent 38%),
      radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--prism-background-accent) 18%, transparent), transparent 32%);
    opacity: var(--prism-background-overlay-opacity);
    mix-blend-mode: screen;
  }

  .prism-background-content {
    position: relative;
    z-index: 1;
    display: grid;
    align-content: start;
    min-height: var(--prism-background-min-height);
    padding: var(--prism-background-padding);
    box-sizing: border-box;
  }

  .prism-background-midnight {
    border-color: rgb(122 199 255 / 18%);
  }

  .prism-background-aurora {
    border-color: rgb(109 94 247 / 20%);
  }

  .prism-background-tide {
    border-color: rgb(91 224 148 / 18%);
  }

  .prism-background-static .prism-background-layer,
  .prism-background-static .prism-background-wash {
    display: none;
  }

  .prism-popup-layer {
    position: fixed;
    z-index: 200;
    inset: 0;
    display: grid;
    align-items: center;
    justify-items: center;
    padding: 1.25rem;
    isolation: isolate;
  }

  .prism-popup-placement-top {
    align-items: start;
    padding-top: min(8svh, 5rem);
  }

  .prism-popup-placement-bottom {
    align-items: end;
    padding-bottom: min(8svh, 5rem);
  }

  .prism-popup-backdrop {
    position: absolute;
    z-index: -1;
    inset: 0;
    display: block;
    background: rgb(8 13 29 / 62%);
    backdrop-filter: blur(12px);
    animation: prism-popup-backdrop-in .18s ease both;
  }

  .prism-popup-panel {
    display: grid;
    width: min(100%, 38rem);
    max-height: calc(100svh - 2.5rem);
    grid-template-rows: auto minmax(0, 1fr) auto;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--prism-color-focus) 25%, var(--prism-color-border-input));
    border-radius: calc(var(--prism-radius-surface) + .28rem);
    color: var(--prism-color-text);
    background:
      radial-gradient(circle at 92% -25%, var(--prism-color-focus-glow), transparent 18rem),
      color-mix(in srgb, var(--prism-color-surface) 97%, transparent);
    box-shadow: 0 2rem 5rem rgb(2 7 23 / 44%);
    outline: 0;
    animation: prism-popup-panel-in .24s cubic-bezier(.2, .8, .2, 1) both;
  }

  .prism-popup-small {
    width: min(100%, 26rem);
  }

  .prism-popup-large {
    width: min(100%, 56rem);
  }

  .prism-popup-full {
    width: 100%;
    height: calc(100svh - 2.5rem);
  }

  .prism-popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1rem .9rem 1.15rem;
    border-bottom: 1px solid var(--prism-color-border-faint);
  }

  .prism-popup-heading {
    display: grid;
    min-width: 0;
    gap: .16rem;
  }

  .prism-popup-eyebrow {
    color: var(--prism-color-focus);
    font-size: .62rem;
    font-weight: 820;
    letter-spacing: .09em;
    text-transform: uppercase;
  }

  .prism-popup-title {
    overflow: hidden;
    color: var(--prism-color-ink);
    font-size: var(--prism-font-size-heading);
    font-weight: 820;
    letter-spacing: -.035em;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .prism-popup-description {
    color: var(--prism-color-text-subtle);
    font-size: var(--prism-font-size-small);
    line-height: 1.4;
  }

  .prism-popup-close {
    display: grid;
    width: 2.2rem;
    height: 2.2rem;
    flex: 0 0 2.2rem;
    place-items: center;
    padding: 0;
    border: 1px solid var(--prism-color-border-input);
    border-radius: .7rem;
    color: var(--prism-color-text-soft);
    background: var(--prism-color-surface);
    font: inherit;
    cursor: pointer;
    transition: border-color .18s ease, color .18s ease, background .18s ease, transform .18s ease;
  }

  .prism-popup-close:hover {
    border-color: var(--prism-color-focus);
    color: var(--prism-color-ink);
    background: var(--prism-color-lavender-surface);
    transform: translateY(-1px);
  }

  .prism-popup-close:focus-visible {
    outline: 2px solid var(--prism-color-focus);
    outline-offset: 2px;
  }

  .prism-popup-body {
    min-height: 0;
    padding: 1.15rem;
    overflow: auto;
    overscroll-behavior: contain;
  }

  .prism-popup-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: .6rem;
    padding: .9rem 1.15rem;
    border-top: 1px solid var(--prism-color-border-faint);
    background: color-mix(in srgb, var(--prism-color-surface-tint) 50%, transparent);
  }

  @keyframes prism-popup-backdrop-in {
    from {
      opacity: 0;
    }
  }

  @keyframes prism-popup-panel-in {
    from {
      opacity: 0;
      transform: translateY(.7rem) scale(.98);
    }
  }

  .prism-popup-placement-top .prism-popup-panel {
    transform-origin: top center;
  }

  .prism-popup-placement-bottom .prism-popup-panel {
    transform-origin: bottom center;
  }

  @media (max-width: 38rem) {
    .prism-popup-layer {
      padding: .65rem;
    }

    .prism-popup-panel,
    .prism-popup-full {
      max-height: calc(100svh - 1.3rem);
    }

    .prism-popup-full {
      height: calc(100svh - 1.3rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .prism-popup-backdrop,
    .prism-popup-panel {
      animation: none;
    }
  }

  .prism-table {
    --prism-table-row-padding: .82rem;
    --prism-table-row-background: color-mix(in srgb, var(--prism-color-surface) 92%, transparent);
    position: relative;
    display: grid;
    min-width: 0;
    overflow: visible;
    border: 1px solid var(--prism-color-border-faint);
    border-radius: calc(var(--prism-radius-surface) + .18rem);
    color: var(--prism-color-text);
    background:
      radial-gradient(circle at 92% -35%, var(--prism-color-accent-glow), transparent 24rem),
      color-mix(in srgb, var(--prism-color-surface) 95%, transparent);
    box-shadow: var(--prism-shadow-card);
    isolation: isolate;
  }

  .prism-table-compact {
    --prism-table-row-padding: .54rem;
  }

  .prism-table-spacious {
    --prism-table-row-padding: 1.12rem;
  }

  .prism-table-toolbar,
  .prism-table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: .9rem 1rem;
  }

  .prism-table-toolbar {
    min-height: 4.5rem;
    border-bottom: 1px solid var(--prism-color-border-faint);
  }

  .prism-table-identity {
    display: grid;
    gap: .18rem;
    min-width: 0;
  }

  .prism-table-identity strong {
    overflow: hidden;
    color: var(--prism-color-ink);
    font-size: var(--prism-font-size-copy);
    font-weight: 820;
    letter-spacing: -.025em;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .prism-table-identity span {
    overflow: hidden;
    color: var(--prism-color-text-subtle);
    font-size: var(--prism-font-size-small);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .prism-table-toolbar-actions,
  .prism-table-pagination,
  .prism-table-pages,
  .prism-table-result-count {
    display: flex;
    align-items: center;
  }

  .prism-table-toolbar-actions {
    justify-content: flex-end;
    gap: .5rem;
    min-width: 0;
  }

  .prism-table-search {
    display: flex;
    width: min(19rem, 36vw);
    min-width: 10rem;
    align-items: center;
    gap: .52rem;
    padding: .58rem .72rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: .72rem;
    color: var(--prism-color-text-subtle);
    background: color-mix(in srgb, var(--prism-color-surface) 82%, transparent);
    box-shadow: inset 0 1px 0 var(--prism-color-white-soft);
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
  }

  .prism-table-search:focus-within {
    border-color: var(--prism-color-focus);
    background: var(--prism-color-surface);
    box-shadow: 0 0 0 .22rem var(--prism-color-focus-glow);
  }

  .prism-table-search input {
    width: 100%;
    min-width: 0;
    padding: 0;
    border: 0;
    outline: 0;
    color: var(--prism-color-ink);
    background: transparent;
    font: inherit;
    font-size: var(--prism-font-size-small);
  }

  .prism-table-search input::placeholder {
    color: var(--prism-color-text-subtle);
  }

  .prism-table-icon-button,
  .prism-table-page-arrow,
  .prism-table-page-number {
    display: inline-grid;
    width: 2.25rem;
    height: 2.25rem;
    flex: 0 0 2.25rem;
    place-items: center;
    padding: 0;
    border: 1px solid var(--prism-color-border-input);
    border-radius: .7rem;
    color: var(--prism-color-text-soft);
    background: color-mix(in srgb, var(--prism-color-surface) 88%, transparent);
    cursor: pointer;
    transition: border-color .18s ease, color .18s ease, background .18s ease, transform .18s ease, box-shadow .18s ease;
  }

  .prism-table-icon-button:hover,
  .prism-table-page-arrow:hover:not(:disabled),
  .prism-table-page-number:hover:not([data-active="true"]) {
    border-color: var(--prism-color-focus);
    color: var(--prism-color-ink);
    background: var(--prism-color-lavender-surface);
    transform: translateY(-1px);
  }

  .prism-table-icon-button:focus-visible,
  .prism-table-page-arrow:focus-visible,
  .prism-table-page-number:focus-visible,
  .prism-table-settings button:focus-visible,
  .prism-table-settings input:focus-visible,
  .prism-table-page-size select:focus-visible {
    outline: 2px solid var(--prism-color-focus);
    outline-offset: 2px;
  }

  .prism-table-settings-anchor {
    position: relative;
  }

  .prism-table-settings-scrim {
    position: fixed;
    z-index: 29;
    inset: 0;
    display: block;
    cursor: default;
  }

  .prism-table-settings {
    position: absolute;
    z-index: 30;
    top: calc(100% + .55rem);
    right: 0;
    display: grid;
    width: min(25rem, calc(100vw - 2rem));
    gap: .85rem;
    padding: .9rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: .9rem;
    color: var(--prism-color-text);
    background: color-mix(in srgb, var(--prism-color-surface) 97%, transparent);
    box-shadow: 0 1.25rem 3rem rgb(13 20 42 / 24%);
    backdrop-filter: blur(18px);
  }

  .prism-table-settings-heading,
  .prism-table-settings-column,
  .prism-table-settings-density {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .75rem;
  }

  .prism-table-settings-heading > div {
    display: grid;
    gap: .12rem;
  }

  .prism-table-settings-heading strong {
    color: var(--prism-color-ink);
    font-size: var(--prism-font-size-body);
  }

  .prism-table-settings-heading span,
  .prism-table-settings-density > span {
    color: var(--prism-color-text-subtle);
    font-size: var(--prism-font-size-small);
  }

  .prism-table-settings-columns {
    display: grid;
    max-height: 17rem;
    overflow: auto;
    border: 1px solid var(--prism-color-border-faint);
    border-radius: .7rem;
  }

  .prism-table-settings-column {
    min-height: 2.55rem;
    padding: .38rem .48rem .38rem .68rem;
    border-bottom: 1px solid var(--prism-color-border-faint);
  }

  .prism-table-settings-column:last-child {
    border-bottom: 0;
  }

  .prism-table-settings-column label {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: .52rem;
    color: var(--prism-color-text-soft);
    font-size: var(--prism-font-size-small);
    font-weight: 680;
    cursor: pointer;
  }

  .prism-table-settings-column label span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .prism-table-settings-column-actions,
  .prism-table-settings-column-controls,
  .prism-table-settings-density div {
    display: inline-flex;
    align-items: center;
  }

  .prism-table-settings-column-controls {
    gap: .35rem;
  }

  .prism-table-settings-column-controls select {
    height: 1.8rem;
    padding: 0 1.25rem 0 .42rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: .45rem;
    color: var(--prism-color-text-soft);
    background: var(--prism-color-surface);
    font: inherit;
    font-size: .64rem;
    font-weight: 700;
    cursor: pointer;
  }

  .prism-table-settings-column-controls select:focus-visible {
    outline: 2px solid var(--prism-color-focus);
    outline-offset: 2px;
  }

  .prism-table-settings-column-actions {
    gap: .2rem;
  }

  .prism-table-settings-column-actions button {
    display: inline-grid;
    width: 1.75rem;
    height: 1.75rem;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: .45rem;
    color: var(--prism-color-text-subtle);
    background: transparent;
    cursor: pointer;
  }

  .prism-table-settings-column-actions button:hover:not(:disabled) {
    color: var(--prism-color-ink);
    background: var(--prism-color-lavender-surface);
  }

  .prism-table-settings button:disabled {
    opacity: .35;
    cursor: not-allowed;
  }

  .prism-table-settings-density div {
    overflow: hidden;
    border: 1px solid var(--prism-color-border-input);
    border-radius: .55rem;
  }

  .prism-table-settings-density button {
    padding: .4rem .52rem;
    border: 0;
    border-right: 1px solid var(--prism-color-border-input);
    color: var(--prism-color-text-subtle);
    background: transparent;
    font: inherit;
    font-size: .66rem;
    font-weight: 720;
    text-transform: capitalize;
    cursor: pointer;
  }

  .prism-table-settings-density button:last-child {
    border-right: 0;
  }

  .prism-table-settings-density button[data-active="true"] {
    color: var(--prism-color-ink);
    background: var(--prism-color-lavender-surface);
  }

  .prism-table-reset {
    padding: .55rem .7rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: .6rem;
    color: var(--prism-color-text-soft);
    background: transparent;
    font: inherit;
    font-size: var(--prism-font-size-small);
    font-weight: 700;
    cursor: pointer;
  }

  .prism-table-reset:hover {
    color: var(--prism-color-error);
    background: rgb(239 68 68 / 7%);
  }

  .prism-table-viewport {
    min-width: 0;
    max-height: 38rem;
    overflow: auto;
    overscroll-behavior: contain;
  }

  .prism-table table {
    width: 100%;
    min-width: max-content;
    border-spacing: 0;
    table-layout: fixed;
  }

  .prism-table-selection-column {
    width: 2.9rem;
  }

  .prism-table-head th {
    position: relative;
    z-index: 3;
    padding: .72rem var(--prism-table-row-padding);
    border-bottom: 1px solid var(--prism-color-border-input);
    color: var(--prism-color-text-subtle);
    background: color-mix(in srgb, var(--prism-color-surface-tint) 76%, var(--prism-color-surface));
    font-size: .68rem;
    font-weight: 800;
    letter-spacing: .075em;
    text-align: left;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .prism-table-head-sticky th {
    position: sticky;
    top: 0;
  }

  .prism-table-header-cell[draggable="true"] {
    cursor: grab;
  }

  .prism-table-header-cell[data-dragging="true"] {
    opacity: .5;
    cursor: grabbing;
  }

  .prism-table-sort {
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: inherit;
    gap: .45rem;
    padding: 0;
    border: 0;
    color: inherit;
    background: transparent;
    font: inherit;
    letter-spacing: inherit;
    text-align: inherit;
    text-transform: inherit;
    cursor: pointer;
  }

  .prism-table-sort:disabled {
    cursor: default;
  }

  .prism-table-sort:focus-visible {
    outline: 2px solid var(--prism-color-focus);
    outline-offset: .35rem;
    border-radius: .2rem;
  }

  .prism-table-header-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .prism-table-sort-mark {
    position: relative;
    width: .48rem;
    height: .72rem;
    flex: 0 0 .48rem;
    opacity: .28;
  }

  .prism-table-sort-mark::before,
  .prism-table-sort-mark::after {
    position: absolute;
    left: .06rem;
    width: .3rem;
    height: .3rem;
    border-top: 1.5px solid currentColor;
    border-left: 1.5px solid currentColor;
    content: '';
  }

  .prism-table-sort-mark::before {
    top: .04rem;
    transform: rotate(45deg);
  }

  .prism-table-sort-mark::after {
    bottom: .04rem;
    transform: rotate(225deg);
  }

  .prism-table-sort-mark[data-direction="asc"],
  .prism-table-sort-mark[data-direction="desc"] {
    color: var(--prism-color-focus);
    opacity: 1;
  }

  .prism-table-sort-mark[data-direction="asc"]::after,
  .prism-table-sort-mark[data-direction="desc"]::before {
    opacity: .18;
  }

  .prism-table-resizer {
    position: absolute;
    z-index: 6;
    top: 22%;
    right: -.25rem;
    width: .5rem;
    height: 56%;
    border-radius: 999px;
    cursor: col-resize;
    touch-action: none;
  }

  .prism-table-resizer::after {
    position: absolute;
    top: 0;
    left: calc(50% - .5px);
    width: 1px;
    height: 100%;
    background: var(--prism-color-border-input);
    content: '';
    transition: width .15s ease, left .15s ease, background .15s ease;
  }

  .prism-table-resizer:hover::after,
  .prism-table-resizer:focus-visible::after {
    left: calc(50% - 1px);
    width: 2px;
    background: var(--prism-color-focus);
  }

  .prism-table-cell {
    box-sizing: border-box;
    min-width: 6rem;
  }

  .prism-table-body td {
    padding: var(--prism-table-row-padding);
    border-bottom: 1px solid var(--prism-color-border-faint);
    color: var(--prism-color-text-soft);
    background: var(--prism-table-row-background);
    font-size: var(--prism-font-size-small);
    vertical-align: middle;
    transition: color .16s ease, background .16s ease;
  }

  .prism-table-body tr:last-child td {
    border-bottom: 0;
  }

  .prism-table-striped .prism-table-body tr:nth-child(even) td {
    --prism-table-row-background: color-mix(in srgb, var(--prism-color-surface-tint) 38%, var(--prism-color-surface));
  }

  .prism-table-hoverable .prism-table-row:not(.prism-table-row-loading):hover td,
  .prism-table-row:focus-visible td {
    --prism-table-row-background: color-mix(in srgb, var(--prism-color-lavender-surface) 68%, var(--prism-color-surface));
    color: var(--prism-color-ink);
  }

  .prism-table-row-selected td {
    --prism-table-row-background: color-mix(in srgb, var(--prism-color-focus-glow) 48%, var(--prism-color-surface));
  }

  .prism-table-row-interactive {
    cursor: pointer;
  }

  .prism-table-row:focus-visible {
    outline: 2px solid var(--prism-color-focus);
    outline-offset: -2px;
  }

  .prism-table-cell-center,
  .prism-table-cell-center .prism-table-sort {
    justify-content: center;
    text-align: center;
  }

  .prism-table-cell-end,
  .prism-table-cell-end .prism-table-sort {
    justify-content: flex-end;
    text-align: right;
  }

  .prism-table-selection-cell {
    position: relative;
    z-index: 4;
    width: 2.9rem;
    min-width: 2.9rem;
    padding-right: .55rem !important;
    padding-left: .9rem !important;
    text-align: center;
  }

  .prism-table-selection-cell input,
  .prism-table-settings-column input {
    width: 1rem;
    height: 1rem;
    margin: 0;
    accent-color: var(--prism-color-focus);
    cursor: pointer;
  }

  .prism-table-cell-pinned {
    position: sticky !important;
    z-index: 4 !important;
    background: var(--prism-table-row-background) !important;
  }

  .prism-table-head .prism-table-cell-pinned {
    z-index: 7 !important;
    background: color-mix(in srgb, var(--prism-color-surface-tint) 76%, var(--prism-color-surface)) !important;
  }

  .prism-table-cell-pinned-left {
    box-shadow: 1px 0 var(--prism-color-border-faint);
  }

  .prism-table-cell-pinned-right {
    box-shadow: -1px 0 var(--prism-color-border-faint);
  }

  .prism-table-empty {
    height: 15rem;
    padding: 2rem !important;
    text-align: center;
  }

  .prism-table-empty > * {
    display: block;
    margin-inline: auto;
  }

  .prism-table-empty-mark {
    display: grid;
    width: 2.8rem;
    height: 2.8rem;
    place-items: center;
    margin-bottom: .7rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: .9rem;
    color: var(--prism-color-focus);
    background: var(--prism-color-lavender-surface);
    box-shadow: 0 .55rem 1.4rem var(--prism-color-focus-glow);
  }

  .prism-table-empty strong {
    margin-bottom: .3rem;
    color: var(--prism-color-ink);
    font-size: var(--prism-font-size-copy);
  }

  .prism-table-empty span:last-child {
    color: var(--prism-color-text-subtle);
  }

  .prism-table-skeleton {
    display: block;
    height: .72rem;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--prism-color-border-faint), var(--prism-color-lavender-surface), var(--prism-color-border-faint));
    background-size: 220% 100%;
    animation: prism-table-shimmer 1.5s ease infinite;
  }

  .prism-table-skeleton-check {
    width: 1rem;
    height: 1rem;
    border-radius: .22rem;
  }

  @keyframes prism-table-shimmer {
    to {
      background-position: -220% 0;
    }
  }

  .prism-table-footer {
    min-height: 3.8rem;
    border-top: 1px solid var(--prism-color-border-faint);
  }

  .prism-table-result-count {
    gap: .28rem;
    color: var(--prism-color-text-subtle);
    font-size: var(--prism-font-size-small);
    white-space: nowrap;
  }

  .prism-table-result-count strong {
    color: var(--prism-color-ink);
  }

  .prism-table-filtered-count {
    margin-left: .35rem;
    padding: .18rem .4rem;
    border-radius: 999px;
    color: var(--prism-color-focus);
    background: var(--prism-color-focus-glow);
    font-size: .64rem;
    font-weight: 760;
  }

  .prism-table-pagination {
    gap: .8rem;
  }

  .prism-table-page-size {
    display: flex;
    align-items: center;
    gap: .42rem;
    color: var(--prism-color-text-subtle);
    font-size: var(--prism-font-size-small);
  }

  .prism-table-page-size select {
    height: 2.2rem;
    padding: 0 1.75rem 0 .65rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: .62rem;
    color: var(--prism-color-ink);
    background: var(--prism-color-surface);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .prism-table-pages {
    gap: .25rem;
  }

  .prism-table-page-number[data-active="true"] {
    border-color: transparent;
    color: white;
    background: var(--prism-color-focus);
    box-shadow: 0 .4rem .9rem var(--prism-color-focus-glow);
  }

  .prism-table-page-arrow:disabled {
    opacity: .32;
    cursor: not-allowed;
  }

  @media (max-width: 48rem) {
    .prism-table-toolbar,
    .prism-table-footer {
      align-items: stretch;
      flex-direction: column;
    }

    .prism-table-toolbar-actions,
    .prism-table-pagination {
      justify-content: space-between;
    }

    .prism-table-search {
      width: 100%;
    }

    .prism-table-result-count {
      justify-content: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .prism-table-skeleton {
      animation: none;
    }
  }

  .prism-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.45rem;
    min-height: 1.35rem;
    padding: .18rem .46rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: 999px;
    color: var(--prism-color-text-soft);
    background: var(--prism-color-white);
    font-size: var(--prism-font-size-micro);
    font-weight: 760;
    letter-spacing: .04em;
    line-height: 1;
    white-space: nowrap;
  }

  .prism-badge-neutral {
    color: var(--prism-color-text-soft);
    background: var(--prism-color-white);
  }

  .prism-badge-success {
    border-color: var(--prism-color-success-glow);
    color: var(--prism-color-success);
    background: rgb(83 198 157 / 9%);
  }

  .prism-badge-info {
    border-color: rgb(14 165 233 / 24%);
    color: var(--prism-color-information);
    background: rgb(14 165 233 / 9%);
  }

  .prism-badge-warning {
    border-color: rgb(245 158 11 / 27%);
    color: var(--prism-color-warning);
    background: rgb(245 158 11 / 11%);
  }

  .prism-badge-error {
    border-color: rgb(239 68 68 / 25%);
    color: var(--prism-color-error);
    background: rgb(239 68 68 / 9%);
  }

  .prism-badge-small {
    min-height: 1.2rem;
    padding: .13rem .38rem;
    font-size: .62rem;
  }

  .prism-badge-large {
    min-height: 2rem;
    padding: .3rem .72rem;
    font-size: var(--prism-font-size-ui);
  }

  .prism-badge-pulse {
    animation: prism-badge-pulse .72s cubic-bezier(.2, .8, .3, 1);
  }

  @keyframes prism-badge-pulse {
    0% {
      box-shadow: 0 0 0 0 transparent;
      transform: scale(1);
    }

    38% {
      box-shadow: 0 0 0 .32rem var(--prism-color-focus-glow);
      transform: scale(1.12);
    }

    100% {
      box-shadow: 0 0 0 0 transparent;
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .prism-badge-pulse {
      animation: none;
    }
  }

  .prism-pulse {
    display: inline-flex;
    align-items: center;
    gap: .52rem;
    min-height: 1.5rem;
    color: var(--prism-color-information);
    font-size: var(--prism-font-size-body);
    font-weight: 760;
    line-height: 1;
  }

  .prism-pulse-success {
    color: var(--prism-color-success);
  }

  .prism-pulse-success .prism-pulse-core {
    box-shadow: 0 0 0 .25rem var(--prism-color-success-glow);
  }

  .prism-pulse-info {
    color: var(--prism-color-information);
  }

  .prism-pulse-info .prism-pulse-core {
    box-shadow: 0 0 0 .25rem rgb(14 165 233 / 16%);
  }

  .prism-pulse-warning {
    color: var(--prism-color-warning);
  }

  .prism-pulse-warning .prism-pulse-core {
    box-shadow: 0 0 0 .25rem rgb(245 158 11 / 17%);
  }

  .prism-pulse-error {
    color: var(--prism-color-error);
  }

  .prism-pulse-error .prism-pulse-core {
    box-shadow: 0 0 0 .25rem rgb(239 68 68 / 16%);
  }

  .prism-pulse-off {
    color: var(--prism-color-text-subtle);
  }

  .prism-pulse-off .prism-pulse-core {
    box-shadow: 0 0 0 .25rem rgb(138 149 168 / 18%);
  }

  .prism-pulse-mark {
    position: relative;
    display: inline-grid;
    width: 1.8rem;
    height: 1.8rem;
    flex: 0 0 1.8rem;
    place-items: center;
  }

  .prism-pulse-mark::before,
  .prism-pulse-mark::after {
    position: absolute;
    inset: 0;
    border: 1px solid currentColor;
    border-radius: 50%;
    content: '';
    opacity: 0;
    transform: scale(.55);
    animation: prism-pulse-ring 2.6s cubic-bezier(.2, .7, .3, 1) infinite;
  }

  .prism-pulse-mark::after {
    animation-delay: 1.3s;
  }

  .prism-pulse-once .prism-pulse-mark::before {
    animation-iteration-count: 1;
  }

  .prism-pulse-once .prism-pulse-mark::after {
    display: none;
  }

  .prism-pulse-core {
    position: relative;
    z-index: 1;
    display: inline-grid;
    width: .45rem;
    height: .45rem;
    place-items: center;
    border-radius: 50%;
    background: currentColor;
  }

  .prism-pulse-small .prism-pulse-core {
    width: .38rem;
    height: .38rem;
  }

  .prism-pulse-large .prism-pulse-core {
    width: .58rem;
    height: .58rem;
  }

  .prism-pulse-off .prism-pulse-mark::before,
  .prism-pulse-off .prism-pulse-mark::after {
    display: none;
  }

  @keyframes prism-pulse-ring {
    0% {
      opacity: .5;
      transform: scale(.55);
    }

    70%,
    100% {
      opacity: 0;
      transform: scale(1.8);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .prism-pulse-mark::before,
    .prism-pulse-mark::after {
      opacity: .25;
      transform: scale(1);
      animation: none;
    }
  }

  .prism-tree-view {
    color: var(--prism-color-text);
  }

  .prism-tree-list {
    display: grid;
    gap: .35rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .prism-tree-list-nested {
    margin: .45rem 0 0 1rem;
    padding-left: .85rem;
    border-left: 1px solid var(--prism-color-border-faint);
  }

  .prism-tree-branch,
  .prism-tree-leaf {
    list-style: none;
  }

  .prism-tree-details {
    display: grid;
    gap: .35rem;
  }

  .prism-tree-summary::-webkit-details-marker {
    display: none;
  }

  .prism-tree-summary::marker {
    content: '';
  }

  .prism-tree-summary,
  .prism-tree-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .8rem;
    width: 100%;
    min-height: 2.4rem;
    padding: .58rem .68rem;
    border: 1px solid var(--prism-color-border);
    border-radius: .95rem;
    color: inherit;
    background: linear-gradient(180deg, var(--prism-color-white-strong), var(--prism-color-white-tint));
    box-shadow: 0 .22rem .58rem rgb(37 49 78 / 5%);
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease, transform .18s ease, color .18s ease;
  }

  .prism-tree-summary:hover,
  .prism-tree-link:hover {
    border-color: var(--prism-color-border-strong);
    box-shadow: 0 .38rem .92rem rgb(37 49 78 / 9%);
    transform: translateY(-1px);
  }

  .prism-tree-summary:focus-visible,
  .prism-tree-link:focus-visible {
    outline: 3px solid var(--prism-color-focus-glow);
    outline-offset: 3px;
  }

  .prism-tree-details[open] > .prism-tree-summary {
    border-color: var(--prism-color-lavender-border);
    background: linear-gradient(180deg, var(--prism-color-white), var(--prism-color-lavender-surface));
    box-shadow: 0 .45rem .95rem rgb(89 88 181 / 10%);
  }

  .prism-tree-entry-copy {
    display: inline-flex;
    align-items: center;
    gap: .62rem;
    min-width: 0;
  }

  .prism-tree-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--prism-color-ink);
    font-size: var(--prism-font-size-body);
    font-weight: 700;
    letter-spacing: -.01em;
  }

  .prism-tree-toggle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: .92rem;
    height: .92rem;
    flex: 0 0 .92rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: .32rem;
    background: linear-gradient(180deg, var(--prism-color-white), var(--prism-color-surface-tint));
    box-shadow: 0 .12rem .28rem rgb(37 49 78 / 7%);
    transition: border-color .18s ease, background .18s ease, box-shadow .18s ease, transform .18s ease;
  }

  .prism-tree-toggle-bar {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 999px;
    background: var(--prism-color-text-subtle);
    transform: translate(-50%, -50%);
    transition: background-color .18s ease, opacity .18s ease, transform .18s ease;
  }

  .prism-tree-toggle-bar-horizontal {
    width: .46rem;
    height: 1.5px;
  }

  .prism-tree-toggle-bar-vertical {
    width: 1.5px;
    height: .46rem;
  }

  .prism-tree-details[open] > .prism-tree-summary .prism-tree-toggle {
    border-color: var(--prism-color-lavender-border);
    background: linear-gradient(180deg, var(--prism-color-white), var(--prism-color-lavender-surface));
    box-shadow: 0 .18rem .4rem rgb(89 88 181 / 11%);
    transform: translateY(-1px);
  }

  .prism-tree-details[open] > .prism-tree-summary .prism-tree-toggle-bar {
    background: var(--prism-color-action);
  }

  .prism-tree-details[open] > .prism-tree-summary .prism-tree-toggle-bar-vertical {
    opacity: 0;
    transform: scaleY(.45);
  }

  .prism-tree-marker,
  .prism-tree-dot {
    width: .5rem;
    height: .5rem;
    flex: 0 0 .5rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--prism-color-action), var(--prism-color-accent-bright));
    box-shadow: 0 0 0 .22rem var(--prism-color-focus-glow);
  }

  .prism-tree-dot {
    width: .42rem;
    height: .42rem;
    flex-basis: .42rem;
    box-shadow: 0 0 0 .16rem rgb(78 115 234 / 12%);
  }

  .prism-tree-summary-active,
  .prism-tree-details[open] > .prism-tree-summary-active,
  .prism-tree-link-active {
    border-color: var(--prism-color-lavender-border);
    background: linear-gradient(180deg, var(--prism-color-white), var(--prism-color-lavender-surface));
    box-shadow: 0 .52rem 1rem rgb(89 88 181 / 11%);
  }

  .prism-tree-summary-active:hover,
  .prism-tree-details[open] > .prism-tree-summary-active:hover,
  .prism-tree-link-active:hover {
    border-color: var(--prism-color-focus);
    background: linear-gradient(180deg, var(--prism-color-white), var(--prism-color-accent-soft));
    box-shadow: 0 .72rem 1.35rem rgb(89 88 181 / 18%);
    transform: translateY(-1px);
  }

  .prism-tree-summary-active .prism-tree-label,
  .prism-tree-link-active .prism-tree-label {
    color: var(--prism-color-ink);
  }

  .prism-tree-model-aurora {
    padding: .72rem;
    border: 1px solid rgb(137 119 246 / 18%);
    border-radius: 1.45rem;
    background:
      radial-gradient(circle at 8% 0%, rgb(104 211 255 / 17%), transparent 9rem),
      linear-gradient(135deg, rgb(255 255 255 / 82%), rgb(245 240 255 / 94%));
    box-shadow: 0 1.2rem 2.1rem rgb(109 94 247 / 10%);
  }

  .prism-tree-model-aurora .prism-tree-list-nested {
    border-left-color: rgb(137 119 246 / 25%);
  }

  .prism-tree-model-aurora .prism-tree-summary,
  .prism-tree-model-aurora .prism-tree-link {
    border-color: rgb(137 119 246 / 18%);
    border-radius: 1.15rem;
    background: linear-gradient(135deg, rgb(255 255 255 / 88%), rgb(247 243 255 / 82%));
    box-shadow: 0 .4rem 1rem rgb(109 94 247 / 8%);
  }

  .prism-tree-model-aurora .prism-tree-summary:hover,
  .prism-tree-model-aurora .prism-tree-link:hover {
    border-color: rgb(109 94 247 / 42%);
    box-shadow: 0 .55rem 1.2rem rgb(109 94 247 / 14%);
  }

  .prism-tree-model-aurora .prism-tree-details[open] > .prism-tree-summary {
    border-color: rgb(109 94 247 / 38%);
    background: linear-gradient(135deg, rgb(255 255 255 / 96%), rgb(237 233 255 / 95%));
    box-shadow: 0 .6rem 1.2rem rgb(109 94 247 / 14%);
  }

  .prism-tree-model-aurora .prism-tree-toggle {
    border-color: rgb(137 119 246 / 28%);
    background: rgb(255 255 255 / 72%);
  }

  .prism-tree-model-aurora .prism-tree-marker,
  .prism-tree-model-aurora .prism-tree-dot {
    background: linear-gradient(135deg, #836ef5, #58c9c2);
  }

  .prism-tree-model-aurora .prism-tree-summary-active,
  .prism-tree-model-aurora .prism-tree-details[open] > .prism-tree-summary-active,
  .prism-tree-model-aurora .prism-tree-link-active {
    border-color: rgb(109 94 247 / 42%);
    background: linear-gradient(135deg, rgb(255 255 255 / 96%), rgb(232 228 255 / 96%));
    box-shadow: 0 .58rem 1.15rem rgb(109 94 247 / 16%);
  }

  .prism-tree-model-aurora .prism-tree-summary-active:hover,
  .prism-tree-model-aurora .prism-tree-details[open] > .prism-tree-summary-active:hover,
  .prism-tree-model-aurora .prism-tree-link-active:hover {
    border-color: rgb(109 94 247 / 58%);
    background: linear-gradient(135deg, rgb(255 255 255 / 99%), rgb(223 217 255 / 98%));
    box-shadow: 0 .8rem 1.45rem rgb(109 94 247 / 24%);
  }

  .prism-tree-model-nocturne {
    padding: .9rem;
    border: 1px solid rgb(139 169 255 / 25%);
    border-radius: 1.45rem;
    color: #dce8ff;
    background:
      radial-gradient(circle at 88% 4%, rgb(111 139 255 / 19%), transparent 11rem),
      linear-gradient(145deg, #172344, #0b1126 72%);
    box-shadow: 0 1.25rem 2.2rem rgb(9 16 43 / 28%);
  }

  .prism-tree-model-nocturne .prism-tree-list-nested {
    border-left-color: rgb(139 169 255 / 28%);
  }

  .prism-tree-model-nocturne .prism-tree-summary,
  .prism-tree-model-nocturne .prism-tree-link {
    border-color: rgb(139 169 255 / 24%);
    color: #dce8ff;
    background: linear-gradient(180deg, rgb(38 55 96 / 88%), rgb(23 35 69 / 92%));
    box-shadow: 0 .28rem .75rem rgb(3 8 25 / 20%);
  }

  .prism-tree-model-nocturne .prism-tree-summary:hover,
  .prism-tree-model-nocturne .prism-tree-link:hover {
    border-color: rgb(154 186 255 / 58%);
    background: linear-gradient(180deg, rgb(48 68 116 / 92%), rgb(27 42 80 / 94%));
    box-shadow: 0 .48rem 1rem rgb(3 8 25 / 32%);
  }

  .prism-tree-model-nocturne .prism-tree-details[open] > .prism-tree-summary {
    border-color: rgb(131 213 255 / 56%);
    background: linear-gradient(180deg, rgb(44 68 116 / 96%), rgb(25 48 83 / 98%));
    box-shadow: 0 .5rem 1.2rem rgb(3 8 25 / 32%);
  }

  .prism-tree-model-nocturne .prism-tree-label {
    color: #f1f6ff;
  }

  .prism-tree-model-nocturne .prism-tree-toggle {
    border-color: rgb(139 169 255 / 44%);
    background: rgb(13 23 51 / 72%);
  }

  .prism-tree-model-nocturne .prism-tree-details[open] > .prism-tree-summary .prism-tree-toggle {
    border-color: rgb(131 213 255 / 56%);
    background: rgb(13 23 51 / 82%);
    box-shadow: 0 .18rem .4rem rgb(3 8 25 / 28%);
  }

  .prism-tree-model-nocturne .prism-tree-toggle-bar {
    background: #a5dfff;
  }

  .prism-tree-model-nocturne .prism-tree-details[open] > .prism-tree-summary .prism-tree-toggle-bar {
    background: #a5dfff;
  }

  .prism-tree-model-nocturne .prism-tree-marker,
  .prism-tree-model-nocturne .prism-tree-dot {
    background: linear-gradient(135deg, #80d9ff, #b09cff);
    box-shadow: 0 0 0 .22rem rgb(128 217 255 / 14%);
  }

  .prism-tree-model-nocturne .prism-tree-meta {
    border-color: rgb(128 217 255 / 30%);
    color: #bceaff;
    background: rgb(128 217 255 / 11%);
  }

  .prism-tree-model-nocturne .prism-tree-summary-active,
  .prism-tree-model-nocturne .prism-tree-details[open] > .prism-tree-summary-active,
  .prism-tree-model-nocturne .prism-tree-link-active {
    border-color: rgb(177 155 255 / 62%);
    background: linear-gradient(135deg, rgb(75 67 143 / 80%), rgb(40 63 107 / 92%));
    box-shadow: 0 .5rem 1.15rem rgb(93 78 203 / 25%);
  }

  .prism-tree-model-nocturne .prism-tree-summary-active:hover,
  .prism-tree-model-nocturne .prism-tree-details[open] > .prism-tree-summary-active:hover,
  .prism-tree-model-nocturne .prism-tree-link-active:hover {
    border-color: rgb(193 228 255 / 72%);
    background: linear-gradient(135deg, rgb(91 81 166 / 86%), rgb(47 76 126 / 96%));
    box-shadow: 0 .72rem 1.4rem rgb(93 78 203 / 34%);
  }

  .prism-tree-model-editorial {
    padding: .35rem .7rem .35rem .85rem;
    border-left: 3px solid var(--prism-color-peach-border);
    background: linear-gradient(90deg, rgb(255 248 244 / 74%), transparent 82%);
  }

  .prism-tree-model-editorial .prism-tree-list-nested {
    margin-left: .45rem;
    padding-left: 1.15rem;
    border-left: 1px solid var(--prism-color-peach-border);
  }

  .prism-tree-model-editorial .prism-tree-summary,
  .prism-tree-model-editorial .prism-tree-link {
    min-height: 2.65rem;
    padding: .5rem .25rem;
    border: 0;
    border-bottom: 1px solid var(--prism-color-border);
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .prism-tree-model-editorial .prism-tree-summary:hover,
  .prism-tree-model-editorial .prism-tree-link:hover {
    border-color: var(--prism-color-peach-border);
    background: linear-gradient(90deg, rgb(255 240 234 / 70%), transparent);
    box-shadow: none;
    transform: none;
  }

  .prism-tree-model-editorial .prism-tree-details[open] > .prism-tree-summary {
    border-color: var(--prism-color-accent);
    background: linear-gradient(90deg, rgb(255 240 234 / 78%), transparent);
    box-shadow: none;
  }

  .prism-tree-model-editorial .prism-tree-toggle {
    border: 0;
    background: transparent;
    box-shadow: none;
  }

  .prism-tree-model-editorial .prism-tree-details[open] > .prism-tree-summary .prism-tree-toggle {
    border: 0;
    background: transparent;
    box-shadow: none;
    transform: none;
  }

  .prism-tree-model-editorial .prism-tree-details[open] > .prism-tree-summary .prism-tree-toggle-bar {
    background: var(--prism-color-accent);
  }

  .prism-tree-model-editorial .prism-tree-marker,
  .prism-tree-model-editorial .prism-tree-dot {
    width: .38rem;
    height: .38rem;
    flex-basis: .38rem;
    background: var(--prism-color-accent-bright);
    box-shadow: 0 0 0 .17rem var(--prism-color-accent-glow);
  }

  .prism-tree-model-editorial .prism-tree-summary-active,
  .prism-tree-model-editorial .prism-tree-details[open] > .prism-tree-summary-active,
  .prism-tree-model-editorial .prism-tree-link-active {
    border-bottom-color: var(--prism-color-accent);
    background: linear-gradient(90deg, rgb(255 240 234 / 85%), transparent);
    box-shadow: none;
  }

  .prism-tree-model-editorial .prism-tree-summary-active:hover,
  .prism-tree-model-editorial .prism-tree-details[open] > .prism-tree-summary-active:hover,
  .prism-tree-model-editorial .prism-tree-link-active:hover {
    border-bottom-color: var(--prism-color-accent-hover);
    background: linear-gradient(90deg, rgb(255 233 225 / 94%), transparent 86%);
    box-shadow: inset 0 -1px 0 rgb(231 111 81 / 18%);
    transform: none;
  }

  .prism-tree-model-terminal {
    padding: .8rem;
    border: 1px solid rgb(91 224 148 / 23%);
    border-radius: 1.15rem;
    color: #baf5cb;
    background:
      radial-gradient(circle at 100% 0%, rgb(49 177 113 / 12%), transparent 10rem),
      linear-gradient(145deg, #101c1b, #091112 74%);
    box-shadow: 0 1.1rem 2rem rgb(4 14 13 / 25%);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  .prism-tree-model-terminal .prism-tree-list-nested {
    border-left-color: rgb(91 224 148 / 30%);
  }

  .prism-tree-model-terminal .prism-tree-summary,
  .prism-tree-model-terminal .prism-tree-link {
    min-height: 2.3rem;
    padding: .48rem .62rem;
    border-color: transparent;
    border-radius: .58rem;
    color: #baf5cb;
    background: transparent;
    box-shadow: none;
  }

  .prism-tree-model-terminal .prism-tree-summary:hover,
  .prism-tree-model-terminal .prism-tree-link:hover {
    border-color: rgb(91 224 148 / 28%);
    background: rgb(91 224 148 / 9%);
    box-shadow: none;
    transform: translateX(.12rem);
  }

  .prism-tree-model-terminal .prism-tree-details[open] > .prism-tree-summary {
    border-color: rgb(91 224 148 / 34%);
    background: rgb(91 224 148 / 13%);
    box-shadow: inset 3px 0 #5be094;
  }

  .prism-tree-model-terminal .prism-tree-details[open] > .prism-tree-summary .prism-tree-toggle {
    border-color: rgb(91 224 148 / 38%);
    background: rgb(91 224 148 / 7%);
    box-shadow: none;
    transform: none;
  }

  .prism-tree-model-terminal .prism-tree-details[open] > .prism-tree-summary .prism-tree-toggle-bar {
    background: #5be094;
  }

  .prism-tree-model-terminal .prism-tree-label {
    color: #d8ffe4;
    font-weight: 650;
    letter-spacing: .01em;
  }

  .prism-tree-model-terminal .prism-tree-toggle {
    border-color: rgb(91 224 148 / 38%);
    border-radius: .28rem;
    background: rgb(91 224 148 / 7%);
    box-shadow: none;
  }

  .prism-tree-model-terminal .prism-tree-toggle-bar {
    background: #5be094;
  }

  .prism-tree-model-terminal .prism-tree-marker,
  .prism-tree-model-terminal .prism-tree-dot {
    width: .38rem;
    height: .38rem;
    flex-basis: .38rem;
    background: #5be094;
    box-shadow: 0 0 0 .16rem rgb(91 224 148 / 12%);
  }

  .prism-tree-model-terminal .prism-tree-meta {
    border-color: rgb(91 224 148 / 28%);
    color: #8deeb0;
    background: rgb(91 224 148 / 9%);
    font-family: inherit;
  }

  .prism-tree-model-terminal .prism-tree-summary-active,
  .prism-tree-model-terminal .prism-tree-details[open] > .prism-tree-summary-active,
  .prism-tree-model-terminal .prism-tree-link-active {
    border-color: rgb(91 224 148 / 38%);
    background: rgb(91 224 148 / 14%);
    box-shadow: inset 3px 0 #5be094;
  }

  .prism-tree-model-terminal .prism-tree-summary-active:hover,
  .prism-tree-model-terminal .prism-tree-details[open] > .prism-tree-summary-active:hover,
  .prism-tree-model-terminal .prism-tree-link-active:hover {
    border-color: rgb(120 239 172 / 54%);
    background: rgb(91 224 148 / 18%);
    box-shadow: inset 3px 0 #5be094, 0 .24rem .62rem rgb(4 14 13 / 22%);
    transform: translateX(.12rem);
  }

  .prism-tree-view.prism-tree-items-minimal {
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .prism-tree-items-minimal .prism-tree-list,
  .prism-tree-items-minimal .prism-tree-details {
    gap: .08rem;
  }

  .prism-tree-items-minimal .prism-tree-list-nested {
    margin-top: .2rem;
  }

  .prism-tree-items-minimal .prism-tree-summary,
  .prism-tree-items-minimal .prism-tree-link,
  .prism-tree-items-minimal .prism-tree-summary:not(.prism-tree-summary-active):hover,
  .prism-tree-items-minimal .prism-tree-link:not(.prism-tree-link-active):hover,
  .prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary:not(.prism-tree-summary-active) {
    min-height: 2.2rem;
    padding: .46rem .55rem;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    transform: none;
  }

  .prism-tree-items-minimal .prism-tree-summary,
  .prism-tree-items-minimal .prism-tree-link {
    box-sizing: border-box;
  }

  .prism-tree-items-minimal .prism-tree-summary-active,
  .prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary-active,
  .prism-tree-items-minimal .prism-tree-link-active {
    border: 1px solid var(--prism-color-lavender-border);
    border-radius: .68rem;
    background: var(--prism-color-lavender-surface);
    box-shadow: 0 .28rem .72rem rgb(89 88 181 / 9%);
  }

  .prism-tree-items-minimal .prism-tree-summary-active:hover,
  .prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary-active:hover,
  .prism-tree-items-minimal .prism-tree-link-active:hover {
    border-color: var(--prism-color-focus);
    background: linear-gradient(180deg, rgb(255 255 255 / 96%), var(--prism-color-lavender-surface));
    box-shadow: 0 .42rem .95rem rgb(89 88 181 / 15%);
    transform: translateY(-1px);
  }

  .prism-tree-items-minimal .prism-tree-summary:hover .prism-tree-label,
  .prism-tree-items-minimal .prism-tree-link:hover .prism-tree-label,
  .prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary .prism-tree-label,
  .prism-tree-items-minimal .prism-tree-summary-active .prism-tree-label,
  .prism-tree-items-minimal .prism-tree-link-active .prism-tree-label {
    color: var(--prism-color-action);
  }

  .prism-tree-model-nocturne.prism-tree-items-minimal .prism-tree-summary:hover .prism-tree-label,
  .prism-tree-model-nocturne.prism-tree-items-minimal .prism-tree-link:hover .prism-tree-label,
  .prism-tree-model-nocturne.prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary .prism-tree-label,
  .prism-tree-model-nocturne.prism-tree-items-minimal .prism-tree-summary-active .prism-tree-label,
  .prism-tree-model-nocturne.prism-tree-items-minimal .prism-tree-link-active .prism-tree-label {
    color: #80d9ff;
  }

  .prism-tree-model-nocturne.prism-tree-items-minimal .prism-tree-summary-active,
  .prism-tree-model-nocturne.prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary-active,
  .prism-tree-model-nocturne.prism-tree-items-minimal .prism-tree-link-active {
    border-color: rgb(128 217 255 / 48%);
    background: rgb(42 61 106 / 78%);
    box-shadow: 0 .3rem .8rem rgb(3 8 25 / 24%);
  }

  .prism-tree-model-nocturne.prism-tree-items-minimal .prism-tree-summary-active:hover,
  .prism-tree-model-nocturne.prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary-active:hover,
  .prism-tree-model-nocturne.prism-tree-items-minimal .prism-tree-link-active:hover {
    border-color: rgb(165 231 255 / 64%);
    background: rgb(52 74 126 / 86%);
    box-shadow: 0 .42rem .98rem rgb(3 8 25 / 30%);
  }

  .prism-tree-model-aurora.prism-tree-items-minimal .prism-tree-summary-active,
  .prism-tree-model-aurora.prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary-active,
  .prism-tree-model-aurora.prism-tree-items-minimal .prism-tree-link-active {
    border-color: rgb(109 94 247 / 38%);
    background: rgb(237 233 255 / 88%);
    box-shadow: 0 .3rem .8rem rgb(109 94 247 / 10%);
  }

  .prism-tree-model-aurora.prism-tree-items-minimal .prism-tree-summary-active:hover,
  .prism-tree-model-aurora.prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary-active:hover,
  .prism-tree-model-aurora.prism-tree-items-minimal .prism-tree-link-active:hover {
    border-color: rgb(109 94 247 / 52%);
    background: rgb(229 223 255 / 94%);
    box-shadow: 0 .45rem 1rem rgb(109 94 247 / 16%);
  }

  .prism-tree-model-editorial.prism-tree-items-minimal .prism-tree-summary-active,
  .prism-tree-model-editorial.prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary-active,
  .prism-tree-model-editorial.prism-tree-items-minimal .prism-tree-link-active {
    border-color: var(--prism-color-peach-border);
    background: rgb(255 240 234 / 72%);
    box-shadow: 0 .28rem .72rem rgb(180 91 62 / 8%);
  }

  .prism-tree-model-editorial.prism-tree-items-minimal .prism-tree-summary-active:hover,
  .prism-tree-model-editorial.prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary-active:hover,
  .prism-tree-model-editorial.prism-tree-items-minimal .prism-tree-link-active:hover {
    border-color: var(--prism-color-accent);
    background: rgb(255 234 226 / 86%);
    box-shadow: 0 .34rem .82rem rgb(180 91 62 / 12%);
    transform: none;
  }

  .prism-tree-model-terminal.prism-tree-items-minimal .prism-tree-summary:hover .prism-tree-label,
  .prism-tree-model-terminal.prism-tree-items-minimal .prism-tree-link:hover .prism-tree-label,
  .prism-tree-model-terminal.prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary .prism-tree-label,
  .prism-tree-model-terminal.prism-tree-items-minimal .prism-tree-summary-active .prism-tree-label,
  .prism-tree-model-terminal.prism-tree-items-minimal .prism-tree-link-active .prism-tree-label {
    color: #5be094;
  }

  .prism-tree-model-terminal.prism-tree-items-minimal .prism-tree-summary-active,
  .prism-tree-model-terminal.prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary-active,
  .prism-tree-model-terminal.prism-tree-items-minimal .prism-tree-link-active {
    border-color: rgb(91 224 148 / 38%);
    background: rgb(91 224 148 / 11%);
    box-shadow: 0 .28rem .72rem rgb(4 14 13 / 20%);
  }

  .prism-tree-model-terminal.prism-tree-items-minimal .prism-tree-summary-active:hover,
  .prism-tree-model-terminal.prism-tree-items-minimal .prism-tree-details[open] > .prism-tree-summary-active:hover,
  .prism-tree-model-terminal.prism-tree-items-minimal .prism-tree-link-active:hover {
    border-color: rgb(91 224 148 / 56%);
    background: rgb(91 224 148 / 16%);
    box-shadow: 0 .4rem .9rem rgb(4 14 13 / 24%);
    transform: translateX(.12rem);
  }
`)
