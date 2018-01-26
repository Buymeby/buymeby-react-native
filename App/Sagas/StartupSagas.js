import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import CartActions from '../Redux/CartRedux'
import { path } from 'ramda'

export function * startup (api) {
  yield put(CartActions.initialize());
  yield put(AuthActions.tokenRequest());
}
