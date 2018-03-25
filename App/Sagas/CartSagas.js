import { call, put } from 'redux-saga/effects'
import CartActions from '../Redux/CartRedux'
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from 'react-native'
import _ from 'lodash'

// Cart looks as follow:
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
  if (Number.isInteger(cart_count) && cart_count >= 0) {
    yield put(CartActions.initializeSuccess(cart, cart_count))
  }
  else {
    yield put(CartActions.initializeFailure())
  }
}

export function * populateCart (api, action) {
  cart = JSON.parse(yield call([AsyncStorage, 'getItem'], 'cart'))

  if (!cart) {
    yield put(CartActions.initialize())
  } else if (_.isEmpty(cart)) {
    yield put(CartActions.emptyCart())
  }

  const response = yield call(api.populateCart, cart)

  if (response.ok) {
    const populated_cart = JSON.parse(response.data.populated_cart)
    yield put(CartActions.populateSuccess(populated_cart))
  } else {
    yield put(CartActions.populateFailure())
  }
}

export function * addToCart (action) {
  const { vendor_id, item_id, quantity } = action

  let initial_cart = JSON.parse(yield call([AsyncStorage, 'getItem'], 'cart'))

  if (!initial_cart) {
    yield put(CartActions.initialize())
  }

  let initial_cart_count = countCartItems(initial_cart)

  if (!initial_cart[vendor_id]) {
    initial_cart[vendor_id] = {}
  }

  if (!initial_cart[vendor_id][item_id]) {
    initial_cart[vendor_id][item_id] = quantity
  } else {
    initial_cart[vendor_id][item_id] += quantity
  }

  yield call([AsyncStorage, 'setItem'], 'cart', JSON.stringify(initial_cart))
  let updated_cart = JSON.parse(yield call([AsyncStorage, 'getItem'], 'cart'))
  let updated_cart_count = countCartItems(updated_cart)

  if (initial_cart_count + quantity == updated_cart_count) {
    yield put(CartActions.addSuccess(updated_cart, updated_cart_count))
    yield put({ type: 'NavigateBack' })
  } else {
    yield put(CartActions.addFailure())
  }
}

export function * removeFromCart (action) {
  const { vendor_id, item_id } = action

  let initial_cart = JSON.parse(yield call([AsyncStorage, 'getItem'], 'cart'))

  if (!initial_cart) {
    yield put(CartActions.initialize())
  }

  let initial_cart_count = countCartItems(initial_cart)
  let quantity_to_remove = 0

  if (initial_cart_count > 0 && initial_cart[vendor_id][item_id]) {
    quantity_to_remove = initial_cart[vendor_id][item_id]
    delete initial_cart[vendor_id][item_id]
  }

  if (_.isEmpty(initial_cart[vendor_id])) {
    delete initial_cart[vendor_id]
  }

  yield call([AsyncStorage, 'setItem'], 'cart', JSON.stringify(initial_cart))
  let updated_cart = JSON.parse(yield call([AsyncStorage, 'getItem'], 'cart'))

  let updated_cart_count = countCartItems(updated_cart)

  if (initial_cart_count - quantity_to_remove == updated_cart_count) {
    yield put(CartActions.removeSuccess(cart, updated_cart_count))
    yield put(CartActions.populate())
  } else {
    yield put(CartActions.removeFailure())
  }
}

export function * clearCart (action) {
  yield call([AsyncStorage, 'setItem'], 'cart', JSON.stringify({}))
  let cart = JSON.parse(yield call([AsyncStorage, 'getItem'], 'cart'))

  let cart_count = countCartItems(cart)
  if (cart_count == 0) {
    yield put(CartActions.clearSuccess(cart, cart_count))
  }
  else {
    yield put(CartActions.clearFailure())
  }
}

export function * placeOrder (api, action) {
  cart = JSON.parse(yield call([AsyncStorage, 'getItem'], 'cart'))

  if (!cart) {
    yield put(CartActions.orderFailure())
  }

  const response = yield call(api.placeOrder, cart)

  if (response.ok) {
    yield put(CartActions.orderSuccess())
    yield put(CartActions.clear())
    yield put(NavigationActions.navigate({ routeName: 'OrdersScreen' }))
  } else {
    yield put(CartActions.orderFailure())
  }
}

const countCartItems = (cart) => {
  return _.reduce(cart, function(count, vendor_items, vendor_id) {
    return count += _.reduce(vendor_items, function(count, quantity, item_id) {
      return count += quantity
    }, 0)
  }, 0)
}
