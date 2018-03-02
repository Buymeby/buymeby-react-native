import React from 'react'

import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import DiscoveryScreen from '../Containers/DiscoveryScreen'
import CartScreen from '../Containers/CartScreen'
import VendorDetailsScreen from '../Containers/VendorDetailsScreen'
import ItemDetailsScreen from '../Containers/ItemDetailsScreen'
import DrawerContainer from '../Containers/DrawerContainer'
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './Styles/NavigationStyles'

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

const DrawerNav = DrawerNavigator({
  DiscoveryScreen: { screen: DiscoveryScreen },
  screen2: { screen: CartScreen },
  screen3: { screen: LaunchScreen },
}, {
  gesturesEnabled: false,
  contentComponent: (props) => <DrawerContainer {...props} />
})

const PrimaryNav = StackNavigator({
  DrawerNav: {
    screen: DrawerNav
  },
  LaunchScreen: {
    screen: LaunchScreen
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
  headerMode: 'float',
  title: 'Buymeby',
  initialRouteName: 'LaunchScreen',
  navigationOptions: ({navigation}) => ({
    gesturesEnabled: false,
    headerLeft: <Icon onPress={() => {
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }} name="bars" size={20} style={{paddingLeft: 5}}></Icon>
  })
})

const RootNav = StackNavigator({
  primaryNav: { screen: PrimaryNav}
}, {
  // Default config for all screens
  headerMode: 'none',
  transitionConfig: noTransitionConfig
})

export default PrimaryNav
