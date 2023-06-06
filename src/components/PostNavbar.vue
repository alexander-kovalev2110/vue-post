<template>
  <nav class="navbar navbar-expand-lg navbar-light mb-1 main-bg">
    <div class="container-fluid">

      <span class="navbar-brand mb-0 h1">Post Blog</span>

      <div class="px-3 py-2">
        <button class="btn btn-sm btn-outline-primary me-3"
               @click="goToPage('posts')">Posts</button>
        <button class="btn btn-sm btn-outline-primary me-3"
               @click="goToPage('myPosts')">My Posts</button>
        <button class="btn btn-sm btn-outline-primary"
               @click="goToPage('user')">User Profile</button>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
  const router = useRouter()
  function goToPage(page) {
    router.push({name: page})
  }
</script>
