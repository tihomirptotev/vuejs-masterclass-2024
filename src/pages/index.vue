<script setup lang="ts">

</script>

<template>
  <div>
    <h1>Home Page</h1>
    <RouterLink :to="{ name: '/projects/[id]', params: {id: 42}}">Project 42</RouterLink>
  </div>


</template>

<style scoped></style>
