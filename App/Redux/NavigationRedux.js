import AppNavigation from '../Navigation/AppNavigation'
import { NavigationActions } from 'react-navigation'

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
    return newState
  }
  return state
}
