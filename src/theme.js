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

export const prismTheme = globalCss(`
  :root {
    ${rootVariableRules}
  }

  ${buttonPaletteRules}

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

  .prism-tree-chevron {
    width: .52rem;
    height: .52rem;
    margin-top: -.08rem;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
    color: var(--prism-color-text-subtle);
    transform: rotate(-45deg);
    transition: transform .18s ease, color .18s ease, opacity .18s ease;
    opacity: .72;
  }

  .prism-tree-details[open] .prism-tree-chevron {
    color: var(--prism-color-action);
    transform: rotate(45deg) translateY(-1px);
    opacity: 1;
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

  .prism-tree-meta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.45rem;
    padding: .18rem .46rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: 999px;
    color: var(--prism-color-text-soft);
    background: var(--prism-color-white);
    font-size: var(--prism-font-size-micro);
    font-weight: 760;
    letter-spacing: .04em;
  }

  .prism-tree-link-active {
    border-color: var(--prism-color-lavender-border);
    background: linear-gradient(180deg, var(--prism-color-white), var(--prism-color-lavender-surface));
    box-shadow: 0 .52rem 1rem rgb(89 88 181 / 11%);
  }

  .prism-tree-link-active .prism-tree-label {
    color: var(--prism-color-ink);
  }
`)
