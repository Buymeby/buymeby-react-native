import AppNavigation from '../Navigation/AppNavigation'
import { NavigationActions } from 'react-navigation'

const assignHeaderState = (state) => {
  let newScreen = state.routes[state.index].routeName
  let vendor = state.vendor
  let item = state.item
  let order = state.order
  
  switch(newScreen) {
    case 'RegistrationScreen':
      return Object.assign(state, { headerText: 'Buymeby', icon: 'menu' })
    case 'VendorDetailsScreen':
      return Object.assign(state, { headerText: vendor.name, icon: 'chevron-left' })
    case 'ItemDetailsScreen':
      return Object.assign(state, { headerText: vendor.name, icon: 'chevron-left' })
    case 'CartScreen':
      return Object.assign(state, { headerText: 'Cart', icon: 'chevron-left' })
    default:
      return Object.assign(state, { headerText: 'Buymeby', icon: 'menu' })
  }
}

export const reducer = (state, action) => {
  let newState
  switch (action.type) {
    case 'NavigateRegistration':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'RegistrationScreen'}),
        state
      )
      break
    case 'NavigateLogin':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LoginScreen'}),
        state
      )
      break
    case 'NavigateDrawer':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'DrawerNav'}),
        state
      )
      break
  case 'NavigateDiscovery':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'DiscoveryScreen'}),
        state
      )
      break
    case 'NavigateCart':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'CartScreen'}),
        state
      )
      break
    case 'NavigateVendor':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'VendorDetailsScreen'}),
        Object.assign(state, { vendor: action.vendor })
      )
      break
    case 'NavigateItem':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ItemDetailsScreen'}),
        Object.assign(state, { item: action.item })
      )
      break
    case 'NavigateOrder':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'OrderDetailsScreen'}),
        Object.assign(state, { order: action.order })
      )
      break
    case 'NavigateBack':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.back(),
        state
      )
      break
    case 'Navigation/NAVIGATE':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName }),
        state
      )
      break
    default:
      newState = AppNavigation.router.getStateForAction(action, state)
      break
  }

  if (newState) {
    return assignHeaderState(newState)
  }
  return state
}
