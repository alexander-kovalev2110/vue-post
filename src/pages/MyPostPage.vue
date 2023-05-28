<template>
  <div style="width: 800px">
    <nav class="navbar navbar-expand-lg navbar-light mb-1 custom-bg">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">My Post</span>
        <div class="navbar-nav">
          <v-btn class="btn btn-sm btn-outline-primary me-3" @click="editPost">Edit</v-btn>
          <v-btn class="btn btn-sm btn-outline-primary me-3" @click="deletePost">Delete</v-btn>
        </div>
      </div>
    </nav>

    <br>

    <!-- Form for editing current post, appears only when "Edit" button is pressed -->
    <form :style="{display: display}">
      <div class="form-floating mb-3" >
        <input type="text" class="form-control" id="floatingInput" placeholder="Title" v-model="title">
        <label for="floatingInput">Title</label>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Post text" id="floatingTextarea" v-model="body"></textarea>
        <label for="floatingTextarea">Post text</label>
      </div>

      <div class="px-3 py-2">
        <v-btn class="btn btn-sm btn-outline-primary me-3 custom-bg" @click="submitEdit">Submit</v-btn>
        <v-btn class="btn btn-sm btn-outline-primary me-3 custom-bg" @click="cancelEdit">Cancel</v-btn>
      </div>
    </form>

    <!-- My current Post -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <span class="card-text"> <i>{{username}}</i></span>
        <p class="text-wrap">{{ body }}</p>
      </div>
    </div>

    <h3 class="px-3 py-2">Comments</h3>

    <!-- List of My Post comments -->
    <div class="card" v-for="(item, key) in comments" :key={key}>
      <div class="card-body mb-0" >
        <h5 class="card-title">{{ item.name }}</h5>
        <span class="card-text"> <i>{{item.email}}</i></span>
        <p class="text-wrap">{{ item.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyPostPage",
  data() {
    return {
      postId: 1,
      title: 'Заголовок поста',
      userId: 1,
      username: 'Имя автора',
      email: '',
      body: 'Текст поста',
      comments: [],
      display: 'none'
    }
  },
  mounted () {
    // Current Post reading
    axios.get(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
        .then(res => {
          const {title, body, userId} = res.data
          this.title = title
          this.body = body
          this.userId = userId
        })
        .catch(err => {
          console.error(err)
        })

    // Reading the author's name
    axios.get(`https://jsonplaceholder.typicode.com/users/${this.userId}`)
        .then(res => {
          this.username = res.data.name
          this.email = res.data.email
        })
        .catch(err => {
          console.error(err)
        })

    // Reading the comments of Current Post
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${this.postId}`)
        .then(res => {
          this.comments = res.data
        })
        .catch(err => {
          console.error(err)
        })
  },
  methods: {
    editPost() {
      this.display = 'block'        // Display the edit form
    },

    async submitEdit() {
      try {
        await axios.patch(`https://jsonplaceholder.typicode.com/posts/${this.postId}`, { data: {
            title: this.title,
            body: this.body
          }
        })
      } catch (e) {
        console.error(e)
      }
      this.display = 'none'
    },

    cancelEdit() {
      this.display = 'none'
    },

    async deletePost() {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
      } catch (e) {
        console.error(e)
      }
      // Clearing the Form
      this.title = ""
      this.username = ""
      this.body = ""
      this.comments = []

      this.display = 'none'
    }
  }
}
</script>

<style>
  .custom-bg {
    background-color: lightsalmon
}
</style>