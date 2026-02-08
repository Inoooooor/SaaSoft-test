<script setup lang="ts">
import { useCounterStore } from './stores/counter'
import ProfileForm from './components/ProfileForm.vue'

const counter = useCounterStore()
</script>

<template>
  <profile-form />
</template>
