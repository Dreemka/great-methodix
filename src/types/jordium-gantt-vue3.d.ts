declare module 'jordium-gantt-vue3' {
  import type { DefineComponent } from 'vue'

  export interface Task {
    id: number | string
    name: string
    startDate?: string
    endDate?: string
    progress?: number
    predecessor?: Array<number | string>
    [key: string]: unknown
  }

  export const GanttChart: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
}

