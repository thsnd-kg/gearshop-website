import { $http } from '@/plugins/http-wrapper'

const BASE_URL = 'product-service/website/products'

export const fetchProductByProductLink = async (productLink) => {
  return await $http.get(
    `${BASE_URL}/link/${productLink}`
  );
}

export const fetchProductsByCategoryLink = async (categoryLink) => {
  return await $http.get(
    `product-service/website/categories/link/${categoryLink}`
  );
}

export const fetchProductsByBrand = async (brand) => {
  return await $http.get(
    `product-service/website/brands/${brand}`
  );
}

