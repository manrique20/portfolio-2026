<script setup lang="ts">
import type { PortfolioProject } from '~~/data/projects'

const { localizedProfile, localizedProjects, localizedExperience, localizedSkillGroups } = usePortfolioContent()
const { localizedBlogPosts } = useBlogContent()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const router = useRouter()

const isOpen = ref(false)
const input = ref('')
const history = ref<string[]>([])
const historyIdx = ref(-1)
const lines = ref<{ html: string; type: 'output' | 'error' }[]>([])
const outputEl = ref<HTMLDivElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const initDone = ref(false)

const JOKES = [
  'Why do developers hate nature? It has too many bugs.',
  'Why did the developer go broke? Because he used up all his cache.',
  'How do you comfort a JavaScript bug? You console it.',
  'What did the router say to the doctor? "I need a static IP address."',
  'Why was the developer sad at the party? He kept getting undefined.',
  'What is a developer\'s favorite hangout? The Foo Bar.',
  'Why do Java developers wear glasses? Because they can\'t C#.',
  'There are only 10 types of people in the world: those who understand binary and those who don\'t.',
]

const BANNER = `<span class="accent">╔════════════════════════════════════════════════════════╗
║     ____  _   _ __  __  ___    _ __   ___ _ __ ___     ║
║    / ___|| | | |  \\/  |/ __|  | '_ \\ / _ \\ \`__/ __|    ║
║    \\___ \\| |_| | |\\/| |\\__ \\  | | | |  __/ |  \\__ \\    ║
║    |____/ \\__,_|_|  |_||___/  |_| |_|\\___|_|  |___/    ║
║                                                        ║
║    Frontend-focused Full-Stack Engineer                ║
║    Type '<span class="cmd">help</span>' to see available commands               ║
╚════════════════════════════════════════════════════════╝</span>`

function add(text: string, type: 'output' | 'error' = 'output') {
  lines.value.push({ html: text, type })
}

function scrollBottom() {
  nextTick(() => {
    if (outputEl.value) {
      outputEl.value.scrollTop = outputEl.value.scrollHeight
    }
  })
}

function focusInput() {
  nextTick(() => inputEl.value?.focus())
}

function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    if (!initDone.value) {
      initDone.value = true
      lines.value = []
      add(BANNER)
    }
    scrollBottom()
    focusInput()
  }
}

function close() {
  isOpen.value = false
}

function handleInput() {
  const cmd = input.value
  if (!cmd.trim()) return
  history.value.push(cmd.trim())
  historyIdx.value = -1
  input.value = ''
  exec(cmd.trim())
  scrollBottom()
}

function historyNav(dir: -1 | 1) {
  if (history.value.length === 0) return
  const newIdx = historyIdx.value + dir
  if (newIdx < -1 || newIdx >= history.value.length) return
  historyIdx.value = newIdx
  input.value = historyIdx.value === -1 ? '' : history.value[historyIdx.value]
}

function exec(raw: string) {
  const parts = raw.split(/\s+/)
  const cmd = parts[0]?.toLowerCase() ?? ''
  const args = parts.slice(1)

  const profile = localizedProfile.value
  const projects = localizedProjects.value
  const experience = localizedExperience.value
  const skillGroups = localizedSkillGroups.value
  const blogPosts = localizedBlogPosts.value

  switch (cmd) {
    case 'help':
      add(`<span class="accent">Available commands:</span>
  <span class="cmd">help</span>       Show this help
  <span class="cmd">whoami</span>     Display profile info
  <span class="cmd">banner</span>     Show the banner
  <span class="cmd">ls</span>         List available sections
  <span class="cmd">projects</span>   List all projects
  <span class="cmd">cat</span>        Show project details: <span class="cmd">cat</span> &lt;slug&gt;
  <span class="cmd">skills</span>     List skill groups
  <span class="cmd">experience</span>  Work experience
  <span class="cmd">blog</span>        List blog posts
  <span class="cmd">contact</span>    Contact information
  <span class="cmd">neofetch</span>   System-style portfolio stats
  <span class="cmd">echo</span>       Repeat text: <span class="cmd">echo</span> &lt;text&gt;
  <span class="cmd">date</span>       Current date and time
  <span class="cmd">joke</span>       Random dev joke
  <span class="cmd">clear</span>      Clear terminal
  <span class="cmd">exit</span>       Close terminal
  <span class="cmd">cd</span>         Navigate to a page: <span class="cmd">cd</span> &lt;page&gt;
`)
      break

    case 'whoami':
      add(`<span class="accent">${profile.name}</span>
  ${profile.title}
  ${profile.location}
  ${profile.summary}`)
      break

    case 'banner':
      add(BANNER)
      break

    case 'ls':
      add(`<span class="accent">./</span>
  projects/     (${projects.length} items)
  skills/       (${skillGroups.length} groups)
  experience/   (${experience.length} entries)
  blog/         (${blogPosts.length} posts)
  contact/
  README        Type <span class="cmd">cat README</span>`)
      break

    case 'projects':
      if (projects.length === 0) {
        add('No projects found.', 'error')
      } else {
        add(`<span class="accent">Projects (${projects.length}):</span>`)
        for (const p of projects) {
          add(`  <span class="cmd">${p.name}</span> — ${p.tagline}  [<span class="cmd">cat ${p.slug}</span>]`)
        }
      }
      break

    case 'cat': {
      if (args.length === 0) {
        add('Usage: <span class="cmd">cat</span> &lt;slug&gt;  (e.g. <span class="cmd">cat true-blue</span>)', 'error')
        break
      }
      const slug = args[0].toLowerCase()
      if (slug === 'readme') {
        add(`<span class="accent">README</span>
  Personal portfolio of <span class="accent">Juan Sebastian Manrique Garcia</span>
  Frontend-focused Full-Stack Engineer
  Built with Nuxt 4 + Vue 3 or React + Next.js + TypeScript + Tailwind CSS`)
        break
      }
      const proj = projects.find((p: PortfolioProject) => p.slug === slug)
      if (!proj) {
        add(`Project "<span class="error">${slug}</span>" not found. Try <span class="cmd">projects</span> to list.`, 'error')
        break
      }
      add(`<span class="accent">${proj.name}</span>
  <span class="dim">${proj.role}</span>
  ${proj.tagline}

  <span class="accent">Stack:</span> ${proj.stack.join(', ')}

  <span class="accent">Summary:</span> ${proj.summary}

  <span class="accent">Challenge:</span> ${proj.challenge}

  <span class="accent">Approach:</span> ${proj.approach}

  <span class="accent">Outcome:</span> ${proj.outcome}

  <span class="accent">Impact:</span> ${proj.impact}`)
      if (proj.links.live) {
        add(`  <span class="dim">Live: ${proj.links.live}</span>`)
      }
      break
    }

    case 'skills':
      if (skillGroups.length === 0) {
        add('No skills available.', 'error')
      } else {
        add('<span class="accent">Skill Groups:</span>')
        for (const g of skillGroups) {
          add(`  <span class="accent">${g.title}:</span> ${g.items.join(', ')}`)
        }
      }
      break

    case 'experience':
    case 'jobs':
      if (experience.length === 0) {
        add('No experience entries.', 'error')
      } else {
        for (const e of experience) {
          add(`<span class="accent">${e.company}</span>  <span class="dim">${e.period}</span>
  ${e.role}`)
          for (const h of e.highlights) {
            add(`  • ${h}`)
          }
          add('')
        }
        lines.value.pop()
      }
      break

    case 'blog':
      if (blogPosts.length === 0) {
        add('No blog posts.', 'error')
      } else {
        add(`<span class="accent">Blog Posts (${blogPosts.length}):</span>`)
        for (const p of blogPosts) {
          add(`  <span class="cmd">${p.title}</span>  <span class="dim">${p.date} · ${p.readTime}</span>
    ${p.excerpt}`)
        }
      }
      break

    case 'contact':
      add(`<span class="accent">Contact</span>
  Email:    ${profile.contact.email}
  Phone:    ${profile.contact.phone}
  GitHub:   ${profile.social.github}
  LinkedIn: ${profile.social.linkedin}`)
      break

    case 'neofetch':
      add(`<span class="accent">           .-.
    .-.\`\`..-/\`.         ${profile.name}
  .\` .\`\`\`  \`.\`  :       --------------------
  /  .\`  \` \` \` \`  \\      OS: Portfolio v4
  | :   \`  \`  :  :      Kernel: Nuxt 4 + Vue 3 or React + Next.js
  \\ :  \`  \`  \`  : /      Uptime: 2 years of shipping
  \\ \`-._\`\`\`_.-\` /       Shell: /bin/jsmg
   \`\`\`\`\`\`\`\`\`\`\`\`\`         Projects: ${projects.length}
                          Experience: ${experience.length} positions
                          Skills: ${skillGroups.reduce((a: number, g: any) => a + g.items.length, 0)} technologies
                          Blog: ${blogPosts.length} posts
                          Theme: dark/light
                          Location: ${profile.location}`)
      break

    case 'echo':
      add(args.join(' '))
      break

    case 'date':
      add(new Date().toLocaleString(locale.value === 'es' ? 'es-CO' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }))
      break

    case 'joke':
      add(JOKES[Math.floor(Math.random() * JOKES.length)])
      break

    case 'clear':
      lines.value = []
      break

    case 'exit':
      close()
      break

    case 'cd': {
      if (args.length === 0) {
        add('Usage: <span class="cmd">cd</span> &lt;page&gt;  (e.g. <span class="cmd">cd projects</span>)', 'error')
        break
      }
      const page = args[0].toLowerCase()
      const routes: Record<string, string> = {
        home: '/',
        projects: '/projects',
        blog: '/blog',
        experience: '/experience',
        contact: '/contact',
        about: '/experience',
        skills: '/experience',
        '': '/',
      }
      const target = routes[page]
      if (target) {
        router.push(localePath(target))
        close()
      } else {
        add(`cd: no such file or directory: <span class="error">${page}</span>`, 'error')
      }
      break
    }

    default:
      add(`<span class="error">Command not found:</span> ${cmd}. Type <span class="cmd">help</span> for available commands.`, 'error')
      break
  }
}

function onKey(e: KeyboardEvent) {
  if (e.code === 'Backquote' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    toggle()
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="terminal">
      <div v-if="isOpen" class="terminal-overlay" @click.self="close" @keydown.escape="close">
        <div class="terminal-window">
          <div class="terminal-header">
            <span class="terminal-dot red" />
            <span class="terminal-dot yellow" />
            <span class="terminal-dot green" />
            <span class="terminal-title">terminal — jsmg/portfolio</span>
            <button class="terminal-close" @click="close" aria-label="Close terminal">✕</button>
          </div>
          <div ref="outputEl" class="terminal-body">
            <div
              v-for="(line, i) in lines"
              :key="i"
              class="terminal-line"
              :class="{ 'line-error': line.type === 'error' }"
              v-html="line.html"
            />
          </div>
          <div class="terminal-input-line">
            <span class="terminal-prompt">$</span>
            <input
              ref="inputEl"
              v-model="input"
              class="terminal-input"
              autocomplete="off"
              spellcheck="false"
              @keydown.enter.prevent="handleInput"
              @keydown.up.prevent="historyNav(-1)"
              @keydown.down.prevent="historyNav(1)"
              @keydown.escape="close"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <button
    v-if="!isOpen"
    class="terminal-float-btn"
    :aria-label="t('nav.home')"
    @click="toggle"
  >
    <svg class="tw-h-5 tw-w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </button>
</template>

<style scoped>
.terminal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  padding: 1rem;
}

.terminal-window {
  width: 100%;
  max-width: 800px;
  max-height: min(80vh, 700px);
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: #0d0d0d;
  border: 1px solid #27272a;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #1a1a1a;
  border-bottom: 1px solid #27272a;
  user-select: none;
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dot.red { background: #ff5f56; }
.terminal-dot.yellow { background: #ffbd2e; }
.terminal-dot.green { background: #27c93f; }

.terminal-title {
  flex: 1;
  text-align: center;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 13px;
  color: #a1a1aa;
}

.terminal-close {
  background: none;
  border: none;
  color: #52525b;
  cursor: pointer;
  font-size: 14px;
  padding: 2px;
  line-height: 1;
  transition: color 0.15s;
}

.terminal-close:hover {
  color: #f4f4f5;
}

.terminal-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
  scroll-behavior: smooth;
}

.terminal-body::-webkit-scrollbar {
  width: 6px;
}

.terminal-body::-webkit-scrollbar-track {
  background: transparent;
}

.terminal-body::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 3px;
}

.terminal-line {
  white-space: pre-wrap;
  word-break: break-word;
  min-height: 1.25em;
}

.terminal-line :deep(.accent) {
  color: #bef264;
  font-weight: 600;
}

.terminal-line :deep(.cmd) {
  color: #bef264;
  font-weight: 500;
}

.terminal-line :deep(.dim) {
  color: #71717a;
}

.terminal-line :deep(.error) {
  color: #f87171;
}

.terminal-line.line-error :deep(*),
.terminal-line :deep(.error) {
  color: #f87171;
}

.terminal-input-line {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-top: 1px solid #27272a;
  background: #0d0d0d;
}

.terminal-prompt {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 13px;
  color: #bef264;
  font-weight: 600;
  user-select: none;
  flex-shrink: 0;
}

.terminal-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 13px;
  color: #f4f4f5;
  caret-color: #bef264;
}

.terminal-input::placeholder {
  color: #52525b;
}

.terminal-float-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: 1px solid #27272a;
  background: #18181b;
  color: #bef264;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
}

.terminal-float-btn:hover {
  background: #27272a;
  transform: scale(1.05);
}

.terminal-enter-active,
.terminal-leave-active {
  transition: opacity 0.2s ease;
}

.terminal-enter-from,
.terminal-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .terminal-overlay {
    padding: 0;
    align-items: flex-end;
  }

  .terminal-window {
    max-width: none;
    max-height: 85vh;
    border-radius: 12px 12px 0 0;
  }

  .terminal-float-btn {
    bottom: 16px;
    right: 16px;
    width: 44px;
    height: 44px;
  }
}
</style>
