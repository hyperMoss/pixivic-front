import { createI18n } from 'vue-i18n'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const messages = Object.fromEntries(
  Object.entries(
    import.meta.globEager('../locales/*.json'))
    .map(([key, value]) => {
      const json = key.endsWith('.json')
      return [key.slice(14, json ? -5 : -4), value]
    }),
)


export default  createI18n({
  legacy: false,
  locale: 'zh',
  messages,
})
