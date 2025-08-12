<script setup lang="ts">
import { pb } from '@/lib/pocketbaseClient'
import { onMounted } from 'vue'

console.log(pb)

onMounted(async () => {
  const userData = await pb.collection('users').authWithPassword('test@email.com', 'password1234')
  console.log(userData)
})
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
