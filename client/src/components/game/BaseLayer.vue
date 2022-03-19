<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name:'BaseLayer'
});
</script>

<template>
    <svg id="mainSVG">
        <slot></slot>
    </svg>
</template>

<style scoped>
#mainSVG{
    height: 720px;
    width: 100%
}
</style>