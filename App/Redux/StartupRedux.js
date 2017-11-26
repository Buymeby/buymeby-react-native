import { createReducer, createActions } from 'reduxsauce'
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
  fetching: null,
  error: null
})

export const startup = (state) => {
  return state.merge({ fetching: true })
}

export const success = (state, action) => {
  const { vendors } = action
  return state.merge({ fetching: false, error: null, vendors })
}

export const failure = (state) => {
  return state.merge({ fetching: false, error: true, vendors: null })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,
  [Types.STARTUP_SUCCESS]: success,
  [Types.STARTUP_FAILURE]: failure
})
