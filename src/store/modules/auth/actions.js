import * as type from './type'
import { $http } from '../../../plugins/http-wrapper';

export const login = async ({commit}, params) => {
  try {
    const { email, password } = params;
    const username = email.slice(0, email.indexOf('@'));
    const response = await $http.post('/auth/login', {password, username});
    const { content } = response;
    if(content){
      $http.setAccessToken(content);
      commit(type.LOGIN_SUCCESS, content );
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