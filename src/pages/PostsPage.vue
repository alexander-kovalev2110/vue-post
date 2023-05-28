<template>
  <div class="card" v-for="(item, key) in arr" :key={key} style="width: 800px">
    <div class="card-body post mb-1" @click="handleClick(offset + key)">{{ item.title }}</div>
  </div>

  <br>

  <nav aria-label="Posts page navigation">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#" @click="goPrevious()">Previous</a></li>
      <li class="page-item"><a class="page-link" href="#" @click="goPage(1)">{{offset/page + 1}}</a></li>
      <li class="page-item"><a class="page-link" href="#" @click="goPage(2)">
        {{((offset/page + 1) < postArr.length/page)? (offset/page + 2): '-'}}</a></li>
      <li class="page-item"><a class="page-link" href="#" @click="goPage(3)">
        {{((offset/page + 2) < postArr.length/page)? (offset/page + 3): '-'}}</a></li>
      <li class="page-item"><a class="page-link" href="#" @click="goNext()">Next</a></li>
    </ul>
  </nav>
</template>

<script>
import axios from "axios"
export default {
  name: "PostsPage",
  data() {
    return {
      postArr: [],
      offset: 0,
      page: 5
    }
  },

  computed: {
    arr() {           // Array for current five posts to display on screen (during pagination)
      const {postArr, offset, page} = this
      return postArr.filter((el, index) => ((index >= offset) && (index < offset + page)))
    }
  },

  mounted () {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
            this.postArr = res.data
       })
        .catch(err => {
          console.error(err)
        })
  },

  methods: {
    handleClick(ind) {
      this.$router.push({name: 'post', params: {id: this.postArr[ind].id}})
    },

    goNext() {
      const {postArr, offset, page} = this
      this.offset = ((offset + page) < postArr.length)? (offset + page): offset
      },

    goPrevious() {
      const {offset, page} = this
      this.offset = ((offset - page) >= 0)? (offset - page): offset
    },

    goPage(n) {
      const {postArr, offset, page} = this
      this.offset = ((offset + (n-1) * page) < postArr.length)? (offset + (n-1) * page): offset
    },
  }
}
</script>

<style scoped>
  .post {
    background-color: lightgrey;
  }
  .post:hover {
    background-color: darkgrey;
  }
</style>
