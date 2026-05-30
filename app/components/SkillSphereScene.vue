<script setup lang="ts">
import * as THREE from 'three'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const props = withDefaults(defineProps<{ fullscreen?: boolean; cameraDistance?: number }>(), { fullscreen: false, cameraDistance: 6 })

const cameraZ = computed(() => Math.max(3, Math.min(16, props.cameraDistance)))

const sunRef = ref<THREE.Mesh | null>(null)
const marsGroup = ref<THREE.Group | null>(null)
const earthGroup = ref<THREE.Group | null>(null)
const jupiterGroup = ref<THREE.Group | null>(null)
const particleParent = ref<THREE.Group | null>(null)
const particlesRef = shallowRef<THREE.Points | null>(null)
const earthTexture = shallowRef<THREE.CanvasTexture | null>(null)

const emit = defineEmits<{
  'select-skill': [planet: 'mars' | 'earth' | 'jupiter']
}>()

const { onRender } = useLoop()

function generateEarthTexture(): THREE.CanvasTexture {
  function hash(px: number, py: number, pz: number): number {
    const n = Math.sin(px * 127.1 + py * 311.7 + pz * 74.7) * 43758.5453
    return n - Math.floor(n)
  }
  function lerp(a: number, b: number, t: number): number { return a + (b - a) * t }
  function smooth(t: number): number { return t * t * (3 - 2 * t) }
  function noise(x: number, y: number, z: number): number {
    const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z)
    const fx = smooth(x - ix), fy = smooth(y - iy), fz = smooth(z - iz)
    return lerp(
      lerp(lerp(hash(ix, iy, iz), hash(ix + 1, iy, iz), fx),
           lerp(hash(ix, iy + 1, iz), hash(ix + 1, iy + 1, iz), fx), fy),
      lerp(lerp(hash(ix, iy, iz + 1), hash(ix + 1, iy, iz + 1), fx),
           lerp(hash(ix, iy + 1, iz + 1), hash(ix + 1, iy + 1, iz + 1), fx), fy),
      fz
    )
  }
  function fbm(x: number, y: number, z: number): number {
    let v = 0, a = 1, f = 1, t = 0
    for (let i = 0; i < 6; i++) { v += a * noise(x * f, y * f, z * f); t += a; a *= 0.5; f *= 2 }
    return v / t
  }

  const w = 512, h = 256
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(w, h)
  const d = img.data

  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const theta = ((px + 0.5) / w) * Math.PI * 2
      const phi = ((py + 0.5) / h) * Math.PI
      const nx = Math.sin(phi) * Math.cos(theta)
      const ny = Math.sin(phi) * Math.sin(theta)
      const nz = Math.cos(phi)
      const elevation = fbm(nx * 1.5, ny * 1.5, nz * 1.5)
      const idx = (py * w + px) * 4
      const pole = Math.abs(nz)

      if (elevation > 0.48) {
        const landH = (elevation - 0.48) / 0.52
        if (pole > 0.7) {
          d[idx] = 220; d[idx + 1] = 225; d[idx + 2] = 230
        } else {
          d[idx] = Math.min(255, 60 + landH * 100)
          d[idx + 1] = Math.min(255, 110 + landH * 90)
          d[idx + 2] = Math.min(255, 30 + landH * 50)
        }
      } else {
        const depth = (0.48 - elevation) / 0.48
        d[idx] = 8
        d[idx + 1] = Math.min(255, 30 + depth * 80)
        d[idx + 2] = Math.min(255, 90 + depth * 110)
      }
      d[idx + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  return tex
}

function buildParticles(): THREE.Points {
  const count = props.fullscreen ? 200 : 600
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
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
    size: 0.05,
    color: isDark.value ? '#ffffff' : '#71717a',
    transparent: true,
    opacity: isDark.value ? 0.6 : 0.5,
    sizeAttenuation: true,
    depthWrite: false,
  })
  return new THREE.Points(geo, mat)
}

onMounted(() => {
  const pts = buildParticles()
  particlesRef.value = pts
  particleParent.value?.add(pts)
  try {
    const tex = generateEarthTexture()
    tex.needsUpdate = true
    earthTexture.value = tex
  } catch (e) {
    console.error('Earth texture generation failed:', e)
  }
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
  if (earthTexture.value) {
    earthTexture.value.dispose()
  }
})

watch(isDark, (dark) => {
  if (particlesRef.value) {
    const mat = particlesRef.value.material as THREE.PointsMaterial
    mat.color.set(dark ? '#ffffff' : '#71717a')
    mat.opacity = dark ? 0.6 : 0.5
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
  <TresPerspectiveCamera :position="fullscreen ? [0, 2, cameraZ] : [0, 4, 10]" :fov="fullscreen ? 50 : 45" />
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

  <Stars :radius="100" :depth="50" :count="2000" :size="0.15" />

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

  <Sparkles
    :count="80"
    :speed="0.4"
    :opacity="0.6"
    color="#fbbf24"
    :size="0.5"
    :scale="[2, 2, 2]"
  />

  <!-- Orbit paths -->
  <TresMesh
    v-for="(cfg, i) in [{ r: 1.8 }, { r: 2.5 }, { r: 3.8 }]"
    :key="'orbit-' + i"
    :rotation-x="Math.PI / 2"
  >
    <TresRingGeometry :args="[cfg.r - 0.015, cfg.r + 0.015, 64]" />
    <TresMeshBasicMaterial
      color="#a1a1aa"
      :transparent="true"
      :opacity="isDark ? 0.35 : 0.25"
      :side="THREE.DoubleSide"
    />
  </TresMesh>

  <!-- Mars -->
  <TresGroup ref="marsGroup">
    <TresMesh :position="[1.8, 0, 0]" @click="emit('select-skill', 'mars')">
      <TresSphereGeometry :args="[0.2, 20, 20]" />
      <TresMeshStandardMaterial :color="planetColors.mars" :roughness="0.7" :metalness="0.1" />
    </TresMesh>
  </TresGroup>

  <!-- Earth -->
  <TresGroup ref="earthGroup">
    <TresMesh :position="[2.5, 0, 0]" @click="emit('select-skill', 'earth')">
      <TresSphereGeometry :args="[0.3, 24, 24]" />
      <TresMeshStandardMaterial :map="earthTexture" color="#42a5f5" :roughness="0.4" :metalness="0.1" />
    </TresMesh>
    <!-- Earth glow -->
    <TresMesh :position="[2.5, 0, 0]">
      <TresSphereGeometry :args="[0.38, 20, 20]" />
      <TresMeshBasicMaterial
        color="#42a5f5"
        :transparent="true"
        :opacity="0.15"
      />
    </TresMesh>
  </TresGroup>

  <!-- Jupiter + ring -->
  <TresGroup ref="jupiterGroup">
    <TresMesh :position="[3.8, 0, 0]" @click="emit('select-skill', 'jupiter')">
      <TresSphereGeometry :args="[0.5, 24, 24]" />
      <TresMeshStandardMaterial :color="planetColors.jupiter" :roughness="0.8" :metalness="0.0" />
    </TresMesh>
    <TresMesh :position="[3.8, 0, 0]" :rotation-x="1.2">
      <TresTorusGeometry :args="[0.7, 0.06, 8, 32]" />
      <TresMeshStandardMaterial
        color="#c4a882"
        :transparent="true"
        :opacity="0.5"
        :roughness="0.9"
        :metalness="0.0"
      />
    </TresMesh>
  </TresGroup>

  <TresGroup ref="particleParent" />
</template>
