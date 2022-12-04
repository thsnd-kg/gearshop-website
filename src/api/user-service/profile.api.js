import { $http } from '@/plugins/http-wrapper'

const BASE_URL = 'user-service/profile/me'

export const getMe = async () => {
  return await $http.get(BASE_URL)
}

export const updateProfile = async (payload) => {
  return await $http.put(BASE_URL, {
    ...payload
  })
}

export const changePassword = async (payload) => {
  return await $http.post(`${BASE_URL}/change-password`, payload)
}