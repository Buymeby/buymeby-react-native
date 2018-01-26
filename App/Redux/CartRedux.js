import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  initialize: null,
  initializeSuccess: ['cart', 'cart_count'],
  initializeFailure: null
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  cart: null,
  cart_count: null,
  accessing: false,
  error: false
})

/* ------------- Reducers ------------- */

export const initialize = (state, action) =>
  state.merge({ accessing: true })

export const initializeSuccess = (state, action) => {
  const { cart, cart_count } = action
  return state.merge({ fetching: false, error: null, cart, cart_count })
}

export const initializeFailure = (state) =>
  state.merge({ accessing: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INITIALIZE]: initialize,
  [Types.INITIALIZE_SUCCESS]: initializeSuccess,
  [Types.INITIALIZE_FAILURE]: initializeFailure
})
