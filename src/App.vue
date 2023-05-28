<template>
  <PostNavbar/>
  <router-view />
</template>

<script>
import PostNavbar from "@/components/PostNavbar"
export default {
  name: 'App',
  components: {
    PostNavbar
  }
}
</script>

