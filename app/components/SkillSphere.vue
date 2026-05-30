<template>
  <div class="skill-sphere">
    <ClientOnly v-if="!isMobile">
      <TresCanvas clear-color="#00000000" window-size>
        <SkillSphereScene @select-skill="onSelectSkill" />
      </TresCanvas>
      <template #fallback>
        <div class="skill-sphere-placeholder" />
      </template>
    </ClientOnly>

    <div v-else class="skill-pills">
      <div
        v-for="group in localizedSkillGroups"
        :key="group.title"
        class="skill-pills__group"
      >
        <h4 class="skill-pills__title">{{ group.title }}</h4>
        <div class="skill-pills__tags">
          <span
            v-for="item in group.items"
            :key="item"
            class="skill-pill"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <button class="skill-sphere__fullscreen-btn" @click="showFullscreen = true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
        {{ t('home.techExplore3d') }}
      </button>
    </div>

    <Teleport to="body">
      <Transition name="fullscreen">
        <div
          v-if="showFullscreen && isMobile"
          class="skill-sphere__fullscreen"
        >
          <button class="skill-sphere__fullscreen-close" @click="showFullscreen = false">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div class="skill-sphere__zoom-controls">
            <button class="skill-sphere__zoom-btn" @click="zoomIn" aria-label="Zoom in">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button class="skill-sphere__zoom-btn" @click="zoomOut" aria-label="Zoom out">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M5 12h14" />
              </svg>
            </button>
          </div>
          <TresCanvas clear-color="#000000" window-size>
            <SkillSphereScene fullscreen :camera-distance="cameraDistance" @select-skill="onSelectSkill" />
          </TresCanvas>

          <Transition name="tooltip">
            <div
              v-if="selectedSkill"
              class="skill-tooltip-overlay"
              @click.self="selectedSkill = null"
            >
              <div class="skill-tooltip">
                <button class="skill-tooltip__close" @click="selectedSkill = null">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </button>
                <h3 class="skill-tooltip__title">{{ selectedSkill.title }}</h3>
                <div class="skill-tooltip__tags">
                  <span
                    v-for="item in selectedSkill.items"
                    :key="item"
                    class="skill-tooltip__tag"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <Transition name="tooltip">
      <div
        v-if="selectedSkill && !isMobile"
        class="skill-tooltip-overlay"
        @click.self="selectedSkill = null"
      >
        <div class="skill-tooltip">
          <button class="skill-tooltip__close" @click="selectedSkill = null">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
          <h3 class="skill-tooltip__title">{{ selectedSkill.title }}</h3>
          <div class="skill-tooltip__tags">
            <span
              v-for="item in selectedSkill.items"
              :key="item"
              class="skill-tooltip__tag"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { localizedSkillGroups } = usePortfolioContent()

const planetSkillMap: Record<string, number> = {
  mars: 0,
  earth: 1,
  jupiter: 2,
}

const selectedSkill = ref<{ title: string; items: string[] } | null>(null)
const showFullscreen = ref(false)
const isMobile = ref(false)
const cameraDistance = ref(6)

const ZOOM_MIN = 3
const ZOOM_MAX = 16
const ZOOM_STEP = 1.5

function zoomIn() {
  cameraDistance.value = Math.max(ZOOM_MIN, cameraDistance.value - ZOOM_STEP)
}

function zoomOut() {
  cameraDistance.value = Math.min(ZOOM_MAX, cameraDistance.value + ZOOM_STEP)
}

let mql: MediaQueryList | null = null

function onMqlChange(e: MediaQueryListEvent) {
  isMobile.value = e.matches
}

onMounted(() => {
  mql = window.matchMedia('(max-width: 767px)')
  isMobile.value = mql.matches
  mql.addEventListener('change', onMqlChange)
})

onBeforeUnmount(() => {
  mql?.removeEventListener('change', onMqlChange)
})

watch(showFullscreen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

function onSelectSkill(planet: 'mars' | 'earth' | 'jupiter') {
  const idx = planetSkillMap[planet]
  const group = localizedSkillGroups.value[idx]
  if (group) {
    selectedSkill.value = group
  }
}
</script>

<style lang="scss" scoped src="~/assets/scss/components/SkillSphere.scss" />
