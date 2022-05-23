import store from '../store/index';

class Notification {
  constructor(options) {
    this._options = options;
  }

  success(msg) {
    store.dispatch('notice/showSuccessMsg', msg, { root: true });
  }

  warning(msg) {
    store.dispatch('notice/showWarningMsg', msg, { root: true });
  }

  error(msg) {
    store.dispatch('notice/showErrorMsg', msg, { root: true });
  }
}

export default new Notification();