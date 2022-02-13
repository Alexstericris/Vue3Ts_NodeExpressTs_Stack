<script>
import {defineComponent} from "vue";
export default defineComponent({
  props:{
    label: {
      required:false,
      type:String
    },
    placeholder:{
      required:false,
      type:String,
      default:''
    }
  }
})
</script>
<template>
  <div>
    <label v-if="label">{{label}}</label>
    <input type="text" :placeholder="placeholder">
  </div>

</template>

<style scoped>

</style>