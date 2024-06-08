import configJson from '@/authConfig.json'
import { createAuth0 } from '@auth0/auth0-vue'

export default defineNuxtPlugin((nuxt) => {
  const auth0 = createAuth0({
    domain: configJson.domain,
    clientId: configJson.clientId,
    authorizationParams: {
      audience: configJson.audience || process.env.audience,
      redirect_uri: configJson.redirectUri || process.env.redirectUri,
    },
  })
  nuxt.vueApp.use(auth0)
})
