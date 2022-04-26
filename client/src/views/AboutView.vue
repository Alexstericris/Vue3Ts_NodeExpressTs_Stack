<script lang="ts">
import {defineComponent} from "vue";
import ProgressBar from "@/components/snippets/ProgressBar.vue";

export default defineComponent({
    components: {ProgressBar},
    inject: [],
    props: {
        msg: String
    },
    data() {
        return {
            skills: [
                {
                    name: 'Vue 2 + 3',
                    level: 90,
                    img: 'vuelogo.svg',
                    style: '',
                }, {
                    name: 'JS',
                    level: 90,
                    img: 'jslogo.svg',
                    style: 'width:89%',

                }, {
                    name: 'Typescript',
                    level: 40,
                    img: 'Typescript_logo_2020.svg',
                    style: 'width:89%',
                }, {
                    name: 'CSS',
                    level: 30,
                    img: 'csslogo2.svg',
                    style: 'width:78%',
                }, {
                    name: 'Laravel',
                    level: 90,
                    img: 'laravel-2.svg',
                    style: 'width:89%',
                }, {
                    name: 'Ubuntu',
                    level: 75,
                    img: 'ubuntulogo.svg',
                    style: 'width:95%'
                }, {
                    name: 'Mysql',
                    level: 90,
                    img: 'mysqllogo.svg',
                    style: 'width:110%',
                }, {
                    name: 'mongoDB',
                    level: 30,
                    img: 'MongoDB_Logo.svg',
                    style: 'width:110%',
                },
            ]
        }
    },
    created() {
        this.test()
    },
    mounted() {
        this.$store.commit('toast/success', 'yo digga')
    },
    methods: {
        test() {
            this.axios.get('/api/users').then(response => {
                console.log(response.data)
            })
        },
        getImgSrc(img: string) {
            return new URL(`../assets/${img}`, import.meta.url).href
        },
    }
})
</script>

<template>
    <main>
        <div class="container mt-6 py-4">
            <header class="pb-3 mb-4 border-bottom">
                <span class="fs-4">Developer</span>
            </header>
            <div class="alex-background p-3 mb-4 bg-light rounded-3 ">
                <div class="container-fluid h-100">
                    <div class="text-white m-0 py-5 col-sm-12 col-lg-5 col-md-5 bg-dark bg-opacity-25 h-100 rounded-3 p-3">
                        <h1 class="text-shadow display-5 fw-bold">Alex Cristea</h1>
                        <p class="text-shadow-2 col-md-8 fs-4">Developing Web since 2019</p>
                        <p class="text-shadow-2 col-md-8 fs-4">Working for schubwerk GmbH as a full stack developer</p>
                        <!--                    <button class="btn btn-primary btn-lg" type="button">Example button</button>-->
                    </div>
                </div>
            </div>
            <div class="pb-3 mb-4 border-bottom ">
                <span class="fs-4">Skills</span>
            </div>
            <div class="row align-items-md-stretch">
                <div :key="index" v-for="(skill,index) in skills" class="mt-4 col-sm-3">
                    <div class="h-100 p-5 bg-light border rounded-3 text-center">
                        <h2>{{ skill.name }}</h2>
                        <img :style="skill.style" :src="getImgSrc(skill.img)">
                        <ProgressBar :level="skill.level"></ProgressBar>
                        <!--                        <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>-->
                        <!--                        <button class="btn btn-outline-light" type="button">Example button</button>-->
                    </div>
                </div>
            </div>


        </div>
    </main>

</template>
<style scoped>
.alex-background {
    background: /*linear-gradient(to right top,rgba(var(--bs-light-rgb),var(--bs-bg-opacity)) 0%, rgba(231, 231, 231, 0.9) 40%, rgba(125, 185, 232, 0) 100%),*/ url("@/assets/schubwerk_alex.jpg") 0px -150px no-repeat;
    background-size: cover;
    height: 500px;
    /*background-position: 100px -150px;*/
}
</style>
