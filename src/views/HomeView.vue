<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'
import { useI18n } from 'vue-i18n'

const counter = useCounterStore()
const { t } = useI18n()
const { count } = storeToRefs(counter)
</script>

<template>
  <a-space direction="vertical" size="large" style="width: 100%">
    <a-card :title="t('home.title')" bordered>
      <p>{{ t('home.subtitle') }}</p>
      <a-space align="center" style="width: 100%; justify-content: space-between">
        <strong>{{ t('home.counter', { count }) }}</strong>
        <a-button type="primary" @click="counter.increment()">
          {{ t('actions.increment') }}
        </a-button>
      </a-space>
    </a-card>
  </a-space>
</template>

