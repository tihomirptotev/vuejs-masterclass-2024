<script setup lang="ts">

import { Button } from '@/components/ui/button'
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <div>
      <Button class="dark:bg-gray-900">Click me</Button>
    </div>

    <RouterLink :to="{ name: '/projects/[id]', params: {id: 42}}">Project 42</RouterLink>
  </div>


</template>

<style scoped></style>
