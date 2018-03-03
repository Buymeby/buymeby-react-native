import { call, put } from 'redux-saga/effects'
import VendorActions from '../Redux/VendorRedux'
import { path } from 'ramda'

export function * getVendor (api, action) {
  const { vendor } = action
  // make the call to the api
  const response = yield call(api.getVendor, vendor)

  // success?
  if (response.ok) {
    yield put(VendorActions.vendorSuccess(response.data))
  } else {
    yield put(VendorActions.vendorFailure())
  }
}

export function * getVendorList (api) {

  const response = yield call(api.getVendors)

  if (response.ok) {
    const vendors = path(['data'], response)
    yield put(VendorActions.vendorListSuccess(vendors))
  } else {
    yield put(VendorACTIONS.vendorListFailure())
    return
  }
}
