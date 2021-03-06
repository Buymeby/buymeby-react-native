import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  initialize: null,
  initializeSuccess: ['cart', 'cart_count'],
  initializeFailure: null,
  add: ['vendor_id', 'item_id', 'quantity'],
  addSuccess: ['cart', 'cart_count'],
  addFailure: null,
  remove: ['vendor_id', 'item_id'],
  removeSuccess: ['cart', 'cart_count'],
  removeFailure: null,
  clear: null,
  clearSuccess: ['cart', 'cart_count'],
  clearFailure: null,
  populate: null,
  populateSuccess: ['populated_cart'],
  populateFailure: null,
  order: null,
  orderSuccess: null,
  orderFailure: null,
  emptyCart: false
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  cart: null,
  cart_count: null,
  performing: false,
  error: false,
  populated_cart: null
})

/* ------------- Reducers ------------- */

export const initialize = (state, action) =>
  state.merge({ performing: true })

export const initializeSuccess = (state, action) => {
  const { cart, cart_count } = action
  return state.merge({ fetching: false, error: null, cart, cart_count, emptyCart: cart_count == 0 })
}

export const initializeFailure = (state) =>
  state.merge({ performing: false, error: true })

export const add = (state, action) =>
  state.merge({ performing: true })

export const addSuccess = (state, action) => {
  const { cart, cart_count } = action
  return state.merge({ fetching: false, error: null, cart, cart_count, emptyCart: false })
}

export const addFailure = (state) =>
  state.merge({ performing: false, error: true })

export const remove = (state, action) =>
  state.merge({ performing: true })

export const removeSuccess = (state, action) => {
  const { cart, cart_count } = action
  return state.merge({ fetching: false, error: null, cart, cart_count })
}

export const removeFailure = (state) =>
  state.merge({ performing: false, error: true })

export const clear = (state, action) =>
  state.merge({ performing: true })

export const clearSuccess = (state, action) => {
  const { cart, cart_count } = action
  return state.merge({ fetching: false, error: null, cart, cart_count, populated_cart: null, empyuCart: true })
}

export const clearFailure = (state) =>
  state.merge({ performing: false, error: true })

export const populate = (state, action) =>
  state.merge({ performing: true })

export const populateSuccess = (state, action) => {
  const { populated_cart } = action
  return state.merge({ fetching: false, error: null, populated_cart, emptyCart: false })
}

export const populateFailure = (state) =>
  state.merge({ performing: false, error: true })

export const order = (state, action) =>
  state.merge({ performing: true })

export const orderSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null})
}

export const orderFailure = (state) =>
  state.merge({ performing: false, error: true })


export const emptyCart = (state) =>
  state.merge({ performing: false, emptyCart: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INITIALIZE]: initialize,
  [Types.INITIALIZE_SUCCESS]: initializeSuccess,
  [Types.INITIALIZE_FAILURE]: initializeFailure,
  [Types.ADD]: add,
  [Types.ADD_SUCCESS]: addSuccess,
  [Types.ADD_FAILURE]: addFailure,
  [Types.REMOVE]: remove,
  [Types.REMOVE_SUCCESS]: removeSuccess,
  [Types.REMOVE_FAILURE]: removeFailure,
  [Types.CLEAR]: clear,
  [Types.CLEAR_SUCCESS]: clearSuccess,
  [Types.CLEAR_FAILURE]: clearFailure,
  [Types.POPULATE]: populate,
  [Types.POPULATE_SUCCESS]: populateSuccess,
  [Types.POPULATE_FAILURE]: populateFailure,
  [Types.ORDER]: order,
  [Types.ORDER_SUCCESS]: orderSuccess,
  [Types.ORDER_FAILURE]: orderFailure,
  [Types.EMPTY_CART]: emptyCart
})
