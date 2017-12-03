import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import VendorList from '../Components/VendorList.js'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class VendorDetailsScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <VendorList />
        </ScrollView>
      </View>
    )
  }
}
