<template>
  <nav class="navbar navbar-expand-lg navbar-light mb-1" style="background-color: orange; width: 800px">
    <div class="container-fluid">

      <span class="navbar-brand mb-0 h1">Post Blog</span>

      <div class="navbar-nav">
        <v-btn class="btn btn-sm btn-outline-primary me-3"
               @click="goToPage('posts')">Posts</v-btn>
        <v-btn class="btn btn-sm btn-outline-primary me-3"
               @click="goToPage('myPosts')">My Posts</v-btn>
        <v-btn class="btn btn-sm btn-outline-primary"
                @click="goToPage('user')">User Profile</v-btn>
      </div>

    </div>
  </nav>
</template>

<script>
export default {
  name: "PostNavbar",
  methods: {
    goToPage(page) {
      this.$router.push(page)
    }
  }
}
</script>
