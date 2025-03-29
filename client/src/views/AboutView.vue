<script setup lang="ts">
import ProgressBar from "@/components/snippets/ProgressBar.vue";
import MainLayout from "@/views/Layouts/MainLayout.vue";

const skills = [
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
    name: 'Node JS',
    level: 40,
    img: 'nodejs-logo.svg',
    style: 'width:80%',

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
    name: 'Python',
    level: 30,
    img: 'python-logo.svg',
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

function getImgSrc(img: string) {
  return new URL(`../assets/${img}`, import.meta.url).href
}
</script>

<template>
  <MainLayout>
    <div class="container">
      <header class="pb-3">
        <span class="fs-4 text-shadow display-5 fw-bold text-white">Developer</span>
      </header>
      <div class="rounded-3">
        <div class="d-flex h-100">
          <div class="text-white m-0 py-5 col-sm-12 col-lg-5 col-md-5 bg-dark bg-opacity-50 h-100 rounded-3 p-3">
            <h1 class="text-shadow display-5 fw-bold">Alex Cristea</h1>
            <p class="text-shadow-2 fs-5">Web-developer since 2019.</p>
            <ul>
              <li>Full-stack developer for 4 years at <a class="text-decoration-none text-light-green"
                                                         href="https://schubwerk.de">schubwerk GmbH</a></li>
              <li>Computer Science Bachelor at <a class="text-decoration-none text-light-green"
                                                  href="https://startseite.uni-mainz.de/">Johannes
                Gutenberg University</a></li>
              <li>Project Manager for 9 months at <a class="text-decoration-none text-light-green"
                                                     href="https://www.solit-kapital.de/">
                Solit Digital GmbH
              </a>
              </li>
              <li>Full-stack developer at
                <a class="text-decoration-none text-light-green"
                   href="https://www.delo.de/">
                  DELO
                </a>
              </li>
            </ul>
          </div>
          <div class="text-white ms-4 py-5 col-sm-12 col-lg-3 col-md-5 bg-dark bg-opacity-50 h-100 rounded-3 p-3">
            <h1 class="text-shadow display-5 fw-bold">Hobbies</h1>
            <ul>
              <li>Programming</li>
              <li>Playing Guitar</li>
              <li>Learning languages</li>
            </ul>
          </div>
          <div>
            <img class="rounded-3 ms-md-4 mt-4 mt-md-0 shadow-lg h-auto w-auto" alt="Alex Profile"
                 src="profile_alex_320.JPG">
          </div>
        </div>
      </div>
      <div class="pt-2 mt-4 border-top ">
        <span class="fs-4 text-shadow display-5 fw-bold text-white">Skills</span>
      </div>
      <div class="row align-items-md-stretch">
        <div :key="index" v-for="(skill,index) in skills" class="mt-4 col-lg-3">
          <div class="h-100 p-5 bg-light border rounded-3 text-center">
            <h2>{{ skill.name }}</h2>
            <img :alt="skill.name" :style="skill.style" :src="getImgSrc(skill.img)">
            <ProgressBar :level="skill.level"></ProgressBar>
            <!--                        <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>-->
            <!--                        <button class="btn btn-outline-light" type="button">Example button</button>-->
          </div>
        </div>
      </div>


    </div>
  </MainLayout>
</template>
<style scoped lang="sass">
.alex-background
  height: 500px
  @media (min-width: 992px)
    background: url("@/assets/schubwerk_alex.jpg") 0px -150px no-repeat
    background-size: cover
  @media (max-width: 991px)
    background: url("@/assets/schubwerk_alex.jpg") 0 0 no-repeat
    background-size: cover

/*background-position: 100px -150px;*/

</style>
