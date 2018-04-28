import apisauce from 'apisauce'

const create = (baseURL = 'http://10.0.2.2:3000/api/') => {
// const create = (baseURL = 'http://localhost:3000/api/') => {
// const create = (baseURL = 'https://buymeby-dev.cfapps.io/api/') => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  const getVendors = () => api.get('vendors')
  const getVendor = (vendor) => api.get('vendors/' + vendor.id)

  const getOrders = () => api.get('user_orders')
  const getOrder = (order) => api.get('user_orders/' + order.id)

  const populateCart = (cart) => api.post('populate_cart', cart)
  const placeOrder = (cart) => api.post('place_order', cart)

  const registerUser = (userAttributes) => api.post('auth', userAttributes)
  const loginUser = (credentials) => api.post('auth/sign_in', credentials)
  const verifyToken = (tokenParams) => api.get('auth/validate_token', tokenParams)

  const config = api
  return {
    getRoot,
    getRate,
    getUser,
    getVendors,
    getVendor,
    getOrders,
    getOrder,
    registerUser,
    loginUser,
    verifyToken,
    populateCart,
    placeOrder,
    config
  }
}

export default {
  create
}
