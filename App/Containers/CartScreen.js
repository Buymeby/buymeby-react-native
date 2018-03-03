import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import CartActions from '../Redux/CartRedux'
import CartItemList from '../Components/CartItemList'
import { connect } from 'react-redux'
import { Button } from '@shoutem/ui'

// Styles
import styles from './Styles/ScreenStyles'

class CartScreen extends Component {
  componentWillMount () {
    this.props.populateCart()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View>
            <CartItemList />
            <Button onPress={this.props.clearCart.bind(this)}>
              <Text>Clear Cart</Text>
            </Button>
            <Button onPress={this.props.placeOrder.bind(this)}>
              <Text>Reserve Items</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  populateCart: () => dispatch(CartActions.populate()),
  clearCart: () => dispatch(CartActions.clear()),
  placeOrder: () => dispatch(CartActions.order())
})

export default connect(null, mapDispatchToProps)(CartScreen)
