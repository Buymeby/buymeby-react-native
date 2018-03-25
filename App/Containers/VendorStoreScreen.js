import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, View } from 'react-native'
import ItemList from '../Components/ItemList'
import {
  Subtitle,
} from '@shoutem/ui'

// Styles
import styles from './Styles/ScreenStyles'

export default class VendorStoreScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: <ConnectedHeaderTitle navigation={navigation} />
    };
  };

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

const HeaderTitle = ({ navigation, text }) => <Subtitle navigation={navigation}>{text}</Subtitle>;
const ConnectedHeaderTitle = connect(state => ({ text: state.vendor.selected_vendor.name }))(HeaderTitle);
