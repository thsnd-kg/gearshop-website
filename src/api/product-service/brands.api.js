import { $http } from '@/plugins/http-wrapper'

const BASE_URL = 'product-service/brands'

export const fetchBrands = async () => {
  return await $http.get(BASE_URL, {
    onlyActive: true,
  });
}