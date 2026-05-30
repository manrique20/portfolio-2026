import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

export function useBloom(options?: { strength?: number; radius?: number; threshold?: number }) {
  const strength = options?.strength ?? 0.3
  const radius = options?.radius ?? 0.2
  const threshold = options?.threshold ?? 0.1

  const ctx = useTresContext()
  const { scene } = useTres()

  let composer: EffectComposer | null = null
  let bloomPass: UnrealBloomPass | null = null

  function tryInit() {
    if (composer) return true

    const gl = ctx.renderer.instance
    const cam = ctx.camera
    const s = scene.value

    if (!gl || !cam || !s) return false

    const cameraObj = (cam as any).activeCamera?.value ?? (cam as any).camera?.value ?? null
    if (!cameraObj) return false

    const sizes = ctx.sizes
    composer = new EffectComposer(gl)

    const renderPass = new RenderPass(s, cameraObj)
    composer.addPass(renderPass)

    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(sizes.width.value, sizes.height.value),
      strength,
      radius,
      threshold
    )
    composer.addPass(bloomPass)
    composer.addPass(new OutputPass())

    ctx.renderer.replaceRenderFunction(() => {
      composer?.render()
    })

    watch([sizes.width, sizes.height], ([w, h]) => {
      composer?.setSize(w, h)
      if (bloomPass) {
        bloomPass.resolution.set(w, h)
      }
    })

    return true
  }

  onMounted(() => {
    if (!tryInit()) {
      const stop = watchEffect(() => {
        if (tryInit()) {
          stop()
        }
      })
    }
  })

  onBeforeUnmount(() => {
    if (composer) {
      ctx.renderer.replaceRenderFunction(() => {})
      composer.dispose()
      composer = null
      bloomPass = null
    }
  })
}
