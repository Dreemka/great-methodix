<script setup lang="ts">
import { computed, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { Tag } from 'ant-design-vue'

const { t } = useI18n()

type RecordType = {
  key: number
  name: string
  role: string
  location: string
  status: 'active' | 'pending'
}

const dataSource: RecordType[] = [
  { key: 1, name: 'Alice Moore', role: 'Product Manager', location: 'Berlin', status: 'active' },
  { key: 2, name: 'Jonas Zhao', role: 'Frontend Developer', location: 'Shanghai', status: 'pending' },
  { key: 3, name: 'Sofia Ruiz', role: 'UX Researcher', location: 'Madrid', status: 'active' },
  { key: 4, name: 'Isaiah Cole', role: 'QA Engineer', location: 'Austin', status: 'active' },
]

const columns = computed(() => [
  {
    title: t('table.columns.name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('table.columns.role'),
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: t('table.columns.location'),
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: t('table.columns.status'),
    dataIndex: 'status',
    key: 'status',
    customRender: ({ text }: { text: RecordType['status'] }) => {
      const color = text === 'active' ? 'green' : 'orange'
      const label = text === 'active' ? t('table.status.active') : t('table.status.pending')
      return h(
        Tag,
        { color },
        {
          default: () => label,
        }
      )
    },
  },
])
</script>

<template>
  <a-space direction="vertical" size="large" style="width: 100%">
    <a-card :title="t('table.title')">
      <p>{{ t('table.subtitle') }}</p>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="{ pageSize: 5 }"
        bordered
      />
    </a-card>
  </a-space>
</template>

