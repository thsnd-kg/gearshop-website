import {$http} from '@/plugins/http-wrapper'

const BASE_URL = 'user-service/auth'

export const login = async (username, password) =>{
  return await $http.post(`${BASE_URL}/login`, {password, username});
}

export const registerAccount = async (payload) =>{
  return await $http.post(`${BASE_URL}/register`, payload);
}

export const authenticateEmail = async (token) =>{
  return await $http.get(`${BASE_URL}/confirm-email`, {
    token
  });
}

export const forgotPassword = async (email) =>{
  return await $http.get(`${BASE_URL}/forgot-password`, {
    email
  });
}

export const resetPassword = async (token, password) =>{
  return await $http.post(`${BASE_URL}/reset-password`, {
    token,
    password
  });
}