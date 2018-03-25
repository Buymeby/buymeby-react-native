import React from 'react'

import { Text, Animated, Easing, TouchableOpacity } from 'react-native'
import { StackNavigator, DrawerNavigator, TabNavigator, TabBarTop } from 'react-navigation'
import SplashScreen from '../Containers/SplashScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import LoginScreen from '../Containers/LoginScreen'
import DiscoveryScreen from '../Containers/DiscoveryScreen'
import CartScreen from '../Containers/CartScreen'
import VendorDetailsScreen from '../Containers/VendorDetailsScreen'
import VendorStoreScreen from '../Containers/VendorStoreScreen'
import ItemDetailsScreen from '../Containers/ItemDetailsScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import OrdersScreen from '../Containers/OrdersScreen'
import OrderDetailsScreen from '../Containers/OrderDetailsScreen'
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

const VendorTab = TabNavigator({
  VendorDetailsScreen: {
    screen: VendorDetailsScreen,
    navigationOptions: {
      title: 'Profile'
    }
  },
  VendorStoreScreen: {
    screen: VendorStoreScreen,
    navigationOptions: {
      title: 'Shop'
    }
  }
}, {
  initialRouteName: 'VendorDetailsScreen',
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  lazy: false,
  tabBarOptions: {
    style:{
      backgroundColor: '#d3d3d3',
    }
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
  VendorTab: {
    screen: VendorTab
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
  lazy: true,
  navigationOptions: ({navigation}) => ({
    gesturesEnabled: false,
    headerRight: <TouchableOpacity onPress={() => { navigation.navigate('CartScreen') }}>
                   <Icon name="shopping-cart" size={20} style={{paddingRight: 10}} />
                 </TouchableOpacity>
  })
})

const OrdersStack = StackNavigator({
  OrdersScreen: {
    screen: OrdersScreen,
    navigationOptions: ({navigation}) => ({
    headerTitle: "Orders",
    headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                  <Icon name="bars" size={20} style={{paddingLeft: 10}} />
                </TouchableOpacity>
    })
  },
  OrderDetailsScreen: { screen: OrderDetailsScreen }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    gesturesEnabled: false,
    headerTitle: 'Buymeby',
    headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DrawerNav') }}>
                   <Icon name="home" size={20} style={{paddingRight: 10}} />
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
  Orders: { screen: OrdersStack, navigationOptions: {title: 'Orders'} },
  // Register: { screen: RegistrationScreen, navigationOptions: {title: 'Register'} },
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
