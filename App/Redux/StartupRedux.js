import { createReducer, createActions } from 'reduxsauce'
import { calculateRegion } from '../Lib/MapHelpers'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
  startupSuccess: ['vendors'],
  startupFailure: null
})

export const StartupTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  longitude: null,
  latitude: null,
  vendors: [],
  startup_complete: false,
  error: null,
  locations: [],
  region: {}
})

export const startup = (state) => {
  return state.merge({ startup_complete: false })
}

export const success = (state, action) => {
  console.tron.log(action)
  const { vendors } = action
  const locations = vendors.map(v => ({
    title: v.name,
    latitude: Number(v.latitude),
    longitude: Number(v.longitude)
  }))
  const region = calculateRegion(locations, { latPadding: 0.1, longPadding: 0.1 })

  return state.merge({ startup_complete: true, error: null, vendors, locations, region })
}

export const failure = (state) => {
  return state.merge({ startup_complete: true, error: true, vendors: null })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,
  [Types.STARTUP_SUCCESS]: success,
  [Types.STARTUP_FAILURE]: failure
})
