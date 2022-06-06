import AuthService from '../../../services/auth.service'
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };
 const AuthModule = {
  namespaced: true,
   state: initialState,


  actions: {
    login({ commit }, user) {
      console.log("auth store");
      return AuthService.login(user).then(
        user => {
          commit('LOGIN_SUCCESS', user);
          return true;
        },
        error => {
          commit('LOGIN_FAILURE');
          console.log(error);
          return false;
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('LOGOUT');
    },
    
    register({ commit }, user) {
      return AuthService.register(user).then(
        () => {
          commit('REGISTER_SUCCESS');
          return true;
        },
        error => {
          console.log(error);
          commit('REGISTER_FAILURE');
          return false;
        }
      );
    }
  },
  mutations: {
    LOGIN_SUCCESS(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    LOGIN_FAILURE(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    LOGOUT(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    REGISTER_SUCCESS(state) {
      state.status.loggedIn = false;
    },
    REGISTER_FAILURE(state) {
      state.status.loggedIn = false;
    }
  }
};

export default AuthModule