import HomeView from "@/views/HomeView.vue";
import store from "@/store";
import type {NavigationGuardNext, RouteLocation, RouteLocationNormalized, RouteRecordRaw} from "vue-router";

const routes:Array<RouteRecordRaw>=[
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue')
    },
    {
        path: "/login",
        component: ()=>import('../views/LoginView.vue'),
        beforeEnter:(to:RouteLocationNormalized,from:RouteLocationNormalized,next:NavigationGuardNext)=>{
            if (store.state.token.length>15) {
                next(from)
            }else{
                next()
            }
        }
    },
    {
        path: "/register",
        component: ()=>import('../views/RegisterView.vue'),
        beforeEnter:(to:RouteLocationNormalized,from:RouteLocationNormalized,next:NavigationGuardNext)=>{
            if (store.state.token.length>15) {
                next(from)
            }else{
                next()
            }
        }
    }
]
export default routes