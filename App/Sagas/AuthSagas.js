import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import StartupActions from '../Redux/StartupRedux'
import { AsyncStorage } from 'react-native'

const authHeaderKeys: Array<string> = [
  'access-token',
  'token-type',
  'client',
  'expiry',
  'uid',
]

export function * verifyToken (api, action) {
  if (AsyncStorage.getItem('access-token')) {
    const tokenParams = {
      'access-token': yield call([AsyncStorage, 'getItem'], 'access-token'),
      'client': yield call([AsyncStorage, 'getItem'], 'client'),
      'uid': yield call([AsyncStorage, 'getItem'], 'uid')
    }
    const response = yield call(api.verifyToken, tokenParams)

    if (response.ok) {
      setAuthHeaders(response.headers, api)
      persistAuthHeadersInDeviceStorage(response.headers)
      yield put(StartupActions.startupSuccess(response.data))
      yield put(AuthActions.tokenSuccess(response.data))
      yield put({ type: 'NavigateDiscovery' })
    } else {
      yield put(AuthActions.tokenFailure())
    }
  } else {
    yield put(AuthActions.tokenFailure())
  }
}

export function * login (api, action) {
  const {
    email,
    password
  } = action
  const data = {
    email,
    password
  }

  const response = yield call(api.loginUser, data)

  if (response.ok) {
    setAuthHeaders(response.headers, api)
    persistAuthHeadersInDeviceStorage(response.headers)
    yield put(AuthActions.loginSuccess(response.data))
    yield put({ type: 'NavigateDiscovery' })
  } else {
    yield put(AuthActions.loginFailure())
  }
}

export function * register (api, action) {
  const {
    email,
    password,
    password_confirmation
  } = action
  const data = {
    email,
    password,
    password_confirmation
  }

  // make the call to the api
  const response = yield call(api.registerUser, data)

  // success?
  if (response.ok) {
    setAuthHeaders(response.headers, api)
    persistAuthHeadersInDeviceStorage(response.headers)
    yield put(AuthActions.registrationSuccess(response.data))
    yield put({ type: 'NavigateDiscovery' })
  } else {
    yield put(AuthActions.registrationFailure())
  }
}

const setAuthHeaders = (headers, api) => {
  authHeaderKeys.forEach((key: string) => {
    api.config.setHeader(key, headers[key])
  })
}

const persistAuthHeadersInDeviceStorage = (headers) => {
  authHeaderKeys.forEach((key: string) => {
    AsyncStorage.setItem(key, headers[key])
  })
}

const deleteAuthHeaders = (): void => {
  authHeaderKeys.forEach((key: string) => {
    delete axios.defaults.headers.common[key]
  })
}

const deleteAuthHeadersFromDeviceStorage = async (Storage: DeviceStorage): Promise<void> => {
  authHeaderKeys.forEach((key: string) => {
    Storage.removeItem(key)
  })
}
