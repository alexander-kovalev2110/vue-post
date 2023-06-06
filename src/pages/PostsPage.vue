<template>
  <div class="card" v-for="(item, key) in arr" :key={key} >
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from "axios"
export default {
  setup() {
    const postArr = ref([])
    const offset = ref(0)
    const page = ref(5)

    const router = useRouter()

    onMounted(() => {
      axios.get('https://jsonplaceholder.typicode.com/posts')
          .then(res => {
            postArr.value = res.data
          })
          .catch(err => {
            console.error(err)
          })
    })

    // Array for current five posts to display on screen (during pagination)
    const arr = computed(() => {
      return postArr.value.filter((el, index) => ((index >= offset.value) && (index < offset.value + page.value)))
    })

    function handleClick(ind) {
      router.push({name: 'post', params: {id: postArr.value[ind].id}})
    }

    function goNext() {
      offset.value = ((offset.value + page.value) < postArr.value.length)? (offset.value + page.value): offset.value
    }

    function goPrevious() {
      offset.value = ((offset.value - page.value) >= 0)? (offset.value - page.value): offset.value
    }

    function goPage(n) {

      offset.value = ((offset.value + (n-1) * page.value) < postArr.value.length)? (offset.value + (n-1) * page.value): offset.value
    }

    return {
      postArr,
      offset,
      page,
      arr,
      handleClick,
      goNext,
      goPrevious,
      goPage
    }
  }
}
</script>
