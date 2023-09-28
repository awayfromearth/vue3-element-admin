import axios from 'axios'
import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'
import { store } from '..'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('../../views/**/**.vue')

const Layout = () => import('@/layout/index.vue')

/**
 * Use meta.role to determine if the current user has permission
 *
 * @param roles 用户角色集合
 * @param route 路由
 * @returns
 */
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta?.roles) {
    // 角色【超级管理员】拥有所有权限，忽略校验
    if (roles.includes('ROOT')) {
      return true
    }
    return roles.some(role => {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as string[]).includes(role)
      }
    })
  }
  return false
}

/**
 * 递归过滤有权限的异步(动态)路由
 *
 * @param routes 接口返回的异步(动态)路由
 * @param roles 用户角色集合
 * @returns 返回用户有权限的异步(动态)路由
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const asyncRoutes: RouteRecordRaw[] = []

  routes.forEach(route => {
    const tmpRoute = { ...route }
    if (!route.name) {
      tmpRoute.name = route.path
    }
    if (hasPermission(roles, tmpRoute)) {
      if (tmpRoute.component?.toString() === 'Layout') {
        tmpRoute.component = Layout
      } else {
        const component = modules[`../../views/${tmpRoute.component}.vue`]
        if (component) {
          tmpRoute.component = () => component
        } else {
          tmpRoute.component = () => modules['../../views/error-page/404.vue']
        }
      }

      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles)
      }

      asyncRoutes.push(tmpRoute)
    }
  })

  return asyncRoutes
}

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes)
  }
  /**
   * 生成动态路由
   *
   * @param roles 用户角色集合
   * @returns
   */
  function generateRoutes(roles: string[]) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      // mock获取路由菜单的接口
      axios({
        url: '/api/v1/menus/routes',
        method: 'get'
      })
        .then(({ data: { data: asyncRoutes } }) => {
          const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
          setRoutes(accessedRoutes)
          resolve(accessedRoutes)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  return {
    routes,
    setRoutes,
    generateRoutes
  }
})

export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
