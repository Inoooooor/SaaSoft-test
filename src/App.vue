<script setup lang="ts">
import { useCounterStore } from './stores/counter'

const counter = useCounterStore()
</script>

<template>
  <div>count: {{ counter.count }}</div>
  <div>doubleCount: {{ counter.doubleCount }}</div>
  <button @click="counter.increment">increment</button>
</template>
