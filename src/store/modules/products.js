import axios from 'axios';

const products = {
  namespaced: true,
  state: {
    products: [],
  },
  getters: {
    products: state => state.products
  },
  actions: {
    async getProducts() {
      const response = await axios.get('https://uit-gear-shop.herokuapp.com/api/products?onlyActive=true')
      console.log(response)
      this.products = response.data.content;
      return response.data.content;
    }
  },

};

export default products