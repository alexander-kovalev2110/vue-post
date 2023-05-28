<template>
  <div style="width: 800px">
    <nav class="navbar navbar-expand-lg navbar-light mb-1 custom-bg">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Post</span>
        <div class="navbar-nav">
          <v-btn class="btn btn-sm btn-outline-primary me-3" @click="addComment">Add Comment</v-btn>
        </div>
      </div>
    </nav>

    <br>

    <!-- Form for entering a comment, appears only when "Add Comment" button is pressed -->
    <form :style="{display: display}">
      <div class="form-floating mb-3" >
        <input type="text" class="form-control" id="floatingInput" placeholder="Title" v-model="titleVal">
        <label for="floatingInput">Title</label>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" v-model="commentVal"></textarea>
        <label for="floatingTextarea">Comment</label>
      </div>

      <div class="px-3 py-2">
        <v-btn class="btn btn-sm btn-outline-primary me-3 button-bg" @click="submitComment">Submit</v-btn>
        <v-btn class="btn btn-sm btn-outline-primary me-3 button-bg" @click="cancelComment">Cancel</v-btn>
      </div>
    </form>

    <!-- Current Post -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <span class="card-text"> <i>{{username}}</i></span>
        <p class="text-wrap">{{ body }}</p>
      </div>
    </div>

    <h3 class="px-3 py-2">Comments</h3>

    <!-- List of Post comments -->
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
  name: "PostPage",
  data() {
    return {
      postId: 1,
      title: 'Заголовок поста',
      userId: 1,
      username: 'Имя автора',
      email: '',
      body: 'Текст поста',
      comments: [],
      // Data for adding comment
      titleVal: '',
      commentVal: '',
      display: 'none'       // To hide the comment form
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
    addComment() {
      this.display = 'block'        // Display the comment form
    },

    async submitComment() {         // Writing the new comment
      try {
        await axios.post(`https://jsonplaceholder.typicode.com/comments`, { data: {
            postId: this.postId,
            name: this.titleVal,
            email: this.email,
            body: this.commentVal
          }
        })
      } catch (e) {
        console.error(e)
      }
      this.resetCommentInput()
      this.display = 'none'
    },

    cancelComment() {
      this.resetCommentInput()
      this.display = 'none'
    },

    resetCommentInput() {         // Clearing the Form
      this.titleVal = ''
      this.commentVal = ''
    }
  }
}
</script>

<style>
  .button-bg {
    background-color: lightsalmon
  }
</style>