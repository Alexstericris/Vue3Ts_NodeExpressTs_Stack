import HomeView from "@/views/HomeView.vue";
import {store} from "@/stores/store";
import type {NavigationGuardNext, RouteLocation, RouteLocationNormalized, RouteRecordRaw} from "vue-router";
import GameApi from "@/apis/GameApi";
import type {ComponentPublicInstance} from "vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: "/game",
        component: () => import('../views/GameView.vue'),
        beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            if (!store.state.user) {
                next(from)
            } else {
                next()
            }
        }
    },
    {
        path: "/characters",
        component: () => import('../views/CharactersView.vue'),
        beforeEnter: (to: RouteLocationNormalized,
                      from: RouteLocationNormalized,
                      next: NavigationGuardNext) => {
            if (!store.state.user) {
                next(from)
            } else {
                next()
            }
        }
    },
    {
        path: "/login",
        component: () => import('../views/LoginView.vue'),
        beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            if (store.state.token.length > 15) {
                next(from)
            } else {
                next()
            }
        }
    },
    {
        path: "/register",
        component: () => import('../views/RegisterView.vue'),
        beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            if (store.state.token.length > 15) {
                next(from)
            } else {
                next()
            }
        }
    }
]
export default routes