import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import CartActions from '../Redux/CartRedux'
import CartItemList from '../Components/CartItemList'
import { connect } from 'react-redux'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

class CartScreen extends Component {
  componentWillMount () {
    this.props.populateCart()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <CartItemList />
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  populateCart: () => dispatch(CartActions.populate())
})

export default connect(null, mapDispatchToProps)(CartScreen)
