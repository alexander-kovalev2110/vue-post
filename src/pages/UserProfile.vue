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
import axios from 'axios'
export default {
  name: "UserProfile",
  data() {
    return {
      id: null,
      name: '',
      email: ''
    }
  },
  mounted () {
    axios.get('https://jsonplaceholder.typicode.com/users/4')
    .then(res => {
      const data = res.data
      this.id = data.id
      this.name = data.name
      this.email = data.email
    })
    .catch(err => {
      console.error(err)
    })
  }
}
</script>
