import { createReducer, createActions } from 'reduxsauce'
import { calculateRegion } from '../Lib/MapHelpers'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  vendorRequest: ['data'],
  vendorSuccess: ['vendor'],
  vendorFailure: null,
  vendorListRequest: null,
  vendorListSuccess: ['vendors'],
  vendorListFailure: null
})

export const VendorTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  selected_vendor: {
    hours: [],
    items: []
  },
  vendors: [],
  longitude: null,
  latitude: null,
  locations: [],
  region: null,
  error: null
})

/* ------------- Reducers ------------- */

export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

export const success = (state, action) => {
  const { vendor } = action
  return state.merge({ fetching: false, error: null, selected_vendor: vendor })
}

export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const listRequest = (state) =>
  state.merge({ fetching: true })

export const listSuccess = (state, action) => {
  const { vendors } = action
  const locations = vendors.map(v => ({
    title: v.name,
    latitude: Number(v.latitude),
    longitude: Number(v.longitude)
  }))
  const region = calculateRegion(locations, { latPadding: 0.1, longPadding: 0.1 })

  return state.merge({ fetching: false, error: null, vendors, locations, region })
}

export const listFailure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VENDOR_REQUEST]: request,
  [Types.VENDOR_SUCCESS]: success,
  [Types.VENDOR_FAILURE]: failure,
  [Types.VENDOR_LIST_REQUEST]: listRequest,
  [Types.VENDOR_LIST_SUCCESS]: listSuccess,
  [Types.VENDOR_LIST_FAILURE]: listFailure
})
