import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import ItemList from '../Components/ItemList.js'

// Styles
import styles from './Styles/ScreenStyles'

export default class VendorDetailsScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <ItemList />
        </ScrollView>
      </View>
    )
  }
}
