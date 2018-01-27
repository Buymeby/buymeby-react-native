import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import DiscoveryScreen from '../Containers/DiscoveryScreen'
import CartScreen from '../Containers/CartScreen'
import VendorDetailsScreen from '../Containers/VendorDetailsScreen'
import ItemDetailsScreen from '../Containers/ItemDetailsScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: { title: 'Login'}
  },
  DiscoveryScreen: {
    screen: DiscoveryScreen,
    navigationOptions: { title: 'Buymeby'}
  },
  CartScreen: {
    screen: CartScreen,
    navigationOptions: { title: 'Cart' }
  },
  VendorDetailsScreen: { screen: VendorDetailsScreen },
  ItemDetailsScreen: { screen: ItemDetailsScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
