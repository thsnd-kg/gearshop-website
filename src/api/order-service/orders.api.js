import { $http } from '@/plugins/http-wrapper'

const BASE_URL = 'order-service/orders'

export const fetchMyOrders = async () => {
  return await $http.get(`${ BASE_URL }/user`)
}

export const addProductToOrder = async (payload) => {
  return await $http.post(`${ BASE_URL }/add-item`, payload)
}

export const removeProductInOrder = async (payload) => {
  return await $http.post(`${ BASE_URL }/remove-item`, payload)
}

export const addVoucher = async (payload) => {
  return await $http.post(`${ BASE_URL }/add-voucher`, payload)
}

export const removeVoucher = async () => {
  return await $http.post(`${ BASE_URL }/remove-voucher`)
}

export const fetchMyCart = async () => {
  return await $http.get(`${ BASE_URL }/cart`)
}


export const updateInfoCheckout = async (payload) => {
  return await $http.post(`${ BASE_URL }/user/checkout/info`, payload)
}

export const fetchCheckout = async () => {
  return await $http.get(`${ BASE_URL }/user/checkout`)
}

export const checkoutOrderByNoneAccount = async (payload) => {
  return await $http.post(`${BASE_URL}/user/checkout/none-account`, payload)
}