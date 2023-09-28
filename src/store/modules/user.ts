import axios from 'axios'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { resetRouter } from '@/router'
import { store } from '@/store'
import type { UserInfo } from '@/api/user/types'

export const useUserStore = defineStore('user', () => {
  const token = useStorage('accessToken', '')
  function login() {
    return new Promise<void>((resolve, reject) => {
      // mock的登录接口
      axios({
        url: '/api/v1/auth/login',
        method: 'post'
      })
        .then(({ data: { data } }) => {
          const { tokenType, accessToken } = data
          token.value = tokenType + ' ' + accessToken
          resolve()
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  const user: UserInfo = {
    roles: [],
    perms: []
  }
  function getInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      // mock的获取用户信息接口
      axios({
        url: '/api/v1/users/me',
        method: 'get'
      })
        .then(({ data: { data } }) => {
          if (!data) {
            reject('Verification failed, please Login again.')
            return
          }
          if (!data.roles || data.roles.length <= 0) {
            reject('getUserInfo: roles must be a non-null array!')
            return
          }
          Object.assign(user, { ...data })
          resolve(data)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  function resetStore() {
    resetRouter()
    token.value = ''
    Object.assign(user, { roles: [], perms: [] })
  }

  return {
    token,
    user,
    login,
    getInfo,
    resetStore
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
