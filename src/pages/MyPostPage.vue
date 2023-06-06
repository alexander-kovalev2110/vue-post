<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light mb-1 custom-bg">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">My Post</span>
        <div class="px-3 py-2">
          <button class="btn btn-sm btn-outline-primary me-3" @click="editPost">Edit</button>
          <button class="btn btn-sm btn-outline-primary" @click="deletePost">Delete</button>
        </div>
      </div>
    </nav>

    <br>

    <!-- Form for editing current post, appears only when "Edit" button is pressed -->
    <form :style="{display: display}">
      <div class="form-floating mb-3" >
        <input type="text" class="form-control" id="floatingInput" placeholder="Title" v-model="postTitle">
        <label for="floatingInput">Title</label>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Post text" id="floatingTextarea" v-model="postBody"></textarea>
        <label for="floatingTextarea">Post text</label>
      </div>

      <div class="px-3 py-2">
        <button class="btn btn-sm btn-outline-primary me-3 custom-bg" @click="submitEdit">Submit</button>
        <button class="btn btn-sm btn-outline-primary me-3 custom-bg" @click="cancelEdit">Cancel</button>
      </div>
    </form>

    <!-- My current Post -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ postTitle }}</h5>
        <span class="card-text"> <i>{{username}}</i></span>
        <p class="text-wrap">{{ postBody }}</p>
      </div>
    </div>

    <h3 class="px-3 py-2">Comments</h3>

    <!-- List of My Post comments -->
    <div class="card mb-1" v-for="(item, key) in comments" :key={key}>
      <div class="card-body" >
        <h5 class="card-title">{{ item.name }}</h5>
        <span class="card-text"> <i>{{item.email}}</i></span>
        <p class="text-wrap">{{ item.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from "axios";
export default {
  setup() {
    const postId = ref(null)
    const postTitle = ref('Title')
    const postUserId = ref(null)
    const username = ref('')
    const postBody = ref('Text')
    const comments = ref([])
    const display = ref('none')       // To hide the comment form

    const route = useRoute()

    onMounted(() => {
      //  Reading the Current Post
      axios.get(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
          .then(res => {
            const {id, title, body, userId} = res.data
            postId.value = id
            postTitle.value = title
            postBody.value = body
            postUserId.value = userId
          })
          .then(() => {             // Reading the author's name
            axios.get(`https://jsonplaceholder.typicode.com/users/${postUserId.value}`)
                .then(res => {
                  username.value = res.data.name
                })
                .then(() => {       // Reading the comments of Current Post
                  axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId.value}`)
                      .then(res => {
                        comments.value = res.data
                      })
                })
          })
          .catch(err => {
            console.error(err)
          })
    })

    function editPost() {
      display.value = 'block'        // Display the edit form
    }

    async function submitEdit() {
      try {
        await axios.patch(`https://jsonplaceholder.typicode.com/posts/${this.postId}`, { data: {
            title: postTitle.value,
            body: postBody.value
          }
        })
      } catch (e) {
        console.error(e)
      }
      display.value = 'none'
    }

    function cancelEdit() {
      display.value = 'none'
    }

    async function deletePost() {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
      } catch (e) {
        console.error(e)
      }
      // Clearing the Form
      postTitle.value = ""
      username.value = ""
      postBody.value = ""
      comments.value = []

      display.value = 'none'
    }

    return {
      postId,
      postTitle,
      postUserId,
      username,
      postBody,
      comments,
      display,
      editPost,
      submitEdit,
      cancelEdit,
      deletePost
    }
  }
}
</script>
