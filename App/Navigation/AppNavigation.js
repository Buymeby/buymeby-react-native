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
import ProfileScreen from '../Containers/ProfileScreen'
import OrdersScreen from '../Containers/OrdersScreen'
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
      headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                    <Icon name="bars" size={20} style={{paddingLeft: 10}} />
                  </TouchableOpacity>
    })
  },
  VendorDetailsScreen: {
    screen: VendorDetailsScreen
  },
  ItemDetailsScreen: {
    screen: ItemDetailsScreen
  },
  CartScreen: {
    screen: CartScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: "Cart",
      headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DiscoveryScreen') }}>
                     <Icon name="home" size={20} style={{paddingRight: 10}} />
                   </TouchableOpacity>
    })
  }
}, {
  headerMode: 'float',
  initialRouteName: 'DiscoveryScreen',
  navigationOptions: ({navigation}) => ({
    gesturesEnabled: false,
    headerTitle: 'Buymeby',
    headerRight: <TouchableOpacity onPress={() => { navigation.navigate('CartScreen') }}>
                   <Icon name="shopping-cart" size={20} style={{paddingRight: 10}} />
                 </TouchableOpacity>
  })
})

const OrdersStack = StackNavigator({
  OrdersScreen: { screen: OrdersScreen }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerTitle: "Orders",
    headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                  <Icon name="bars" size={20} style={{paddingLeft: 10}} />
                </TouchableOpacity>
  })
})

const ProfileStack = StackNavigator({
  ProfileScreen: { screen: ProfileScreen }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerTitle: "Profile",
    headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                  <Icon name="bars" size={20} style={{paddingLeft: 10}} />
                </TouchableOpacity>
  })
})

const DrawerNav = DrawerNavigator({
  PrimaryNav: { screen: PrimaryNav, navigationOptions: {title: 'Discover'}},
  Profile: { screen: ProfileStack, navigationOptions: {title: 'Profile'} },
  Orders: { screen: OrdersStack, navigationOptions: {title: 'Orders'} }
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
