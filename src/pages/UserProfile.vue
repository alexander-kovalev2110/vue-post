<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <hr>
      <span class="card-text">id: <b>{{id}}</b></span>
      <br>
      <span class="card-text"><i>{{ email }}</i></span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  setup() {
    const userId = ref(4)
    const id = ref(null)
    const name = ref('')
    const email = ref('')

    onMounted(() => {
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId.value}`)
          .then(res => {
            const data = res.data
            id.value = data.id
            name.value = data.name
            email.value = data.email
          })
          .catch(err => {
            console.error(err)
          })
    })

    return {
      id,
      name,
      email
    }
  }
}
</script>
