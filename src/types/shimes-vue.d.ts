declare module 'vue-i18n'

export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string) => string
  }
}