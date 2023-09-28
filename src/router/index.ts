import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'homepage',
          affix: true,
          keepAlive: true
        }
      },
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        meta: {
          hidden: true
        }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        meta: {
          hidden: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function resetRouter() {
  router.replace({ path: '/login' })
}

export default router
