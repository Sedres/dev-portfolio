<!-- AppNotification.vue -->
<template>
  <v-snackbar
    v-model="isOpen"
    :location="location"
    :timeout="-1"
    class="app-notification"
    color="rgba(20, 20, 20, 0.9)"
    rounded="lg"
  >
    <v-card class="d-flex flex-row align-center" variant="text" elevation="0">
      <div class="left-side" v-if="showIcon">
        <v-progress-circular
          class="notification-ring"
          :model-value="progressValue"
          :rotate="-90"
          :color="computedColor"
          :size="40"
          :width="3"
        >
          <v-icon color="white">{{ icon }}</v-icon>
        </v-progress-circular>
      </div>

      <div class="right-side">
        <v-card-title theme="dark" class="notification-title pa-0">
          {{ title }}
        </v-card-title>

        <v-card-text theme="dark" class="notification-message pa-0">
          {{ message }}
        </v-card-text>
      </div>
    </v-card>
  </v-snackbar>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },

  title: { type: String, default: '' },
  message: { type: String, required: true },

  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'error'].includes(value),
  },

  icon: { type: String, default: 'mdi-information-outline' },

  // ms
  timeout: { type: Number, default: 3000 },
  location: { type: String, default: 'bottom right' },

  showIcon: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', 'timeout'])

const isOpen = computed({
  get() {
    return props.modelValue
  },
  set(nextOpenState) {
    emit('update:modelValue', nextOpenState)
  },
})

const computedColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'green'
    case 'warning':
      return 'orange'
    case 'error':
      return 'red'
    default:
      return 'teal'
  }
})

const timeoutMs = computed(() => {
  const numericTimeout = Number(props.timeout)
  if (!Number.isFinite(numericTimeout) || numericTimeout <= 0) return 0
  return Math.round(numericTimeout)
})

const progressValue = ref(100) // 100 -> 0

let progressIntervalId = null
let closeTimeoutId = null
let progressStartTimeMs = 0

function stopProgressTimers() {
  if (progressIntervalId) {
    clearInterval(progressIntervalId)
    progressIntervalId = null
  }
  if (closeTimeoutId) {
    clearTimeout(closeTimeoutId)
    closeTimeoutId = null
  }
}

function closeNotification(reason) {
  stopProgressTimers()

  if (reason === 'timeout') emit('timeout')

  isOpen.value = false
}

async function closeNotificationAfterRender() {
  // Forzamos 0 visualmente antes de cerrar
  progressValue.value = 0

  // Espera a que Vue pinte el cambio
  await nextTick()

  // Espera 1 frame (muy importante en CEF)
  setTimeout(() => {
    closeNotification('timeout')
  }, 16)
}

function startProgressTimers() {
  stopProgressTimers()
  progressValue.value = 100

  const durationMs = timeoutMs.value
  if (durationMs <= 0) return

  // usa performance.now para mejor precisión (Date.now a veces deriva)
  progressStartTimeMs = performance.now()

  // ✅ hard close garantizado (pero dejando renderizar el 0)
  closeTimeoutId = setTimeout(() => {
    if (!isOpen.value) return
    void closeNotificationAfterRender()
  }, durationMs)

  // ✅ progreso estable
  progressIntervalId = setInterval(() => {
    if (!isOpen.value) {
      stopProgressTimers()
      return
    }

    const elapsedMs = performance.now() - progressStartTimeMs
    const ratio = Math.min(Math.max(elapsedMs / durationMs, 0), 1)

    progressValue.value = Math.max(0, 100 - ratio * 100)

    // Por si el setTimeout se retrasara
    if (ratio >= 1) {
      void closeNotificationAfterRender()
    }
  }, 20)
}

watch(
  () => [isOpen.value, timeoutMs.value, props.type],
  ([open]) => {
    if (open) startProgressTimers()
    else stopProgressTimers()
  },
)

onBeforeUnmount(() => {
  stopProgressTimers()
})
</script>

<style scoped>
.left-side {
  margin-right: 14px;
}

.right-side {
  display: flex;
  flex-direction: column;

  gap: 2px;
}

.notification-title {
  color: white;
  font-weight: 700;
  font-size: 20px;
}

.notification-message {
  color: white;
  font-size: 15px;
  line-height: 1.2;
  opacity: 0.85;
}

/* Track más suave */
.notification-ring :deep(.v-progress-circular__underlay) {
  stroke: rgba(255, 255, 255, 0.12);
}

/* ✅ Clave: quitar transición del overlay para que el % sea “real” al instante */
.notification-ring :deep(.v-progress-circular__overlay) {
  transition: none !important;
}
</style>
