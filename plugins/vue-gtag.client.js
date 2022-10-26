
import VueGtag from 'vue-gtag'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    config: {
      id: 'G-HBPQX5BC8G',
    },
  }, nuxtApp.$router)
})