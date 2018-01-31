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
  startup_complete: false,
  error: null
})

export const startup = (state) => {
  return state.merge({ startup_complete: false })
}

export const success = (state, action) => {
  return state.merge({ startup_complete: true, error: null })
}

export const failure = (state) => {
  return state.merge({ startup_complete: true, error: true, vendors: null })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,
  [Types.STARTUP_SUCCESS]: success,
  [Types.STARTUP_FAILURE]: failure
})
