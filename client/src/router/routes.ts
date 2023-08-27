import HomeView from "@/views/HomeView.vue";
import type {NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw} from "vue-router";
import {useStore} from "@/stores/store";

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
            const store = useStore();
            if (!store.user) {
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
            const store = useStore();
            if (!store.user) {
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
            const store = useStore();
            if (store.token.length > 15) {
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
            const store = useStore();
            if (store.token.length > 15) {
                next(from)
            } else {
                next()
            }
        }
    }
]
export default routes