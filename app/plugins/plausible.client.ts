export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const domain = runtimeConfig.public.plausibleDomain?.trim()

  if (!domain || import.meta.server) {
    return
  }

  if (document.querySelector('script[data-plausible="true"]')) {
    return
  }

  const script = document.createElement('script')
  script.defer = true
  script.src = 'https://plausible.io/js/script.js'
  script.setAttribute('data-domain', domain)
  script.setAttribute('data-plausible', 'true')
  document.head.appendChild(script)
})
