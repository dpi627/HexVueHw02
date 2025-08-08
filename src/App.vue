<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
  <RouterLink to="/review">Review</RouterLink>

  <RouterView />
</template>
