<template>
  <div class="skill-sphere">
    <ClientOnly>
      <TresCanvas clear-color="#00000000" window-size>
        <SkillSphereScene />
      </TresCanvas>
      <template #fallback>
        <div class="skill-sphere-placeholder" />
      </template>
    </ClientOnly>
  </div>
</template>

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

@media (min-width: 768px) {
  .skill-sphere {
    height: 500px;
  }
}
</style>
