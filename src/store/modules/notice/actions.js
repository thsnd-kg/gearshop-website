import * as TYPES from './types';

export const setReady = ({ commit }, isReady = true) => {
  commit(TYPES.UPDATE_READY_STATE, isReady);
};

export const setLoading = ({ commit }, loading = false) => {
  commit(TYPES.UPDATE_LOADING_STATE, loading);
};

export const resetMsg = ({ commit }) => commit(TYPES.RESET_SNACKBAR_MSG);

export const showSuccessMsg = ({ commit }, msg) => {
  commit(TYPES.SHOW_SUCCESS_MSG, msg);
};

export const showWarningMsg = ({ commit }, msg) => {
  commit(TYPES.SHOW_WARNING_MSG, msg);
};

export const showErrorMsg = ({ commit }, msg) => {
  commit(TYPES.SHOW_ERROR_MSG, msg);
};