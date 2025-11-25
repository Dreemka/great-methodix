<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stackItems = [
  'about.stack.vue',
  'about.stack.vite',
  'about.stack.pinia',
  'about.stack.i18n',
  'about.stack.router',
]
</script>

<template>
  <a-card :title="t('about.title')" bordered>
    <p>{{ t('about.description') }}</p>
    <a-list :data-source="stackItems">
      <template #renderItem="{ item }">
        <a-list-item>{{ t(item) }}</a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

