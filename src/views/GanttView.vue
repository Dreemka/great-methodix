<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { GanttChart, type Task } from 'jordium-gantt-vue3'
import { ganttRuLocale } from '../locales/gantt-ru'

const { t, locale } = useI18n()
const tasks = ref<Task[]>([
  {
    id: 1,
    name: 'Discovery & Scope',
    startDate: '2025-01-06',
    endDate: '2025-01-17',
    progress: 80,
  },
  {
    id: 2,
    name: 'Design Sprint',
    startDate: '2025-01-20',
    endDate: '2025-02-07',
    progress: 45,
    predecessor: [1],
  },
  {
    id: 3,
    name: 'Implementation',
    startDate: '2025-02-10',
    endDate: '2025-03-14',
    progress: 20,
    predecessor: [2],
  },
  {
    id: 4,
    name: 'UAT & Launch',
    startDate: '2025-03-17',
    endDate: '2025-04-04',
    progress: 10,
    predecessor: [3],
  },
])

const milestones = ref<Task[]>([
  {
    id: 101,
    name: 'Kickoff',
    startDate: '2025-01-06',
    type: 'milestone',
    icon: 'rocket',
  },
  {
    id: 102,
    name: 'Go-live',
    startDate: '2025-04-05',
    type: 'milestone',
    icon: 'flag',
  },
])

const ganttLocaleMessages = {
  'zh-CN': ganttRuLocale,
}

type GanttLocale = 'zh-CN' | 'en-US'
const mapAppLocaleToGantt = (value: string): GanttLocale =>
  value === 'ru' ? 'zh-CN' : 'en-US'

const setGanttLocale = (lang: GanttLocale) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('gantt-locale', lang)
}

const ensureInitialLocale = () => {
  if (typeof window === 'undefined') return
  const stored = localStorage.getItem('gantt-locale')
  if (stored === 'zh-CN' || stored === 'en-US') {
    return
  }
  setGanttLocale(mapAppLocaleToGantt(locale.value))
}

const syncLocaleFromApp = (value: string) => {
  setGanttLocale(mapAppLocaleToGantt(value))
}

const handleGanttLanguageChange = (lang: GanttLocale) => {
  setGanttLocale(lang)
}

onMounted(() => {
  ensureInitialLocale()
})

watch(
  () => locale.value,
  (value) => {
    syncLocaleFromApp(value)
  }
)
</script>

<template>
  <a-space direction="vertical" size="large" style="width: 100%">
    <a-card :title="t('gantt.title')" bordered>
      <p>{{ t('gantt.subtitle') }}</p>
      <div class="gantt-wrapper">
        <GanttChart
          :tasks="tasks"
          :milestones="milestones"
          :locale-messages="ganttLocaleMessages"
          :on-language-change="handleGanttLanguageChange"
        />
      </div>
    </a-card>
  </a-space>
</template>

<style scoped>
.gantt-wrapper {
  height: 520px;
}
</style>

