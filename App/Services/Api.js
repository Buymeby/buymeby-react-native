import apisauce from 'apisauce'

const create = (baseURL = 'http://localhost:3000/api/') => {

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

  const populateCart = (cart) => api.post('populate_cart', cart)

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
    registerUser,
    loginUser,
    verifyToken,
    populateCart,
    config
  }
}

export default {
  create
}
