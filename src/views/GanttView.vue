<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { GanttChart, type Task } from 'jordium-gantt-vue3'
import { ganttRuLocale } from '../locales/gantt-ru'

const { t, locale } = useI18n()
type LocalizedTaskTemplate = Omit<Task, 'name'> & { nameKey: string }

const taskTemplates: LocalizedTaskTemplate[] = [
  {
    id: 1,
    startDate: '2025-01-06',
    endDate: '2025-01-17',
    progress: 80,
    nameKey: 'gantt.tasks.discovery',
  },
  {
    id: 2,
    startDate: '2025-01-20',
    endDate: '2025-02-07',
    progress: 45,
    predecessor: [1],
    nameKey: 'gantt.tasks.design',
  },
  {
    id: 3,
    startDate: '2025-02-10',
    endDate: '2025-03-14',
    progress: 20,
    predecessor: [2],
    nameKey: 'gantt.tasks.implementation',
  },
  {
    id: 4,
    startDate: '2025-03-17',
    endDate: '2025-04-04',
    progress: 10,
    predecessor: [3],
    nameKey: 'gantt.tasks.uat',
  },
]

const milestoneTemplates: LocalizedTaskTemplate[] = [
  {
    id: 101,
    startDate: '2025-01-06',
    type: 'milestone',
    icon: 'rocket',
    nameKey: 'gantt.milestones.kickoff',
  },
  {
    id: 102,
    startDate: '2025-04-05',
    type: 'milestone',
    icon: 'flag',
    nameKey: 'gantt.milestones.launch',
  },
]

const taskNameKeyMap = taskTemplates.reduce<Record<string, string>>((acc, template) => {
  acc[String(template.id)] = template.nameKey
  return acc
}, {})

const milestoneNameKeyMap = milestoneTemplates.reduce<Record<string, string>>((acc, template) => {
  acc[String(template.id)] = template.nameKey
  return acc
}, {})

const tasks = ref<Task[]>(
  taskTemplates.map(({ nameKey, ...rest }) => ({
    ...rest,
    name: t(nameKey),
  })) as Task[]
)

const milestones = ref<Task[]>(
  milestoneTemplates.map(({ nameKey, ...rest }) => ({
    ...rest,
    name: t(nameKey),
  })) as Task[]
)

const applyLocalizedName = (item: Task, nameMap: Record<string, string>) => {
  const nameKey = nameMap[String(item.id)]
  if (!nameKey) {
    return item
  }
  return {
    ...item,
    name: t(nameKey),
  }
}

const relocalizeData = () => {
  tasks.value = tasks.value.map((task) => applyLocalizedName(task, taskNameKeyMap))
  milestones.value = milestones.value.map((milestone) =>
    applyLocalizedName(milestone, milestoneNameKeyMap)
  )
}

const replaceById = (collection: Task[], incoming: Task) => {
  const index = collection.findIndex(({ id }) => id === incoming.id)
  if (index === -1) {
    return [...collection, incoming]
  }
  const clone = collection.slice()
  clone[index] = incoming
  return clone
}

const persistTask = (task: Task) => {
  const localizedTask = applyLocalizedName(task, taskNameKeyMap)
  tasks.value = replaceById(tasks.value, localizedTask)
}

const handleTaskUpdated = ({ task }: { task: Task }) => {
  persistTask(task)
}

const handleTaskDeleted = ({ task }: { task: Task }) => {
  tasks.value = tasks.value.filter(({ id }) => id !== task.id)
}

const persistMilestone = (milestone: Task) => {
  const localizedMilestone = applyLocalizedName(milestone, milestoneNameKeyMap)
  milestones.value = replaceById(milestones.value, localizedMilestone)
}

const handleMilestoneDeleted = ({ milestoneId }: { milestoneId: number }) => {
  milestones.value = milestones.value.filter(({ id }) => id !== milestoneId)
}

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

let languageMenuObserver: MutationObserver | null = null

const updateLanguageOptionLabels = () => {
  if (typeof window === 'undefined') return
  document.querySelectorAll('.language-option span').forEach((node) => {
    const content = node.textContent?.trim()
    if (content === '中文') {
      node.textContent = 'Русский'
    }
  })
}

const observeLanguageDropdown = () => {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') {
    return
  }
  updateLanguageOptionLabels()
  languageMenuObserver = new MutationObserver(() => updateLanguageOptionLabels())
  languageMenuObserver.observe(document.body, { childList: true, subtree: true })
}

const disconnectLanguageObserver = () => {
  languageMenuObserver?.disconnect()
  languageMenuObserver = null
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
  observeLanguageDropdown()
})

watch(
  () => locale.value,
  (value) => {
    syncLocaleFromApp(value)
    relocalizeData()
  }
)

onBeforeUnmount(() => {
  disconnectLanguageObserver()
})
</script>

<template>
  <a-space direction="vertical" size="large" style="width: 100%">
    <div class="gantt-wrapper">
      <GanttChart
        :tasks="tasks"
        :milestones="milestones"
        :locale-messages="ganttLocaleMessages"
        :on-language-change="handleGanttLanguageChange"
        @task-added="handleTaskUpdated"
        @task-updated="handleTaskUpdated"
        @taskbar-drag-end="persistTask"
        @taskbar-resize-end="persistTask"
        @task-deleted="handleTaskDeleted"
        @milestone-saved="persistMilestone"
        @milestone-drag-end="persistMilestone"
        @milestone-deleted="handleMilestoneDeleted"
      />
    </div>
  </a-space>
</template>

<style scoped>
.gantt-wrapper {
  height: 520px;
  border: 1px solid #f0f0f0;
  box-shadow: none !important;
  border-radius: 8px;
  overflow: hidden;
}
</style>

