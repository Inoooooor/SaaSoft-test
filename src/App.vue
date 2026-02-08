<script setup lang="ts">
import { useCounterStore } from './stores/counter'
import ProfileForm from './components/ProfileForm.vue'

const counter = useCounterStore()
</script>

<template>
  <profile-form />
  <div>count: {{ counter.count }}</div>
  <div>doubleCount: {{ counter.doubleCount }}</div>
  <button @click="counter.increment">increment</button>
</template>
