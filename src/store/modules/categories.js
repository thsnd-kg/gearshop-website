import axios from 'axios';

const categories = {
  namespaced: true,
  state: {
     categories: [],
  },
  getters: {
    categories: state => state.categories
  },
  actions: {
    async getCategories() {
      const response = await axios.get('https://uit-gear-shop.herokuapp.com/api/categories?onlyActive=true')
      console.log(response)
      this.categories = response.content;
    }
  },

};

export default categories