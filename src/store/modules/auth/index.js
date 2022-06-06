import * as actions from './actions';
import * as getters from './getters';
import * as type from './type'

const state = {
  isAuthendicated : false,
  token : null
}

const mutations = {
  [type.LOGIN_SUCCESS]: (state,  token ) => {
    state.isAuthendicated = true;
    state.token = token;
  },
  [type.LOGOUT]: state => {
    state.isAuthendicated = false;
  },
  [type.REGISTER_SUCCESS]: state => {
    state.isAuthendicated = false;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};