import * as type from './type'
import { $http } from '../../../plugins/http-wrapper';

export const login = async ({commit}, params) => {
  try {
    const { email, password } = params;
    const username = email.slice(0, email.indexOf('@'));
    const response = await $http.post('/auth/login', {password, username});
    const { content } = response;
    if (content) {
      $http.setAccessToken(content);
      
      const profile = await $http.get('/profile/me');
      localStorage.setItem('auth', JSON.stringify({token: content, profile: profile.content}))

      const data = {
        token: content,
        profile: profile.content,
      }
      commit(type.LOGIN_SUCCESS, data);
      
      return { success: true };
    }
    else{
      return { success: false, msg: 'Oops, Somethings went wrong!' };
    }
  } catch (error) {
    return { success: false, message: 'Oops, Somethings went wrong!' };
  }
};

export const logout = async ({commit}) => {
  $http.removeAccessToken()
  localStorage.removeItem('auth')
  commit(type.LOGOUT)
};

export const register = async ({commit},params) => {
  try {
    const { email , password, confirmPassword } = params;
    const username = email.slice(0, email.indexOf('@'));
    
    const repsonse = await $http.post('/auth/register', { email, username, password, confirmPassword })
    
    if(repsonse.status === 201){
      commit(type.REGISTER_SUCCESS)
      return { success: true };
    }
    else{
      return { success: false, msg: 'Oops, Somethings went wrong!' };
    }
  } catch (error) {
    return { success: false, message: 'Oops, Somethings went wrong!' };
  }


}


export const getProfile = async ({ commit }) => {
  try {
    const response = await $http.get('/profile/me');
    const { content } = response;
    if (content) {
      commit(type.UPDATE_PROFILE, content);
    }
  } catch (error) {
    console.log(error);
  }
    
};