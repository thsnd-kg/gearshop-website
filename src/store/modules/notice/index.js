import * as TYPES from './types';
import * as getters from './getters';
import * as actions from './actions';

const DEFAULT_SNACKBAR_MSG = {
  show:  false,
  color: '',
  text:  ''
};

const getInitialState = () => ({
  loading:  false,
  snackbar: { ...DEFAULT_SNACKBAR_MSG }
});

const MSG_TYPE_COLORS = {
  error:   'red',
  success: 'success',
  warning: 'orange'
};

const showMsg = (state, { type, message }) => {
  state.snackbar = {
    show:  true,
    text:  message,
    color: MSG_TYPE_COLORS[type]
  };
};

const mutations = {

  [TYPES.UPDATE_LOADING_STATE]: (state, loading = false) => {
    state.loading = loading;
  },

  [TYPES.SHOW_SUCCESS_MSG](state, message) {
    showMsg(state, { type: 'success', message });
  },

  [TYPES.SHOW_ERROR_MSG](state, message) {
    showMsg(state, { type: 'error', message });
  },

  [TYPES.SHOW_WARNING_MSG](state, message) {
    showMsg(state, { type: 'warning', message });
  },

  [TYPES.RESET_SNACKBAR_MSG](state) {
    state.snackbar = { ...DEFAULT_SNACKBAR_MSG };
  }

};

export default {
  namespaced: true,
  state:      getInitialState(),
  getters,
  actions,
  mutations
};
