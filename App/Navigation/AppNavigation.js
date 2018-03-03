import React from 'react'

import { Text, Animated, Easing, TouchableOpacity } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import SplashScreen from '../Containers/SplashScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import LoginScreen from '../Containers/LoginScreen'
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

const PrimaryNav = StackNavigator({
  DiscoveryScreen: {
    screen: DiscoveryScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: "Buymeby",
      headerLeft: <TouchableOpacity onPress={() => { console.tron.log(navigation); navigation.navigate('DrawerToggle') }}>
                    <Icon name="bars" size={20} style={{paddingLeft: 10}} />
                  </TouchableOpacity>
    })
  },
  VendorDetailsScreen: {
    screen: VendorDetailsScreen,
    navigationOptions: ({navigation}) => ({
    })
  },
  ItemDetailsScreen: {
    screen: ItemDetailsScreen
  },
  CartScreen: { screen: CartScreen }
}, {
  headerMode: 'float',
  initialRouteName: 'DiscoveryScreen',
  navigationOptions: ({navigation}) => ({
    gesturesEnabled: false,
    headerTitle: 'Buymeby',
    headerRight: <TouchableOpacity onPress={() => { console.tron.log(navigation); navigation.navigate('CartScreen') }}>
                   <Icon name="shopping-cart" size={20} style={{paddingRight: 10}} />
                 </TouchableOpacity>
  })
})

const DrawerNav = DrawerNavigator({
  PrimaryNav: { screen: PrimaryNav },
  screen2: { screen: CartScreen },
  screen3: { screen: RegistrationScreen },
}, {
  gesturesEnabled: false
})

const RootNav = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  RegistrationScreen: { screen: RegistrationScreen },
  LoginScreen: { screen: LoginScreen },
  DrawerNav: { screen: DrawerNav }
}, {
  // Default config for all screens
  headerMode: 'none',
  transitionConfig: noTransitionConfig
})

export default RootNav
