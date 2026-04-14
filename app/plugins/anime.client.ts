import { animate, set } from 'animejs'

type RevealValue =
  | number
  | {
      delay?: number
      duration?: number
      distance?: number
    }

interface RevealElement extends HTMLElement {
  __revealObserver?: IntersectionObserver
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: RevealElement, binding: { value?: RevealValue }) {
      const opts =
        typeof binding.value === 'number'
          ? { delay: binding.value, duration: 680, distance: 22 }
          : {
              delay: binding.value?.delay ?? 0,
              duration: binding.value?.duration ?? 680,
              distance: binding.value?.distance ?? 22
            }

      set(el, {
        opacity: 0,
        translateY: opts.distance
      })

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return
            }

            animate(el, {
              opacity: [0, 1],
              translateY: [opts.distance, 0],
              duration: opts.duration,
              delay: opts.delay,
              easing: 'easeOutExpo'
            })

            observer.unobserve(el)
          })
        },
        { threshold: 0.18 }
      )

      observer.observe(el)
      el.__revealObserver = observer
    },
    unmounted(el: RevealElement) {
      el.__revealObserver?.disconnect()
    }
  })
})
