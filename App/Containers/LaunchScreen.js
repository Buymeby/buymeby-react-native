import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import VendorLocator from '../Components/VendorLocator.js'
import VendorList from '../Components/VendorList.js'

// For API
import API from '../Services/Api'
import FJSON from 'format-json'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <VendorLocator />
          <VendorList />
          <DevscreensButton />
        </ScrollView>
      </View>
    )
  }
}
