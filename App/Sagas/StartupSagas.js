import { call, put } from 'redux-saga/effects'
import StartupActions from '../Redux/StartupRedux'
import { path } from 'ramda'

export function * startup (api) {

  const response = yield call(api.getVendors)

  if (response.ok) {

    console.tron.log(response)
    const vendors = path(['data'], response)
    yield put(StartupActions.startupSuccess(vendors))
  } else {
    yield put(StartupActions.startupFailure())
    return
  }
}
