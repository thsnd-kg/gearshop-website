import { $http } from '@/plugins/http-wrapper'

const BASE_URL = 'product-service/categories'

export const fetchCategories = async () => {
  return await $http.get(BASE_URL, {
    onlyActive: true,
  });
}