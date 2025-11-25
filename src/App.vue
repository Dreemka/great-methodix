<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import type { MenuProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import {
  HomeOutlined,
  InfoCircleOutlined,
  TableOutlined,
  ProjectOutlined,
} from '@ant-design/icons-vue'

const { locale, t } = useI18n()
const router = useRouter()
const route = useRoute()

const menuItems = [
  { key: '/', labelKey: 'navigation.home', icon: HomeOutlined },
  { key: '/table', labelKey: 'navigation.table', icon: TableOutlined },
  { key: '/gantt', labelKey: 'navigation.gantt', icon: ProjectOutlined },
  { key: '/about', labelKey: 'navigation.about', icon: InfoCircleOutlined },
]

const onMenuClick: MenuProps['onClick'] = ({ key }) => {
  if (typeof key === 'string' && key !== route.path) {
    router.push(key)
  }
}

const localeOptions = [
  { label: 'EN', value: 'en' },
  { label: 'RU', value: 'ru' },
]

const localeValue = computed({
  get: () => locale.value,
  set: (value: string) => {
    locale.value = value
  },
})
</script>

<template>
  <a-layout class="app-layout">
    <a-layout-sider
      collapsible
      breakpoint="lg"
      class="app-sider"
      :width="260"
      theme="light"
    >
      <div class="logo">
        <span>{{ t('app.title') }}</span>
      </div>
      <a-menu
        theme="light"
        mode="inline"
        :selectedKeys="[route.path]"
        @click="onMenuClick"
      >
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <template #icon>
            <component :is="item.icon" />
          </template>
          {{ t(item.labelKey) }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="app-header">
  <div>
          <p>{{ t('app.description') }}</p>
  </div>
        <a-segmented
          size="large"
          v-model:value="localeValue"
          :options="localeOptions"
        />
      </a-layout-header>
      <a-layout-content class="app-content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
}
.app-sider {
  position: sticky;
  top: 0;
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid var(--border);
  box-shadow: 6px 0 20px rgba(15, 23, 42, 0.06);
}
.app-sider :deep(.ant-menu-light) {
  background: transparent;
}
.logo {
  color: #111827;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 1.5rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.app-header {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 1px solid var(--border);
}
.app-content {
  padding: 2rem;
  min-height: calc(100vh - 64px);
  background: #f8fafc;
}
</style>
