// SVG icon set: bundles only the @mdi/js paths actually used, instead of the
// full ~400 kB `@mdi/font` webfont + stylesheet.
import { defineComponent, h } from 'vue'
import { aliases as mdiSvgAliases, mdi as mdiSvg } from 'vuetify/iconsets/mdi-svg'
import {
  mdiAlertOutline,
  mdiArrowRight,
  mdiArrowUp,
  mdiBriefcaseOutline,
  mdiCheckCircleOutline,
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiCloseCircleOutline,
  mdiDatabase,
  mdiEmailOutline,
  mdiGit,
  mdiGithub,
  mdiImageOffOutline,
  mdiInformationOutline,
  mdiLanguageCss3,
  mdiLanguageHtml5,
  mdiLanguageJavascript,
  mdiLanguageLua,
  mdiLanguagePhp,
  mdiLanguageTypescript,
  mdiLayersOutline,
  mdiLinkedin,
  mdiLinkVariant,
  mdiMagnifyPlus,
  mdiMapMarkerOutline,
  mdiNodejs,
  mdiOpenInNew,
  mdiTwitter,
  mdiVuejs,
  mdiVuetify,
} from '@mdi/js'

const iconPaths = {
  'mdi-alert-outline': mdiAlertOutline,
  'mdi-arrow-right': mdiArrowRight,
  'mdi-arrow-up': mdiArrowUp,
  'mdi-briefcase-outline': mdiBriefcaseOutline,
  'mdi-check-circle-outline': mdiCheckCircleOutline,
  'mdi-chevron-left': mdiChevronLeft,
  'mdi-chevron-right': mdiChevronRight,
  'mdi-close': mdiClose,
  'mdi-close-circle-outline': mdiCloseCircleOutline,
  'mdi-database': mdiDatabase,
  'mdi-email-outline': mdiEmailOutline,
  'mdi-git': mdiGit,
  'mdi-github': mdiGithub,
  'mdi-image-off-outline': mdiImageOffOutline,
  'mdi-information-outline': mdiInformationOutline,
  'mdi-language-css3': mdiLanguageCss3,
  'mdi-language-html5': mdiLanguageHtml5,
  'mdi-language-javascript': mdiLanguageJavascript,
  'mdi-language-lua': mdiLanguageLua,
  'mdi-language-php': mdiLanguagePhp,
  'mdi-language-typescript': mdiLanguageTypescript,
  'mdi-layers-outline': mdiLayersOutline,
  'mdi-linkedin': mdiLinkedin,
  'mdi-link-variant': mdiLinkVariant,
  'mdi-magnify-plus': mdiMagnifyPlus,
  'mdi-map-marker-outline': mdiMapMarkerOutline,
  'mdi-nodejs': mdiNodejs,
  'mdi-open-in-new': mdiOpenInNew,
  'mdi-twitter': mdiTwitter,
  'mdi-vuejs': mdiVuejs,
  'mdi-vuetify': mdiVuetify,
}

// Neutral fallback (mdi-circle-outline) so unknown names stay invisible-friendly.
const fallbackPath =
  'M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z'

export function resolveIconPath(icon) {
  if (typeof icon !== 'string') return icon

  const name = icon.trim()

  // Vuetify resolves `$alias` values (e.g. `$close`) to mdi-svg strings like "svg:M...".
  if (name.startsWith('svg:')) return name.slice(4)

  const path = iconPaths[name]
  if (path) return path

  if (import.meta.env.DEV) console.warn(`[icons] Unknown MDI icon "${name}"`)
  return fallbackPath
}

export const NamedSvgIcon = defineComponent({
  name: 'VNamedSvgIcon',
  inheritAttrs: false,
  props: {
    icon: { type: [String, Object, Array, Function], default: undefined },
    tag: { type: [String, Object, Function], required: true },
  },
  setup(props, { attrs }) {
    return () =>
      h(mdiSvg.component, {
        ...attrs,
        tag: props.tag,
        icon: resolveIconPath(props.icon),
      })
  },
})

export const mdiAliases = mdiSvgAliases
