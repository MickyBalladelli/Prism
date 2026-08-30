import { globalCss } from '@mickyballadelli/matrix'
import { buttonPalettes } from './theme-palettes.js'
import { cssTokens } from './theme-tokens.js'

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
  .prism-theme-model-prism {
    color-scheme: light;
  }

  .prism-theme-model-aurora {
    color-scheme: light;
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
    color-scheme: dark;
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
    color-scheme: light;
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
    color-scheme: dark;
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
    color-scheme: light;
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

  .prism-button-small {
    min-height: 2rem;
    gap: .35rem;
    padding: .42rem .62rem;
    font-size: var(--prism-font-size-micro);
  }

  .prism-button-medium {
    min-height: 2.4rem;
  }

  .prism-button-large {
    min-height: 3rem;
    gap: .58rem;
    padding: .78rem 1.08rem;
    font-size: var(--prism-font-size-body);
  }

  .prism-button-pill {
    border-radius: 999px;
  }

  .prism-button-square {
    border-radius: .48rem;
  }

  .prism-button-full-width {
    width: 100%;
  }

  .prism-button-icon-only {
    width: 2.4rem;
    min-width: 2.4rem;
    padding: 0;
    aspect-ratio: 1;
  }

  .prism-button-small.prism-button-icon-only {
    width: 2rem;
    min-width: 2rem;
  }

  .prism-button-large.prism-button-icon-only {
    width: 3rem;
    min-width: 3rem;
  }

  .prism-button-full-width.prism-button-icon-only {
    width: 100%;
    aspect-ratio: auto;
  }

  .prism-button-icon {
    display: inline-grid;
    width: 1em;
    height: 1em;
    flex: 0 0 1em;
    place-items: center;
    font-size: 1.08em;
  }

  .prism-button-icon > svg {
    width: 100%;
    height: 100%;
  }

  .prism-button-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .prism-button-spinner {
    width: .9em;
    height: .9em;
    border: 1.7px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: prism-button-spin .72s linear infinite;
  }

  .prism-button-pressed {
    background: var(--prism-button-current-background-active);
    box-shadow: var(--prism-button-current-shadow-active);
    transform: translateY(1px);
  }

  @keyframes prism-button-spin {
    to {
      transform: rotate(1turn);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .prism-button-spinner {
      animation-duration: 1.8s;
    }
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

  .prism-button-pressed:hover:not(:disabled) {
    background: var(--prism-button-current-background-active);
    box-shadow: var(--prism-button-current-shadow-active);
    transform: translateY(1px);
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

  .prism-auto-complete {
    position: relative;
    display: grid;
    width: 100%;
  }

  .prism-auto-complete-label {
    display: block;
    margin-bottom: .4rem;
    color: var(--prism-color-text-strong);
    font-size: var(--prism-font-size-small);
    font-weight: 750;
  }

  .prism-auto-complete-control {
    position: relative;
  }

  .prism-auto-complete-input {
    width: 100%;
    min-height: 2.65rem;
    padding: .65rem 2.4rem .65rem .8rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: var(--prism-radius-control);
    outline: none;
    color: var(--prism-color-ink);
    background: var(--prism-color-white);
    font: inherit;
    font-size: var(--prism-font-size-body);
    line-height: 1.2;
    appearance: none;
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
  }

  .prism-auto-complete-input::placeholder {
    color: var(--prism-color-placeholder);
  }

  .prism-auto-complete-input:hover:not(:disabled) {
    border-color: var(--prism-color-border-strong);
    background: var(--prism-color-surface-tint);
  }

  .prism-auto-complete-input:focus-visible {
    border-color: var(--prism-color-focus);
    box-shadow: 0 0 0 .25rem var(--prism-color-focus-glow);
  }

  .prism-auto-complete-input:disabled {
    opacity: var(--prism-button-disabled-opacity);
    cursor: not-allowed;
  }

  .prism-auto-complete-input-invalid {
    border-color: var(--prism-color-error);
  }

  .prism-auto-complete-chevron {
    position: absolute;
    top: 50%;
    right: .9rem;
    width: .55rem;
    height: .55rem;
    border-right: 1.5px solid var(--prism-color-text-muted);
    border-bottom: 1.5px solid var(--prism-color-text-muted);
    pointer-events: none;
    transform: translateY(-70%) rotate(45deg);
    transition: transform .18s ease, border-color .18s ease;
  }

  .prism-auto-complete-input[aria-expanded="true"] + .prism-auto-complete-chevron {
    border-color: var(--prism-color-focus);
    transform: translateY(-25%) rotate(225deg);
  }

  .prism-auto-complete-menu {
    position: absolute;
    z-index: 20;
    right: 0;
    left: 0;
    display: grid;
    gap: .2rem;
    max-height: min(18rem, calc(100vh - 1rem));
    padding: .35rem;
    overflow: auto;
    border: 1px solid var(--prism-color-border-input);
    border-radius: var(--prism-radius-control);
    background: var(--prism-color-white);
    box-shadow: 0 .7rem 1.8rem rgb(37 49 78 / 15%), 0 .1rem .3rem rgb(37 49 78 / 8%);
  }

  .prism-auto-complete-menu[hidden] {
    display: none;
  }

  .prism-auto-complete-menu-bottom {
    top: calc(100% + .35rem);
  }

  .prism-auto-complete-menu-top {
    bottom: calc(100% + .35rem);
  }

  .prism-auto-complete-option {
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

  .prism-auto-complete-option:hover:not(:disabled),
  .prism-auto-complete-option-active,
  .prism-auto-complete-option-selected {
    color: var(--prism-color-ink);
    background: var(--prism-color-lavender-surface);
  }

  .prism-auto-complete-option:focus-visible {
    outline: 2px solid var(--prism-color-focus);
    outline-offset: -2px;
  }

  .prism-auto-complete-option:disabled {
    opacity: .48;
    cursor: not-allowed;
  }

  .prism-auto-complete-status {
    padding: .7rem;
    color: var(--prism-color-text-muted);
    font-size: var(--prism-font-size-small);
  }

  .prism-auto-complete-message {
    display: block;
    margin-top: .35rem;
    color: var(--prism-color-text-subtle);
    font-size: var(--prism-font-size-small);
  }

  .prism-auto-complete-message-error {
    color: var(--prism-color-error);
  }

  .prism-auto-complete-small .prism-auto-complete-input {
    min-height: 2.25rem;
    padding: .55rem 2.2rem .55rem .68rem;
    font-size: var(--prism-font-size-small);
  }

  .prism-auto-complete-large .prism-auto-complete-input {
    min-height: 3rem;
    padding: .82rem 2.55rem .82rem .95rem;
    font-size: var(--prism-font-size-copy);
  }

  .text-field-message,
  .check-box-message,
  .prism-select-message {
    display: block;
    margin-top: .35rem;
    color: var(--prism-color-text-subtle);
    font-size: var(--prism-font-size-small);
  }

  .text-field-message-error,
  .check-box-message-error,
  .prism-select-message-error {
    color: var(--prism-color-error);
  }

  .text-field-invalid {
    border-color: var(--prism-color-error);
  }

  .check-box-invalid {
    color: var(--prism-color-error);
  }

  .prism-select-trigger[aria-invalid="true"] {
    border-color: var(--prism-color-error);
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
    display: flex;
    flex-direction: column;
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
    flex-wrap: wrap;
    gap: .65rem;
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
    flex: 1;
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

  .prism-code-tabs {
    display: inline-flex;
    flex: 0 0 auto;
    gap: .12rem;
    padding: .14rem;
    border: 1px solid var(--prism-code-border);
    border-radius: 999px;
    background: rgb(3 8 25 / 28%);
  }

  .prism-code-tab {
    appearance: none;
    min-height: 1.55rem;
    padding: .18rem .7rem;
    border: 0;
    border-radius: 999px;
    color: var(--prism-code-gutter);
    background: transparent;
    font-family: inherit;
    font-size: .62rem;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: color .18s ease, background .18s ease, box-shadow .18s ease;
  }

  .prism-code-tab:hover {
    color: var(--prism-code-foreground);
  }

  .prism-code-tab:focus-visible {
    outline: 2px solid var(--prism-color-focus);
    outline-offset: 2px;
  }

  .prism-code-tab[aria-selected="true"] {
    color: var(--prism-code-foreground);
    background: var(--prism-code-background);
    box-shadow: 0 .2rem .6rem rgb(3 8 25 / 28%);
  }

  .prism-code-copy {
    display: inline-grid;
    width: 1.85rem;
    height: 1.85rem;
    margin-left: auto;
    place-items: center;
    padding: 0;
    border: 1px solid transparent;
    border-radius: .48rem;
    color: var(--prism-code-gutter);
    background: transparent;
    cursor: pointer;
    transition: color .18s ease, border-color .18s ease, background .18s ease, transform .18s ease;
  }

  .prism-code-status {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
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
    flex: 1;
    min-height: var(--prism-code-min-height);
    height: 24rem;
    max-height: var(--prism-code-max-height);
    overflow: hidden;
  }

  .prism-code-gutter {
    min-width: 3.1rem;
    height: 100%;
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
    min-height: 0;
    height: 100%;
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
    max-height: 100%;
    min-height: 0;
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

  .prism-layout {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    min-width: 0;
    min-height: 100%;
  }

  .prism-layout-body {
    display: grid;
    grid-template-columns: minmax(14rem, 18rem) minmax(0, 1fr);
    gap: 1.25rem;
    align-items: start;
    min-width: 0;
    padding: 1rem 1.25rem 2rem;
  }

  .prism-layout-navigator,
  .prism-layout-content {
    min-width: 0;
  }

  .prism-layout-header,
  .prism-layout-navigator,
  .prism-layout-footer {
    display: contents;
  }

  .prism-layout-content {
    min-height: 100%;
  }

  .prism-navigator {
    display: grid;
    align-content: start;
    gap: .85rem;
    min-width: 0;
    color: var(--prism-color-text);
  }

  .prism-navigator-sticky {
    position: sticky;
    top: 0;
  }

  .prism-navigator-header,
  .prism-navigator-footer {
    display: grid;
    gap: .25rem;
  }

  .prism-navigator-title {
    color: var(--prism-color-ink);
    font-size: .82rem;
    font-weight: 800;
  }

  .prism-navigator-description {
    color: var(--prism-color-text-muted);
    font-size: .76rem;
    line-height: 1.45;
  }

  .prism-navigator-body {
    min-width: 0;
  }

  .prism-footer {
    min-width: 0;
    border-top: 1px solid var(--prism-color-border);
    color: var(--prism-color-text-subtle);
  }

  .prism-footer-sticky {
    z-index: 40;
    background: color-mix(in srgb, var(--prism-color-surface-glass, #f7f4ff) 88%, transparent);
    backdrop-filter: blur(18px) saturate(1.2);
  }

  .prism-footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-width: 0;
    padding: 1.25rem;
  }

  .prism-footer-start,
  .prism-footer-end {
    display: flex;
    align-items: center;
    gap: .75rem;
    min-width: 0;
  }

  .prism-header {
    z-index: 40;
    width: 100%;
    border-bottom: 1px solid rgb(255 255 255 / 12%);
    background: color-mix(in srgb, var(--prism-color-surface-glass, #f7f4ff) 72%, transparent);
    box-shadow: 0 .45rem 1.6rem rgb(5 11 29 / 12%);
    backdrop-filter: blur(22px) saturate(1.25);
  }

  .prism-header-sticky {
    z-index: 40;
  }

  .prism-header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 3.7rem;
    padding: .7rem 1.2rem;
  }

  .prism-header-start,
  .prism-header-end {
    display: flex;
    align-items: center;
    gap: .85rem;
    min-width: 0;
  }

  .prism-header-start {
    flex: 1 1 auto;
  }

  .prism-header-end {
    flex: 0 1 auto;
    justify-content: flex-end;
  }

  @media (max-width: 48rem) {
    .prism-layout-body {
      grid-template-columns: minmax(0, 1fr);
    }

    .prism-navigator-sticky {
      position: static !important;
    }

    .prism-footer-inner {
      align-items: flex-start;
      flex-direction: column;
    }
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

  .prism-background-canvas,
  .prism-background-wash {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .prism-background-canvas {
    z-index: 0;
  }

  .prism-background-layer,
  .prism-background-fallback {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .prism-background-layer {
    opacity: 1;
  }

  .prism-background-fallback,
  .prism-background-canvas[data-renderer="webgl"] .prism-background-fallback {
    display: none;
  }

  .prism-background-canvas[data-renderer="fallback"] .prism-background-layer {
    display: none;
  }

  .prism-background-canvas[data-renderer="fallback"] .prism-background-fallback {
    display: block;
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

  .prism-label {
    --prism-label-size: var(--prism-font-size-lead);
    --prism-label-font: inherit;
    --prism-label-weight: 650;
    --prism-label-tracking: .01em;
    --prism-label-leading: 1.18;
    --prism-label-color: var(--prism-color-ink);
    --prism-label-stroke: #f4f0e6;
    display: inline-block;
    max-width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    color: var(--prism-label-color);
    font-family: var(--prism-label-font);
    font-size: var(--prism-label-size);
    font-weight: var(--prism-label-weight);
    letter-spacing: var(--prism-label-tracking);
    line-height: var(--prism-label-leading);
    vertical-align: baseline;
  }

  .prism-label-size-small {
    --prism-label-size: var(--prism-font-size-label);
    --prism-label-tracking: .06em;
    --prism-label-leading: 1.25;
  }

  .prism-label-size-medium {
    --prism-label-size: var(--prism-font-size-lead);
  }

  .prism-label-size-large {
    --prism-label-size: clamp(1.2rem, 2.2vw, 1.55rem);
    --prism-label-tracking: .01em;
  }

  .prism-label-size-display {
    --prism-label-size: clamp(1.45rem, 2.8vw, 2rem);
    --prism-label-tracking: -.01em;
    --prism-label-leading: 1.08;
  }

  .prism-label-font-sans {
    --prism-label-font: inherit;
  }

  .prism-label-font-serif {
    --prism-label-font: Georgia, 'Times New Roman', serif;
  }

  .prism-label-font-mono {
    --prism-label-font: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
    --prism-label-tracking: -.03em;
  }

  .prism-label-weight-regular {
    --prism-label-weight: 500;
  }

  .prism-label-weight-medium {
    --prism-label-weight: 620;
  }

  .prism-label-weight-semibold {
    --prism-label-weight: 740;
  }

  .prism-label-weight-bold {
    --prism-label-weight: 830;
  }

  .prism-label-tone-ink {
    --prism-label-color: var(--prism-color-ink);
  }

  .prism-label-tone-muted {
    --prism-label-color: var(--prism-color-text-muted);
  }

  .prism-label-tone-accent {
    --prism-label-color: var(--prism-color-action);
  }

  .prism-label-tone-inverse {
    --prism-label-color: #f6f3ec;
  }

  .prism-label-always-visible {
    --prism-label-color: #0a1020;
    --prism-label-stroke: #f3eee4;
    position: relative;
    z-index: 2;
  }

  .prism-label-halo,
  .prism-label-face {
    display: block;
  }

  .prism-label-halo {
    position: absolute;
    inset: 0;
    color: transparent;
    -webkit-text-stroke: .09em var(--prism-label-stroke);
    pointer-events: none;
    user-select: none;
  }

  .prism-label-face {
    position: relative;
    color: var(--prism-label-color);
  }

  .prism-label-always-visible.prism-label-size-small .prism-label-halo {
    -webkit-text-stroke-width: .11em;
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

  .prism-table-status {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
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

  .prism-table-virtual-spacer td {
    height: 0;
    padding: 0 !important;
    border: 0 !important;
    background: transparent !important;
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

  .prism-table-error {
    gap: .45rem;
  }

  .prism-table-retry {
    margin-top: .3rem;
    padding: .45rem .7rem;
    border: 1px solid var(--prism-color-border-strong);
    border-radius: var(--prism-radius-control);
    color: var(--prism-color-ink);
    background: var(--prism-color-surface);
    font: inherit;
    font-size: var(--prism-font-size-small);
    font-weight: 750;
    cursor: pointer;
  }

  .prism-table-retry:hover {
    border-color: var(--prism-color-focus);
    color: var(--prism-color-focus);
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

  .prism-tree-controls {
    display: grid;
    gap: .65rem;
    margin-bottom: .8rem;
    padding-bottom: .8rem;
    border-bottom: 1px solid var(--prism-color-border);
  }

  .prism-tree-filter {
    display: grid;
    gap: .4rem;
  }

  .prism-tree-filter-label {
    color: var(--prism-color-ink);
    font-size: .76rem;
    font-weight: 750;
  }

  .prism-tree-filter-input {
    width: 100%;
  }

  .prism-tree-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .65rem;
  }

  .prism-tree-count {
    min-width: 0;
    overflow: hidden;
    color: var(--prism-color-text-muted);
    font-size: .72rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .prism-tree-filter-empty {
    margin: 0 0 .8rem;
    padding: .65rem .7rem;
    border: 1px dashed var(--prism-color-border-strong);
    border-radius: var(--prism-radius-small);
    color: var(--prism-color-text-muted);
    font-size: .78rem;
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

  /* display:grid on details disables the UA hide-when-closed behavior */
  .prism-tree-details:not([open]) > :not(summary) {
    display: none;
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

  :where(
    .prism-form-field,
    .prism-auto-complete,
    .prism-color-picker,
    .prism-date-picker,
    .prism-date-time-picker,
    .prism-alert,
    .prism-toast-region,
    .prism-dropdown,
    .prism-menu,
    .prism-popover-anchor,
    .prism-tooltip-anchor,
    .prism-tabs,
    .prism-progress,
    .prism-spinner,
    .prism-skeleton,
    .prism-empty-state,
    .prism-pagination,
    .prism-avatar,
    .prism-tag,
    .prism-separator,
    .prism-stack,
    .prism-grid
  ) {
    --prism-color-text-strong: var(--prism-color-ink);
    --prism-color-text-inverse: var(--prism-color-white);
    --prism-color-surface-raised: var(--prism-color-surface-card);
    --prism-color-surface-hover: var(--prism-color-surface-tint);
    --prism-color-danger: var(--prism-color-error);
    --prism-radius-small: 0.45rem;
    --prism-radius-medium: var(--prism-radius-control);
    --prism-shadow-floating: var(--prism-shadow-card);
  }

  .prism-form-field {
    display: grid;
    gap: 0.45rem;
  }

  .prism-form-field-label {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--prism-color-text-strong);
    font-size: 0.85rem;
    font-weight: 700;
  }

  .prism-form-field-required,
  .prism-form-field-error {
    color: var(--prism-color-danger);
  }

  .prism-form-field-hint,
  .prism-form-field-error {
    font-size: 0.78rem;
    line-height: 1.4;
  }

  .prism-form-field-hint {
    color: var(--prism-color-text-muted);
  }

  .prism-form-field-error {
    font-weight: 600;
  }

  .prism-color-picker {
    display: grid;
    gap: 0.45rem;
    width: max-content;
    max-width: 100%;
  }

  .prism-color-picker-label {
    color: var(--prism-color-text-strong);
    font-size: 0.85rem;
    font-weight: 700;
  }

  .prism-color-picker-control {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
  }

  .prism-color-picker-input {
    display: block;
    width: 3.15rem;
    height: 2.35rem;
    padding: 0.2rem;
    border: 1px solid var(--prism-color-border-strong);
    border-radius: var(--prism-radius-medium);
    background: var(--prism-color-surface-raised);
    cursor: pointer;
  }

  .prism-color-picker-input:hover {
    border-color: var(--prism-color-accent);
  }

  .prism-color-picker-input:focus-visible {
    outline: 2px solid var(--prism-color-focus);
    outline-offset: 2px;
  }

  .prism-color-picker-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .prism-color-picker-small .prism-color-picker-input {
    width: 2.65rem;
    height: 1.95rem;
  }

  .prism-color-picker-large .prism-color-picker-input {
    width: 3.65rem;
    height: 2.75rem;
  }

  .prism-color-picker-value {
    color: var(--prism-color-text-muted);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.78rem;
    letter-spacing: 0.03em;
  }

  .prism-date-picker,
  .prism-date-time-picker {
    position: relative;
    display: grid;
    gap: 0.45rem;
    width: min(100%, 20rem);
  }

  .prism-date-input-label {
    color: var(--prism-color-text-strong);
    font-size: 0.85rem;
    font-weight: 700;
  }

  .prism-date-input-control-wrap {
    position: relative;
    min-width: 0;
  }

  .prism-date-input-control-row {
    display: flex;
    align-items: stretch;
    min-width: 0;
  }

  .prism-date-input-control {
    box-sizing: border-box;
    min-width: 0;
    width: auto;
    flex: 1;
    min-height: 2.65rem;
    padding: 0.55rem 0.7rem;
    border: 1px solid var(--prism-color-border-strong);
    border-radius: var(--prism-radius-medium) 0 0 var(--prism-radius-medium);
    color: var(--prism-color-text-strong);
    background: var(--prism-color-surface-raised);
    font: inherit;
    color-scheme: inherit;
    accent-color: var(--prism-color-action);
    appearance: none;
  }

  .prism-date-input-trigger {
    display: inline-grid;
    flex: 0 0 2.65rem;
    place-items: center;
    min-height: 2.65rem;
    margin-left: -1px;
    padding: 0;
    border: 1px solid var(--prism-color-border-strong);
    border-radius: 0 var(--prism-radius-medium) var(--prism-radius-medium) 0;
    color: var(--prism-color-action);
    background: var(--prism-color-surface-raised);
    cursor: pointer;
  }

  .prism-date-input-trigger:hover,
  .prism-date-input-trigger:focus-visible {
    border-color: var(--prism-color-accent);
    color: var(--prism-color-accent);
    background: var(--prism-color-surface-hover);
  }

  .prism-date-input-trigger:focus-visible {
    position: relative;
    z-index: 1;
    outline: 2px solid var(--prism-color-focus);
    outline-offset: 2px;
  }

  .prism-date-input-trigger:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .prism-theme-model-prism .prism-date-input-control,
  .prism-theme-model-aurora .prism-date-input-control,
  .prism-theme-model-editorial .prism-date-input-control {
    color-scheme: light;
  }

  .prism-theme-model-nocturne .prism-date-input-control,
  .prism-theme-model-terminal .prism-date-input-control {
    color-scheme: dark;
  }

  .prism-date-input-control:hover {
    border-color: var(--prism-color-accent);
  }

  .prism-date-input-control:focus-visible {
    outline: 2px solid var(--prism-color-focus);
    outline-offset: 2px;
  }

  .prism-date-input-control:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .prism-date-picker-small .prism-date-input-control,
  .prism-date-time-picker-small .prism-date-input-control {
    min-height: 2.25rem;
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
  }

  .prism-date-picker-small .prism-date-input-trigger,
  .prism-date-time-picker-small .prism-date-input-trigger {
    flex-basis: 2.25rem;
    min-height: 2.25rem;
  }

  .prism-date-picker-large .prism-date-input-control,
  .prism-date-time-picker-large .prism-date-input-control {
    min-height: 3rem;
    padding: 0.7rem 0.8rem;
  }

  .prism-date-picker-large .prism-date-input-trigger,
  .prism-date-time-picker-large .prism-date-input-trigger {
    flex-basis: 3rem;
    min-height: 3rem;
  }

  .prism-date-picker-popup-wrap {
    position: static;
  }

  .prism-date-picker-popup {
    position: absolute;
    z-index: 100;
    top: calc(100% + 0.5rem);
    left: 0;
    width: min(22rem, calc(100vw - 2rem));
    padding: 0.8rem;
    overflow: hidden;
    border: 1px solid var(--prism-color-border);
    border-radius: var(--prism-radius-medium);
    color: var(--prism-color-text-strong);
    background: var(--prism-color-surface-raised);
    box-shadow: var(--prism-shadow-floating);
    color-scheme: inherit;
  }

  .prism-date-picker-popup[hidden] {
    display: none;
  }

  .prism-date-picker-popup-header,
  .prism-date-picker-popup-footer,
  .prism-date-picker-popup-actions {
    display: flex;
    align-items: center;
  }

  .prism-date-picker-popup-header {
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.7rem;
  }

  .prism-date-picker-month {
    min-width: 0;
    color: var(--prism-color-text-strong);
    font-size: 0.9rem;
    text-align: center;
  }

  .prism-date-picker-nav,
  .prism-date-picker-today,
  .prism-date-picker-close,
  .prism-date-picker-confirm {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    border: 1px solid transparent;
    border-radius: var(--prism-radius-small);
    color: var(--prism-color-action);
    background: transparent;
    font: inherit;
    cursor: pointer;
  }

  .prism-date-picker-nav {
    width: 2rem;
    height: 2rem;
    padding: 0;
  }

  .prism-date-picker-nav:hover,
  .prism-date-picker-nav:focus-visible,
  .prism-date-picker-today:hover,
  .prism-date-picker-today:focus-visible,
  .prism-date-picker-close:hover,
  .prism-date-picker-close:focus-visible {
    border-color: var(--prism-color-border);
    background: var(--prism-color-surface-hover);
    outline: none;
  }

  .prism-date-picker-weekdays,
  .prism-date-picker-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.2rem;
  }

  .prism-date-picker-weekdays {
    margin-bottom: 0.25rem;
  }

  .prism-date-picker-weekdays span {
    color: var(--prism-color-text-muted);
    font-size: 0.68rem;
    font-weight: 750;
    text-align: center;
  }

  .prism-date-picker-day {
    display: grid;
    min-width: 0;
    min-height: 2rem;
    place-items: center;
    padding: 0.15rem;
    border: 1px solid transparent;
    border-radius: var(--prism-radius-small);
    color: var(--prism-color-text-strong);
    background: transparent;
    font: inherit;
    font-size: 0.78rem;
    cursor: pointer;
  }

  .prism-date-picker-day:hover,
  .prism-date-picker-day:focus-visible {
    border-color: var(--prism-color-accent);
    background: var(--prism-color-surface-hover);
    outline: none;
  }

  .prism-date-picker-day-outside {
    color: var(--prism-color-text-subtle);
  }

  .prism-date-picker-day-today {
    border-color: var(--prism-color-border-strong);
  }

  .prism-date-picker-day-selected {
    border-color: var(--prism-color-action);
    color: var(--prism-color-text-inverse);
    background: var(--prism-color-action);
  }

  .prism-date-picker-day-selected:hover,
  .prism-date-picker-day-selected:focus-visible {
    border-color: var(--prism-color-action-hover);
    color: var(--prism-color-text-inverse);
    background: var(--prism-color-action-hover);
  }

  .prism-date-picker-day:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .prism-date-picker-time {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: end;
    gap: 0.45rem;
    margin-top: 0.75rem;
    padding-top: 0.7rem;
    border-top: 1px solid var(--prism-color-border);
  }

  .prism-date-picker-time-heading {
    grid-column: 1 / -1;
    color: var(--prism-color-text-muted);
    font-size: 0.72rem;
    font-weight: 750;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .prism-date-picker-time-field {
    display: grid;
    gap: 0.25rem;
    color: var(--prism-color-text-muted);
    font-size: 0.7rem;
    font-weight: 650;
  }

  .prism-date-picker-time-field select {
    min-height: 2.1rem;
    padding: 0.35rem 0.5rem;
    border: 1px solid var(--prism-color-border-input);
    border-radius: var(--prism-radius-small);
    color: var(--prism-color-text-strong);
    background: var(--prism-color-surface);
    font: inherit;
    color-scheme: inherit;
  }

  .prism-date-picker-time-separator {
    padding-bottom: 0.45rem;
    color: var(--prism-color-text-muted);
    font-weight: 800;
  }

  .prism-date-picker-popup-footer {
    justify-content: space-between;
    gap: 0.7rem;
    margin-top: 0.75rem;
    padding-top: 0.7rem;
    border-top: 1px solid var(--prism-color-border);
  }

  .prism-date-picker-selected {
    min-width: 0;
    overflow: hidden;
    color: var(--prism-color-text-muted);
    font-size: 0.72rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .prism-date-picker-popup-actions {
    flex: 0 0 auto;
    gap: 0.35rem;
  }

  .prism-date-picker-today,
  .prism-date-picker-close,
  .prism-date-picker-confirm {
    min-height: 2rem;
    padding: 0.35rem 0.5rem;
    font-size: 0.72rem;
    font-weight: 700;
  }

  .prism-date-picker-confirm {
    color: var(--prism-color-text-inverse);
    background: var(--prism-color-action);
  }

  .prism-date-picker-confirm:hover,
  .prism-date-picker-confirm:focus-visible {
    background: var(--prism-color-action-hover);
    outline: none;
  }

  .prism-date-picker-confirm:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .prism-alert {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    min-width: 0;
    padding: 0.8rem 0.9rem;
    border: 1px solid var(--prism-color-border);
    border-radius: var(--prism-radius-medium);
    background: var(--prism-color-surface-raised);
    color: var(--prism-color-text);
  }

  .prism-alert-success { border-color: color-mix(in srgb, var(--prism-color-success) 45%, var(--prism-color-border)); }
  .prism-alert-info { border-color: color-mix(in srgb, var(--prism-color-information) 45%, var(--prism-color-border)); }
  .prism-alert-warning { border-color: color-mix(in srgb, var(--prism-color-warning-end) 60%, var(--prism-color-border)); }
  .prism-alert-error { border-color: color-mix(in srgb, var(--prism-color-danger) 55%, var(--prism-color-border)); }
  .prism-alert-success .prism-alert-icon { color: var(--prism-color-success); }
  .prism-alert-info .prism-alert-icon { color: var(--prism-color-information); }
  .prism-alert-warning .prism-alert-icon { color: var(--prism-color-warning-end); }
  .prism-alert-error .prism-alert-icon { color: var(--prism-color-danger); }
  .prism-alert-icon {
    display: grid;
    flex: 0 0 1.35rem;
    place-items: center;
    width: 1.35rem;
    height: 1.35rem;
    border: 1px solid currentColor;
    border-radius: 50%;
    font-size: 0.78rem;
    font-weight: 800;
  }
  .prism-alert-body { min-width: 0; flex: 1; }
  .prism-alert-title { font-weight: 750; }
  .prism-alert-description { margin-top: 0.2rem; color: var(--prism-color-text-muted); line-height: 1.45; }
  .prism-alert-dismiss,
  .prism-tag-remove {
    display: inline-grid;
    flex: 0 0 auto;
    place-items: center;
    border: 0;
    padding: 0.25rem;
    border-radius: var(--prism-radius-small);
    background: transparent;
    color: inherit;
    cursor: pointer;
  }
  .prism-alert-dismiss:hover,
  .prism-alert-dismiss:focus-visible,
  .prism-tag-remove:hover,
  .prism-tag-remove:focus-visible { background: var(--prism-color-surface-hover); }

  .prism-toast-region {
    position: fixed;
    z-index: 1000;
    display: grid;
    gap: 0.65rem;
    width: min(26rem, calc(100vw - 2rem));
    pointer-events: none;
  }
  .prism-toast-region-top-start { top: 1rem; left: 1rem; }
  .prism-toast-region-top-end { top: 1rem; right: 1rem; }
  .prism-toast-region-bottom-start { bottom: 1rem; left: 1rem; }
  .prism-toast-region-bottom-end { right: 1rem; bottom: 1rem; }
  .prism-toast { pointer-events: auto; animation: prism-toast-in 180ms ease-out both; }
  @keyframes prism-toast-in { from { opacity: 0; transform: translateY(0.5rem); } to { opacity: 1; transform: translateY(0); } }

  .prism-dropdown,
  .prism-popover-anchor,
  .prism-tooltip-anchor { position: relative; display: inline-flex; }
  .prism-dropdown-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    border: 1px solid var(--prism-color-border);
    border-radius: var(--prism-radius-small);
    padding: 0.55rem 0.7rem;
    background: var(--prism-color-surface-raised);
    color: var(--prism-color-text-strong);
    cursor: pointer;
  }
  .prism-dropdown-trigger:hover { background: var(--prism-color-surface-hover); }
  .prism-dropdown-panel,
  .prism-popover,
  .prism-tooltip {
    z-index: 100;
    border: 1px solid var(--prism-color-border);
    border-radius: var(--prism-radius-medium);
    background: var(--prism-color-surface-raised);
    box-shadow: var(--prism-shadow-floating);
  }
  .prism-dropdown-panel {
    position: fixed;
    min-width: 12rem;
    padding: 0.35rem;
  }
  .prism-dropdown-panel[hidden] {
    display: none;
  }

  .prism-menu { min-width: 11rem; padding: 0.25rem; outline: none; }
  .prism-menu-item {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.6rem;
    border: 0;
    border-radius: var(--prism-radius-small);
    padding: 0.55rem 0.65rem;
    background: transparent;
    color: var(--prism-color-text);
    font: inherit;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
  }
  .prism-menu-item:hover,
  .prism-menu-item:focus-visible { background: var(--prism-color-surface-hover); color: var(--prism-color-text-strong); outline: none; }
  .prism-menu-item:disabled,
  .prism-menu-item[aria-disabled="true"] { opacity: 0.45; cursor: not-allowed; }
  .prism-menu-item-icon,
  .prism-menu-item-end { display: inline-grid; place-items: center; flex: 0 0 auto; }
  .prism-menu-item-label { min-width: 0; flex: 1; }
  .prism-menu-item-shortcut { color: var(--prism-color-text-muted); font-size: 0.75rem; }
  .prism-menu-separator { height: 1px; margin: 0.35rem 0; background: var(--prism-color-border); }
  .prism-menu-group-label { padding: 0.5rem 0.65rem 0.25rem; color: var(--prism-color-text-muted); font-size: 0.72rem; font-weight: 750; text-transform: uppercase; letter-spacing: 0.06em; }
  .prism-menu-submenu { position: relative; }
  .prism-menu-submenu > .prism-menu { position: absolute; top: -0.3rem; left: calc(100% + 0.3rem); border: 1px solid var(--prism-color-border); border-radius: var(--prism-radius-medium); background: var(--prism-color-surface-raised); box-shadow: var(--prism-shadow-floating); }

  .prism-tooltip {
    position: fixed;
    top: 0;
    left: 0;
    width: max-content;
    max-width: min(20rem, calc(100vw - 1rem));
    padding: 0.45rem 0.6rem;
    color: var(--prism-color-page);
    background: var(--prism-color-ink);
    font-size: 0.75rem;
    line-height: 1.35;
    pointer-events: none;
  }

  .prism-popover {
    position: fixed;
    min-width: 12rem;
    max-width: min(28rem, calc(100vw - 1rem));
    padding: 1rem;
  }
  .prism-popover-trigger { display: inline-flex; cursor: pointer; }

  .prism-tabs-list { display: flex; gap: 0.2rem; border-bottom: 1px solid var(--prism-color-border); overflow-x: auto; }
  .prism-tabs-vertical { display: grid; grid-template-columns: auto 1fr; gap: 1rem; }
  .prism-tabs-vertical .prism-tabs-list { flex-direction: column; border-right: 1px solid var(--prism-color-border); border-bottom: 0; }
  .prism-tabs-tab {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    border: 0;
    border-bottom: 2px solid transparent;
    padding: 0.65rem 0.8rem;
    background: transparent;
    color: var(--prism-color-text-muted);
    font: inherit;
    white-space: nowrap;
    cursor: pointer;
  }
  .prism-tabs-tab:hover,
  .prism-tabs-tab.is-active { border-bottom-color: var(--prism-color-accent); color: var(--prism-color-text-strong); }
  .prism-tabs-vertical .prism-tabs-tab { justify-content: flex-start; border-right: 2px solid transparent; border-bottom: 0; }
  .prism-tabs-vertical .prism-tabs-tab.is-active { border-right-color: var(--prism-color-accent); }
  .prism-tabs-tab:disabled { opacity: 0.45; cursor: not-allowed; }
  .prism-tabs-panels { padding-top: 1rem; }
  .prism-tabs-panel:focus-visible { outline: 2px solid var(--prism-color-focus); outline-offset: 3px; }

  .prism-progress { display: grid; gap: 0.4rem; width: 100%; }
  .prism-progress-header { display: flex; justify-content: space-between; gap: 1rem; color: var(--prism-color-text-muted); font-size: 0.78rem; }
  .prism-progress-track { position: relative; overflow: hidden; border-radius: 999px; background: var(--prism-color-surface-hover); }
  .prism-progress-small .prism-progress-track { height: 0.25rem; }
  .prism-progress-medium .prism-progress-track { height: 0.45rem; }
  .prism-progress-large .prism-progress-track { height: 0.7rem; }
  .prism-progress-bar { height: 100%; border-radius: inherit; background: var(--prism-color-accent); transition: width 180ms ease; }
  .prism-progress-success .prism-progress-bar { background: var(--prism-color-success); }
  .prism-progress-warning .prism-progress-bar { background: var(--prism-color-warning); }
  .prism-progress-error .prism-progress-bar { background: var(--prism-color-danger); }
  .prism-progress-bar.is-indeterminate { animation: prism-progress-slide 1.2s ease-in-out infinite; }
  @keyframes prism-progress-slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
  .prism-spinner { display: inline-grid; place-items: center; vertical-align: middle; }
  .prism-spinner-small { width: 1rem; height: 1rem; }
  .prism-spinner-medium { width: 1.35rem; height: 1.35rem; }
  .prism-spinner-large { width: 2rem; height: 2rem; }
  .prism-spinner-ring { width: 70%; height: 70%; border: 2px solid color-mix(in srgb, currentColor 20%, transparent); border-top-color: currentColor; border-radius: 50%; color: var(--prism-color-accent); animation: prism-spin 700ms linear infinite; }
  .prism-spinner-success .prism-spinner-ring { color: var(--prism-color-success); }
  .prism-spinner-warning .prism-spinner-ring { color: var(--prism-color-warning); }
  .prism-spinner-error .prism-spinner-ring { color: var(--prism-color-danger); }
  @keyframes prism-spin { to { transform: rotate(360deg); } }
  .prism-skeleton {
    display: block;
    min-height: 0.9rem;
    overflow: hidden;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--prism-color-ink) 16%, var(--prism-color-surface)),
      color-mix(in srgb, var(--prism-color-ink) 6%, var(--prism-color-surface)),
      color-mix(in srgb, var(--prism-color-ink) 16%, var(--prism-color-surface))
    );
    background-size: 200% 100%;
    animation: prism-skeleton-shimmer 1.4s ease-in-out infinite;
  }
  .prism-skeleton-circle {
    flex: 0 0 auto;
    aspect-ratio: 1;
    min-width: 2.25rem;
    min-height: 2.25rem;
    border-radius: 50%;
  }
  .prism-skeleton-rect {
    min-height: 2.75rem;
    border-radius: var(--prism-radius-small);
  }
  .prism-skeleton-radius-small { border-radius: var(--prism-radius-small); }
  .prism-skeleton-radius-medium { border-radius: var(--prism-radius-medium); }
  .prism-skeleton-radius-pill { border-radius: 999px; }
  @keyframes prism-skeleton-shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }

  .prism-empty-state { display: grid; justify-items: center; gap: 0.55rem; padding: 3rem 1.5rem; color: var(--prism-color-text-muted); text-align: center; }
  .prism-empty-state h3 { margin: 0; color: var(--prism-color-text-strong); font-size: 1.05rem; }
  .prism-empty-state p { max-width: 34rem; margin: 0; line-height: 1.5; }
  .prism-empty-state-icon { display: grid; width: 3rem; height: 3rem; place-items: center; border-radius: 50%; background: var(--prism-color-surface-hover); color: var(--prism-color-accent); font-size: 1.35rem; }
  .prism-empty-state-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 0.55rem; }
  .prism-empty-state-error .prism-empty-state-icon { color: var(--prism-color-danger); }
  .prism-pagination { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
  .prism-pagination-pages { display: flex; align-items: center; gap: 0.25rem; }
  .prism-pagination-button { display: inline-grid; min-width: 2rem; height: 2rem; place-items: center; border: 1px solid transparent; border-radius: var(--prism-radius-small); background: transparent; color: var(--prism-color-text); cursor: pointer; }
  .prism-pagination-button:hover:not(:disabled),
  .prism-pagination-button.is-active { border-color: var(--prism-color-accent); background: var(--prism-color-surface-hover); color: var(--prism-color-text-strong); }
  .prism-pagination-button:disabled { opacity: 0.4; cursor: not-allowed; }
  .prism-pagination-ellipsis { min-width: 1.5rem; color: var(--prism-color-text-muted); text-align: center; }
  .prism-pagination-size { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--prism-color-text-muted); font-size: 0.8rem; }
  .prism-pagination-size select { border: 1px solid var(--prism-color-border); border-radius: var(--prism-radius-small); padding: 0.35rem; background: var(--prism-color-surface-raised); color: inherit; }

  .prism-avatar { position: relative; display: inline-grid; flex: 0 0 auto; place-items: center; overflow: visible; background: var(--prism-color-accent); color: var(--prism-color-text-inverse); font-weight: 750; }
  .prism-avatar-circle { border-radius: 50%; }
  .prism-avatar-square { border-radius: var(--prism-radius-small); }
  .prism-avatar-small { width: 1.75rem; height: 1.75rem; font-size: 0.65rem; }
  .prism-avatar-medium { width: 2.5rem; height: 2.5rem; font-size: 0.8rem; }
  .prism-avatar-large { width: 3.5rem; height: 3.5rem; font-size: 1rem; }
  .prism-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
  .prism-avatar-status { position: absolute; right: -0.05rem; bottom: -0.05rem; width: 0.72rem; height: 0.72rem; border: 2px solid var(--prism-color-surface-raised); border-radius: 50%; background: var(--prism-color-text-muted); }
  .prism-avatar-status-size-small { width: 0.58rem; height: 0.58rem; }
  .prism-avatar-status-size-medium { width: 0.72rem; height: 0.72rem; }
  .prism-avatar-status-size-large { width: 0.86rem; height: 0.86rem; }
  .prism-avatar-status-online { background: var(--prism-color-success); }
  .prism-avatar-status-away { background: var(--prism-color-warning); }
  .prism-avatar-status-offline { background: var(--prism-color-text-muted); }
  .prism-tag { display: inline-flex; align-items: center; gap: 0.25rem; max-width: 100%; border: 1px solid var(--prism-color-border); border-radius: 999px; padding: 0.25rem 0.55rem; background: var(--prism-color-surface-hover); color: var(--prism-color-text-strong); font-size: 0.75rem; font-weight: 650; }
  .prism-tag-success { border-color: color-mix(in srgb, var(--prism-color-success) 45%, var(--prism-color-border)); color: var(--prism-color-success); }
  .prism-tag-warning { border-color: color-mix(in srgb, var(--prism-color-warning) 45%, var(--prism-color-border)); color: var(--prism-color-warning); }
  .prism-tag-error { border-color: color-mix(in srgb, var(--prism-color-danger) 45%, var(--prism-color-border)); color: var(--prism-color-danger); }
  .prism-separator { display: flex; align-items: center; gap: 0.65rem; color: var(--prism-color-text-muted); }
  .prism-separator-horizontal { width: 100%; min-height: 1px; background: var(--prism-color-border); }
  .prism-separator-horizontal:has(span) { background: none; }
  .prism-separator-horizontal:has(span)::before,
  .prism-separator-horizontal:has(span)::after { content: ''; flex: 1; height: 1px; background: var(--prism-color-border); }
  .prism-separator-vertical { width: 1px; min-height: 1rem; background: var(--prism-color-border); }
  .prism-separator span { font-size: 0.72rem; }
  .prism-stack { display: flex; }
  .prism-stack-column { flex-direction: column; }
  .prism-stack-row { flex-direction: row; }
  .prism-stack-wrap { flex-wrap: wrap; }
  .prism-stack-gap-none { gap: 0; }
  .prism-stack-gap-small { gap: 0.5rem; }
  .prism-stack-gap-medium { gap: 1rem; }
  .prism-stack-gap-large { gap: 1.5rem; }
  .prism-grid { --prism-grid-gap: 1rem; display: grid; gap: var(--prism-grid-gap); }
  .prism-grid-gap-none { --prism-grid-gap: 0; }
  .prism-grid-gap-small { --prism-grid-gap: 0.5rem; }
  .prism-grid-gap-medium { --prism-grid-gap: 1rem; }
  .prism-grid-gap-large { --prism-grid-gap: 1.5rem; }

  @media (prefers-reduced-motion: reduce) {
    .prism-toast,
    .prism-progress-bar,
    .prism-spinner-ring,
    .prism-skeleton { animation: none; transition: none; }
  }

  @media (forced-colors: active) {
    .prism-background {
      border-color: CanvasText;
      color: CanvasText;
      background: Canvas;
      box-shadow: none;
    }

    .prism-background-canvas,
    .prism-background-wash {
      display: none;
    }

    .prism-button,
    .prism-select-trigger,
    .prism-select-option,
    .prism-auto-complete-input,
    .prism-auto-complete-option,
    .prism-auto-complete-menu,
    .prism-popup-close,
    .prism-table button,
    .prism-table select,
    .prism-table input,
    .text-field,
    .check-box-input {
      forced-color-adjust: auto;
    }

    .prism-button {
      border-color: ButtonText;
      color: ButtonText;
      background: ButtonFace;
      box-shadow: none;
    }

    .prism-button:hover:not(:disabled),
    .prism-button:focus-visible,
    .prism-select-option:hover:not(:disabled),
    .prism-select-option[aria-selected="true"],
    .prism-select-option[data-active="true"],
    .prism-auto-complete-option:hover:not(:disabled),
    .prism-auto-complete-option[aria-selected="true"],
    .prism-auto-complete-option[data-active="true"] {
      border-color: Highlight;
      color: HighlightText;
      background: Highlight;
    }

    .prism-button:disabled,
    .prism-select-trigger:disabled {
      color: GrayText;
    }

    .prism-select-trigger,
    .prism-select-option,
    .prism-auto-complete-input,
    .prism-auto-complete-option,
    .prism-auto-complete-menu,
    .prism-popup-close,
    .prism-table select,
    .text-field {
      border-color: ButtonText;
      color: FieldText;
      background: Field;
      box-shadow: none;
    }

    .prism-table,
    .prism-popup-panel,
    .prism-auto-complete-menu,
    .prism-code,
    .prism-code-highlight,
    .prism-code-input,
    .prism-tree-model-nocturne,
    .prism-tree-model-editorial,
    .prism-tree-model-terminal,
    .prism-tree-model-aurora {
      border-color: CanvasText;
      color: CanvasText;
      background: Canvas;
      box-shadow: none;
    }

    .prism-code-highlight,
    .prism-code-input,
    .prism-tree-summary,
    .prism-tree-link,
    .prism-tree-toggle {
      color: CanvasText;
      background: Canvas;
      border-color: CanvasText;
      box-shadow: none;
    }

    .prism-tree-summary-active,
    .prism-tree-link-active,
    .prism-table-row-selected td {
      color: HighlightText;
      background: Highlight;
      border-color: Highlight;
      --prism-table-row-background: Highlight;
    }

    :where(button, input, select, textarea, [tabindex]):focus-visible {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
  }
`)
