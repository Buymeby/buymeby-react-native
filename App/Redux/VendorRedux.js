import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  vendorRequest: ['data'],
  vendorSuccess: ['vendor'],
  vendorFailure: null
})

export const VendorTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  selected_vendor: {
    items: []
  },
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { vendor } = action
  return state.merge({ fetching: false, error: null, selected_vendor: vendor })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VENDOR_REQUEST]: request,
  [Types.VENDOR_SUCCESS]: success,
  [Types.VENDOR_FAILURE]: failure
})
