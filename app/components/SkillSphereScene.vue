<script setup lang="ts">
import * as THREE from 'three'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const sunRef = ref<THREE.Mesh | null>(null)
const marsGroup = ref<THREE.Group | null>(null)
const earthGroup = ref<THREE.Group | null>(null)
const jupiterGroup = ref<THREE.Group | null>(null)
const particleParent = ref<THREE.Group | null>(null)
const particlesRef = shallowRef<THREE.Points | null>(null)

const { onRender } = useLoop()

function buildParticles(): THREE.Points {
  const positions = new Float32Array(600 * 3)
  for (let i = 0; i < 600; i++) {
    const r = 5 + Math.random() * 5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const mat = new THREE.PointsMaterial({
    size: 0.04,
    color: isDark.value ? '#ffffff' : '#52525b',
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true,
    depthWrite: false,
  })
  return new THREE.Points(geo, mat)
}

onMounted(() => {
  const pts = buildParticles()
  particlesRef.value = pts
  particleParent.value?.add(pts)
  if (marsGroup.value) marsGroup.value.rotation.y = 0
  if (earthGroup.value) earthGroup.value.rotation.y = 1.5
  if (jupiterGroup.value) jupiterGroup.value.rotation.y = 3
})

onBeforeUnmount(() => {
  if (particlesRef.value) {
    particleParent.value?.remove(particlesRef.value)
    particlesRef.value.geometry.dispose()
    ;(particlesRef.value.material as THREE.PointsMaterial).dispose()
  }
})

watch(isDark, (dark) => {
  if (particlesRef.value) {
    const mat = particlesRef.value.material as THREE.PointsMaterial
    mat.color.set(dark ? '#ffffff' : '#52525b')
  }
})

onRender(({ elapsed }) => {
  const t = elapsed
  if (sunRef.value) sunRef.value.rotation.y = t * 0.08
  if (marsGroup.value) marsGroup.value.rotation.y = t * 0.45
  if (earthGroup.value) earthGroup.value.rotation.y = t * 0.28
  if (jupiterGroup.value) jupiterGroup.value.rotation.y = t * 0.12
})

const planetColors = computed(() => ({
  mars: isDark.value ? '#ef5350' : '#c62828',
  earth: isDark.value ? '#42a5f5' : '#0d47a1',
  jupiter: isDark.value ? '#d4a574' : '#8d6e63',
}))
</script>

<template>
  <TresPerspectiveCamera :position="[0, 4, 10]" :fov="45" />
  <OrbitControls
    :auto-rotate="true"
    :auto-rotate-speed="0.8"
    :enable-zoom="false"
    :enable-pan="false"
    :min-polar-angle="0.8"
    :max-polar-angle="2"
    :target="[0, 0, 0]"
  />
  <TresAmbientLight :intensity="0.3" />
  <TresDirectionalLight :position="[5, 5, 5]" :intensity="0.6" />

  <!-- Sun -->
  <TresMesh ref="sunRef" :position="[0, 0, 0]">
    <TresSphereGeometry :args="[1.0, 32, 32]" />
    <TresMeshStandardMaterial
      color="#fbbf24"
      emissive="#f59e0b"
      :emissive-intensity="0.6"
    />
  </TresMesh>

  <!-- Sun glow -->
  <TresMesh :position="[0, 0, 0]">
    <TresSphereGeometry :args="[1.15, 24, 24]" />
    <TresMeshBasicMaterial
      color="#f59e0b"
      :transparent="true"
      :opacity="0.12"
    />
  </TresMesh>

  <!-- Sun light source -->
  <TresPointLight :position="[0, 0, 0]" :intensity="0.8" color="#fbbf24" />

  <!-- Orbit paths -->
  <TresMesh
    v-for="(cfg, i) in [{ r: 1.8 }, { r: 2.5 }, { r: 3.8 }]"
    :key="'orbit-' + i"
    :rotation-x="Math.PI / 2"
  >
    <TresRingGeometry :args="[cfg.r - 0.015, cfg.r + 0.015, 64]" />
    <TresMeshBasicMaterial
      color="#52525b"
      :transparent="true"
      :opacity="isDark ? 0.15 : 0.1"
      :side="THREE.DoubleSide"
    />
  </TresMesh>

  <!-- Mars -->
  <TresGroup ref="marsGroup">
    <TresMesh :position="[1.8, 0, 0]">
      <TresSphereGeometry :args="[0.2, 20, 20]" />
      <TresMeshToonMaterial :color="planetColors.mars" />
    </TresMesh>
  </TresGroup>

  <!-- Earth -->
  <TresGroup ref="earthGroup">
    <TresMesh :position="[2.5, 0, 0]">
      <TresSphereGeometry :args="[0.3, 24, 24]" />
      <TresMeshToonMaterial :color="planetColors.earth" />
    </TresMesh>
  </TresGroup>

  <!-- Jupiter + ring -->
  <TresGroup ref="jupiterGroup">
    <TresMesh :position="[3.8, 0, 0]">
      <TresSphereGeometry :args="[0.5, 24, 24]" />
      <TresMeshToonMaterial :color="planetColors.jupiter" />
    </TresMesh>
    <TresMesh :position="[3.8, 0, 0]" :rotation-x="1.2">
      <TresTorusGeometry :args="[0.7, 0.06, 8, 32]" />
      <TresMeshToonMaterial
        color="#c4a882"
        :transparent="true"
        :opacity="0.5"
      />
    </TresMesh>
  </TresGroup>

  <TresGroup ref="particleParent" />
</template>
