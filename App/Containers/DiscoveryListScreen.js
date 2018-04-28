import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import VendorActions from '../Redux/VendorRedux'
import VendorLocator from '../Components/VendorLocator'
import VendorList from '../Components/VendorList'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/ScreenStyles'

class DiscoveryListScreen extends Component {
  componentWillMount() {
    this.props.getVendorList()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <VendorList />
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getVendorList: () => dispatch(VendorActions.vendorListRequest())
})

export default connect(null, mapDispatchToProps)(DiscoveryListScreen)
