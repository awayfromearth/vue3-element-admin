import NProgress from 'nprogress'
import router from './router'
import { useUserStoreHook } from './store/modules/user'
import { usePermissionStoreHook } from './store/modules/permission'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasToken = localStorage.getItem('accessToken')
  
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/'})
      NProgress.done()
    } else {
      const userStore = useUserStoreHook()
      const hasRoles = userStore.user.roles && userStore.user.roles.length > 0
      if (hasRoles) {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name }): next('/404')
        } else {
          next()
        }
      } else {
        try {
          const { roles } = await userStore.getInfo()
          const permissionStore = usePermissionStoreHook()
          const accessRoute = await permissionStore.generateRoutes(roles)
          
          accessRoute.forEach(route => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch(e) {
          userStore.resetStore()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      console.log(2);
      
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})