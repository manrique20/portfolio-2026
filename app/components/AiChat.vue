<script setup lang="ts">
interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

const { t } = useI18n();

const messages = ref<Message[]>([]);
const inputText = ref("");
const loading = ref(false);
const errorMsg = ref("");
const messagesEl = ref<HTMLElement | null>(null);
const inputEl = ref<HTMLInputElement | null>(null);
let counter = 0;

const parseMarkdown = (text: string): string => {
  return (
    text
      // Headings
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      // Bold
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Line breaks (preserve)
      .replace(/\n/g, "<br>")
  );
};

const suggestions = computed(() => [
  t("ai.suggestion1"),
  t("ai.suggestion2"),
  t("ai.suggestion3"),
]);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesEl.value) {
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
    }
  });
};

const typewrite = (id: number, fullText: string) => {
  let i = 0;
  const interval = setInterval(() => {
    const msg = messages.value.find((m) => m.id === id);
    if (!msg || i >= fullText.length) {
      clearInterval(interval);
      return;
    }
    msg.text = fullText.slice(0, ++i);
    scrollToBottom();
  }, 14);
};

const ask = async (question: string) => {
  const q = question.trim();
  if (!q || loading.value) return;

  inputText.value = "";
  errorMsg.value = "";
  loading.value = true;

  messages.value.push({ id: ++counter, role: "user", text: q });
  scrollToBottom();

  try {
    const { answer } = await $fetch<{ answer: string }>("/api/ask", {
      method: "POST",
      body: { question: q },
    });
    const id = ++counter;
    messages.value.push({ id, role: "ai", text: "" });
    typewrite(id, answer);
  } catch (err: unknown) {
    const statusMessage = (err as { statusMessage?: string })?.statusMessage;
    if (statusMessage === "rate_limit") {
      errorMsg.value = t("ai.errorRateLimit");
    } else {
      errorMsg.value = t("ai.error");
    }
  } finally {
    loading.value = false;
    nextTick(() => inputEl.value?.focus());
  }
};

const handleSubmit = () => ask(inputText.value);
</script>

<template>
  <div class="ai-chat">
    <div class="ai-chat__header">
      <div class="ai-chat__badge">AI</div>
      <div>
        <h3 class="ai-chat__title">{{ t("ai.title") }}</h3>
        <p class="ai-chat__subtitle">{{ t("ai.subtitle") }}</p>
      </div>
    </div>

    <div v-if="messages.length === 0 && !loading" class="ai-chat__suggestions">
      <button
        v-for="s in suggestions"
        :key="s"
        class="suggestion-chip"
        @click="ask(s)"
      >
        {{ s }}
      </button>
    </div>

    <div v-else ref="messagesEl" class="ai-chat__messages">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="['message', `message--${msg.role}`]"
      >
        <div
          class="message__bubble"
          :class="{ 'message__bubble--markdown': msg.role === 'ai' }"
          v-html="msg.role === 'ai' ? parseMarkdown(msg.text) : msg.text"
        />
      </div>
      <div v-if="loading" class="ai-chat__typing"><span /><span /><span /></div>
    </div>

    <p v-if="errorMsg" class="ai-chat__error">{{ errorMsg }}</p>

    <form class="ai-chat__form" @submit.prevent="handleSubmit">
      <input
        ref="inputEl"
        v-model="inputText"
        type="text"
        :placeholder="t('ai.placeholder')"
        :disabled="loading"
        class="ai-chat__input"
        @keydown.enter.prevent="handleSubmit"
      />
      <button
        type="submit"
        :disabled="loading || !inputText.trim()"
        class="ai-chat__send"
      >
        {{ t("ai.send") }}
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped src="~/assets/scss/components/ai-chat.scss" />
