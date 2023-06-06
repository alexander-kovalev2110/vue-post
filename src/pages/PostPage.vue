<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light mb-1 custom-bg">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Post</span>
        <div class="px-3 py-2">
          <button class="btn btn-sm btn-outline-primary" @click="addComment">Add Comment</button>
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
        <button class="btn btn-sm btn-outline-primary me-3 custom-bg-bg" @click="submitComment">Submit</button>
        <button class="btn btn-sm btn-outline-primary me-3 custom-bg-bg" @click="cancelComment">Cancel</button>
      </div>
    </form>

    <!-- Current Post -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ postTitle }}</h5>
        <span class="card-text"> <i>{{username}}</i></span>
        <p class="text-wrap">{{ postBody }}</p>
      </div>
    </div>

    <h3 class="px-3 py-2">Comments</h3>

    <!-- List of Post comments -->
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
    const email = ref('')
    const postBody = ref('Text')
    const comments = ref([])
    // Data for adding comment
    const titleVal = ref('')
    const commentVal = ref('')
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
                  email.value = res.data.email
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

    function addComment() {
        display.value = 'block'        // Display the comment form
    }

    async function submitComment() {   // Writing the new comment
      try {
        await axios.post(`https://jsonplaceholder.typicode.com/comments`, {
          data: {
            postId: postId.value,
            name: titleVal.value,
            email: email.value,
            body: commentVal.value
          }
        })
      } catch (e) {
        console.error(e)
      }
      resetCommentInput()
      display.value = 'none'
    }

    function cancelComment() {
      resetCommentInput()
      display.value = 'none'
    }

    function resetCommentInput() {         // Clearing the Form
      titleVal.value = ''
      commentVal.value = ''
    }

    return {
      postId,
      postTitle,
      postUserId,
      username,
      email,
      postBody,
      comments,
      titleVal,
      commentVal,
      display,
      addComment,
      submitComment,
      cancelComment
    }
  }
}
</script>
