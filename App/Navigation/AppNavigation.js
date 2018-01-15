import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import DiscoveryScreen from '../Containers/DiscoveryScreen'
import VendorDetailsScreen from '../Containers/VendorDetailsScreen'

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
  VendorDetailsScreen: { screen: VendorDetailsScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
