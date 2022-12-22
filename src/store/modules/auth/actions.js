/** @format */

import * as type from './type';
import { $http } from '@/plugins/http-wrapper';
import { login, getMe, registerAccount } from '@/api/user-service';

export const performLogin = async ({ commit }, params) => {
  try {
    const { email, password } = params;
    const username = email.slice(0, email.indexOf('@'));
    const response = await login(username, password);
    const { content } = response;
    console.log(content);
    if (content) {
      $http.setAccessToken(content.accessToken);

      const profile = await getMe();
      localStorage.setItem(
        'auth',
        JSON.stringify({ token: content.accessToken, profile: profile.content })
      );

      const data = {
        token: content,
        profile: profile.content
      };
      commit(type.LOGIN_SUCCESS, data);

      return { success: true };
    } else {
      return { success: false, msg: 'Sai mật khẩu!' };
    }
  } catch (error) {
    return { success: false, message: 'Oops, Somethings went wrong!' };
  }
};

export const logout = async ({ commit }) => {
  $http.removeAccessToken();
  localStorage.removeItem('auth');
  commit(type.LOGOUT);
};

export const register = async ({ commit }, params) => {
  try {
    const { email, password, confirmPassword } = params;
    const username = email.slice(0, email.indexOf('@'));

    const response = await registerAccount({
      email,
      username,
      password,
      confirmPassword
    });

    if (response.status === 201) {
      commit(type.REGISTER_SUCCESS);
      return { success: true };
    } else {
      return { success: false, msg: 'Oops, Somethings went wrong!' };
    }
  } catch (error) {
    return { success: false, message: 'Oops, Somethings went wrong!' };
  }
};

export const getProfile = async ({ commit }) => {
  try {
    const response = await getMe();
    const { content } = response;
    if (content) {
      commit(type.UPDATE_PROFILE, content);
    }
  } catch (error) {
    console.log(error);
  }
};
