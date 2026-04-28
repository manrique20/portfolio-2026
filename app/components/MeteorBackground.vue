<script setup lang="ts">
interface Meteor {
  x: number
  y: number
  speedX: number
  speedY: number
  length: number
  opacity: number
  width: number
}

// Normalized tail direction for movement angle ~17° below horizontal
const TAIL_DX = 0.958
const TAIL_DY = -0.287
const COUNT = 28

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId: number | null = null
let resizeObs: ResizeObserver | null = null

function spawnMeteor(w: number, h: number, spread = false): Meteor {
  const speed = 2.5 + Math.random() * 4.5
  return {
    x: spread ? Math.random() * (w * 1.3) : w + Math.random() * w * 0.5,
    y: Math.random() * h * 0.9,
    speedX: speed,
    speedY: speed * 0.3,
    length: 60 + Math.random() * 120,
    opacity: 0.15 + Math.random() * 0.55,
    width: 0.4 + Math.random() * 1.4
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  resizeObs = new ResizeObserver(resize)
  resizeObs.observe(canvas)

  // Spread initial meteors across the canvas so the animation starts full
  const meteors: Meteor[] = Array.from({ length: COUNT }, (_, i) =>
    spawnMeteor(canvas.width, canvas.height, i < Math.floor(COUNT * 0.7))
  )

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < meteors.length; i++) {
      const m = meteors[i]

      m.x -= m.speedX
      m.y += m.speedY

      if (m.x < -m.length * 2) {
        meteors[i] = spawnMeteor(canvas.width, canvas.height)
        continue
      }

      const tailX = m.x + m.length * TAIL_DX
      const tailY = m.y + m.length * TAIL_DY

      const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y)
      grad.addColorStop(0, 'rgba(190, 242, 100, 0)')
      grad.addColorStop(1, `rgba(190, 242, 100, ${m.opacity})`)

      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(m.x, m.y)
      ctx.strokeStyle = grad
      ctx.lineWidth = m.width
      ctx.lineCap = 'round'
      ctx.stroke()

      // Bright head
      ctx.beginPath()
      ctx.arc(m.x, m.y, m.width * 0.9, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(220, 252, 140, ${m.opacity})`
      ctx.fill()
    }

    animId = requestAnimationFrame(tick)
  }

  animId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (animId !== null) cancelAnimationFrame(animId)
  resizeObs?.disconnect()
})
</script>

<template>
  <canvas ref="canvasRef" aria-hidden="true" class="meteor-canvas" />
</template>

<style lang="scss" scoped src="~/assets/scss/components/meteor-background.scss" />
