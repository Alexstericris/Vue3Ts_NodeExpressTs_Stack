<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "ProgressBar",
    props:{
        level:{
            required:true,
            default:0
        }
    }
})
</script>
<template>
<div class="progress" >
    <span class="bar" :style="{width:level+'%'}"></span>
</div>
</template>



<style scoped>
.progress{
    background: #cccaca;
    margin-top: 1rem;
    width: 100%;
    top: 0;
    left: 0;
    height: 10px;
    transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.bar {
    background-color: #41B883;
    display: block;
    height: 100%;
}
</style>