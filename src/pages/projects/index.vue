<script setup lang="ts">
import { ref } from 'vue'
import { pb } from '@/lib/pocketbaseClient.ts'
import { type Project } from '../../../database/types.ts'

const projects = ref<Project[] | null>(null)

;(async () => {
  await pb.collection('users').authWithPassword('test@email.com', 'password1234')
  projects.value = await pb.collection('projects').getFullList()
})()
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Home</RouterLink>
    <ul>
      <li v-for="project in projects" :key="project.id">
        {{ project.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
