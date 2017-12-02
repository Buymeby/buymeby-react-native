import AppNavigation from '../Navigation/AppNavigation'
import { NavigationActions } from 'react-navigation'

export const reducer = (state, action) => {
  console.tron.log(action)
  let newState
  switch (action.type) {
    case 'SelectVendor':
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'VendorDetailsScreen'}),
        state
      )
      break
    default:
      newState = AppNavigation.router.getStateForAction(action, state)
      break
  }

  return newState || state
}
