<template>
  <div class="skill-sphere">
    <ClientOnly>
      <TresCanvas clear-color="#00000000" window-size>
        <SkillSphereScene @select-skill="onSelectSkill" />
      </TresCanvas>
      <template #fallback>
        <div class="skill-sphere-placeholder" />
      </template>
    </ClientOnly>

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
</template>

<script setup lang="ts">
const { localizedSkillGroups } = usePortfolioContent()

const planetSkillMap: Record<string, number> = {
  mars: 0,
  earth: 1,
  jupiter: 2,
}

const selectedSkill = ref<{ title: string; items: string[] } | null>(null)

function onSelectSkill(planet: 'mars' | 'earth' | 'jupiter') {
  const idx = planetSkillMap[planet]
  const group = localizedSkillGroups.value[idx]
  if (group) {
    selectedSkill.value = group
  }
}
</script>

<style scoped>
.skill-sphere {
  width: 100%;
  height: 420px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: transparent;
}

.skill-sphere-placeholder {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
}

.skill-tooltip-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
}

.skill-tooltip {
  position: relative;
  max-width: 320px;
  width: 90%;
  padding: 24px 28px 28px;
  border-radius: 16px;
  border: 1px solid rgb(63 63 70 / 0.8);
  background: rgb(24 24 27 / 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

:global(.tw-dark) .skill-tooltip {
  border-color: rgb(63 63 70 / 0.8);
  background: rgb(24 24 27 / 0.95);
}

.skill-tooltip {
  :global(.tw-dark) & {
    border-color: rgb(63 63 70 / 0.8);
    background: rgb(24 24 27 / 0.95);
  }
}

.skill-tooltip__close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background: rgb(63 63 70 / 0.5);
  color: #a1a1aa;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.skill-tooltip__close:hover {
  background: rgb(63 63 70 / 0.8);
  color: #f4f4f5;
}

.skill-tooltip__title {
  margin: 0 0 16px;
  font-size: 1.125rem;
  font-weight: 600;
  color: #f4f4f5;
}

.skill-tooltip__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tooltip__tag {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 500;
  background: rgb(39 39 42 / 0.8);
  color: #d4d4d8;
  border: 1px solid rgb(63 63 70 / 0.6);
}

.tooltip-enter-active {
  transition: opacity 0.25s ease;
}

.tooltip-leave-active {
  transition: opacity 0.15s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}

@media (min-width: 768px) {
  .skill-sphere {
    height: 500px;
  }
}
</style>
