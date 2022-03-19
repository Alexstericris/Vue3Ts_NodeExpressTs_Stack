<script lang="ts">
import {defineComponent} from "vue";
import {mapState} from "vuex";

export default defineComponent({
    name:"Toast",
    data() {
        return{
        }
    },
    computed: {
        ...mapState('toast',['show','message','class']),
        toastClass() {
            let toastClass = '';
            if (this.show) {
                toastClass += 'show';
            }else{
                toastClass += 'hide';
            }
            if (this.class) {
                toastClass += ' ' + this.class;
            }
            return toastClass
        },
    },
    methods:{

    }
})
</script>
<template>
<!--    <div aria-live="polite" aria-atomic="true" class="position-relative">-->
        <div class="toast-container position-fixed p3" style="right:30px;bottom:30px">
            <div class="toast fade align-items-center" :class="toastClass"
                 role="alert"
                 aria-live="assertive"
                 aria-atomic="true">
                <!--        <div class="toast-header">-->
                <!--            <img src="..." class="rounded me-2" alt="...">-->
                <!--            <strong class="me-auto">Bootstrap</strong>-->
                <!--            <small>11 mins ago</small>-->
                <!--            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>-->
                <!--        </div>-->
                <div class="d-flex">
                    <div class="toast-body">
                        {{ message }}
                    </div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                </div>
            </div>
        </div>
<!--    </div>-->
</template>

<style scoped>

</style>