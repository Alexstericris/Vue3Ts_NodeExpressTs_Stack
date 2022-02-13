<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  props:{
    msg: String
  },
  data() {
    return{

    }
  },
  created() {
    this.test()
  },
  methods:{
    test(){
      this.axios.get('posts').then(response=>{
        console.log(response.data)
      })
    }
  }
})
</script>

<template>
  <div class="welcome">
    <div class="container">
      <h1>Hello Digga</h1>
      <h1>Was Geht</h1>
      <button @click="testApi">Test</button>
    </div>
    <!--    <div class="jumbotron text-center">-->
    <!--            <h1>Welcome to the <strong>VENoM</strong> Example Starter App</h1>-->
    <!--            <p>Based on tutorial from <a target="_blank" href="https://medium.com/@anaida07/mevn-stack-application-part-1-3a27b61dcae0">here</a>.</p>-->

    <!--        <p>Fully loaded with Docker-compose for local development, hot reload, scss in templates, and more.</p>-->
    <!--        <router-link v-bind:to="{ name: 'Posts' }" class="add_post_link">View Posts App</router-link>-->
    <!--    </div>-->

  </div>
</template>

<style lang="sass" scoped>
h1, h2
  font-weight: normal

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a
  color: #42b983

.welcome
  background: url("@/assets/alexAndMariusPc.jpg") no-repeat
  background-size: cover
  background-position: 0 60%
  height: 950px

</style>