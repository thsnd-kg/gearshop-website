import * as actions from './actions';
import * as getters from './getters';
import * as type from './type'

const auth = JSON.parse(localStorage.getItem('auth'));
const state = {
  isAuthendicated : auth ? true : false,
  token: auth ? auth.accessToken : null,
  profile:  auth ? auth.profile : null,
}


const mutations = {
  [type.LOGIN_SUCCESS]: (state, data ) => {

    state.isAuthendicated = true;
    state.token = data.token;
    state.profile = data.profile
  },
  
  [type.LOGOUT]: state => {
    state.isAuthendicated = false;
    state.token = null;
    state.profile = null;
  },

  [type.REGISTER_SUCCESS]: state => {
    state.isAuthendicated = false;
  },

  [type.UPDATE_PROFILE]: (state,profile) => {
    state.profile = profile;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};