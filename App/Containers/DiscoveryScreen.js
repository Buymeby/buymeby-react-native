import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import VendorLocator from '../Components/VendorLocator.js'
import VendorList from '../Components/VendorList.js'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class DiscoveryScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <VendorLocator />
          <VendorList />
        </ScrollView>
      </View>
    )
  }
}
