import AppNavigation from '../Navigation/AppNavigation'
import { NavigationActions } from 'react-navigation'

const assignHeaderState = (state) => {
  let newScreen = state.routes[state.index].routeName
  let vendor = state.vendor
  switch(newScreen) {
    case 'LaunchScreen':
      return Object.assign(state, { headerText: 'Buymeby', icon: 'menu' })
    case 'VendorDetailsScreen':
      return Object.assign(state, { headerText: vendor.name, icon: 'chevron-left' })
    default:
      return Object.assign(state, { headerText: 'Buymeby', icon: 'menu' })
  }
}

export const reducer = (state, action) => {
  let newState
  switch (action.type) {
    case 'NavigateDiscovery':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'DiscoveryScreen'}),
        Object.assign(state, { vendor: action.vendor })
      )
      break
    case 'NavigateVendor':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'VendorDetailsScreen'}),
        Object.assign(state, { vendor: action.vendor })
      )
      break
    case 'NavigateBack':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.back(),
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
