import { call, put } from 'redux-saga/effects'
import CartActions from '../Redux/CartRedux'
import { AsyncStorage } from 'react-native'
import _ from 'lodash'

// Cart object looks as follow:
//   {
//     vendor_id: {
//       item_id: quantity,
//       item_id_2: quantity_2,
//       ...
//     },
//     vendor_id_2: {
//       item_id_3: quantity_3,
//       item_id_4: quantity_4,
//       ...
//     },
//     ...
//   }

export function * initializeCart (action) {
  cart = JSON.parse(yield call([AsyncStorage, 'getItem'], 'cart'))

  if (!cart) {
    cart = {}
    yield call([AsyncStorage, 'setItem'], 'cart', JSON.stringify(cart))
  }

  cart_count = countCartItems(cart)
  console.tron.log(cart_count)
  if (Number.isInteger(cart_count) && cart_count >= 0) {
    yield put(CartActions.initializeSuccess(cart, cart_count))
  }
  else {
    yield put(CartActions.initializeFailure())
  }
}

const countCartItems = (cart) => {
  return _.reduce(cart, function(count, vendor_items, vendor_id) {
    return count += _.reduce(vendor_items, function(count, quantity, item_id) {
      return count += quantity
    }, 0)
  }, 0)
}
