import {$http} from '@/plugins/http-wrapper'

const BASE_URL = 'user-service/auth'

export const login = async (username, password) =>{
  return await $http.post(`${BASE_URL}/login`, {password, username});
}

export const registerAccount = async (payload) =>{
  return await $http.post(`${BASE_URL}/register`, payload);
}

