import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registrationRequest: ['email', 'password', 'password_confirmation'],
  registrationSuccess: ['user'],
  registrationFailure: null,
  loginRequest: ['email', 'password'],
  loginSuccess: ['user'],
  loginFailure: null,
  tokenRequest: null,
  tokenSuccess: ['user'],
  tokenFailure: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  current_user: {
    isSignedIn: false,
    isLoading: false,
    hasVerificationBeenAttempted: false,
    attributes: {}
  },
  authenticating: false,
  authentication_failed: null,
  registering: false,
  registration_failed: null,
  verifying_token: false,
  token_verification_failed: null
})

/* ------------- Reducers ------------- */

export const registrationRequest = (state, { data }) =>
  state.merge({ registering: true })

export const registrationSuccess = (state, action) => {
  const { user } = action
  return state.merge({ registering: false, registration_failed: null, current_user: user.data })
}

export const registrationFailure = state =>
  state.merge({ registering: false, registration_failed: true })

export const loginRequest = (state, { data }) =>
  state.merge({ authenticating: true })

export const loginSuccess = (state, action) => {
  const { user } = action
  return state.merge({ authenticating: false, authentication_failed: null, current_user: user.data })
}

export const loginFailure = state =>
  state.merge({ registering: false, registration_failed: true })

export const tokenRequest = state =>
  state.merge({ verifying_token: true })

export const tokenSuccess = (state, action) => {
  const { user } = action
  return state.merge({ verifying_token: false, token_verification_failed: null, current_user: user.data })
}

export const tokenFailure = state =>
  state.merge({ verifying_token: true, token_verification_failed: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTRATION_REQUEST]: registrationRequest,
  [Types.REGISTRATION_SUCCESS]: registrationSuccess,
  [Types.REGISTRATION_FAILURE]: registrationFailure,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.TOKEN_REQUEST]: tokenRequest,
  [Types.TOKEN_SUCCESS]: tokenSuccess,
  [Types.TOKEN_FAILURE]: tokenFailure
})
