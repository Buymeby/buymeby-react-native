import React, { Component } from 'react'
import CartActions from '../Redux/CartRedux'
import CartItemList from '../Components/CartItemList'
import { connect } from 'react-redux'
import { View, Button, Divider, ScrollView, Text } from '@shoutem/ui'

class CartScreen extends Component {
  componentWillMount () {
    this.props.populateCart()
  }

  render () {
    return (
      <View>
        <ScrollView>
          <CartItemList />
          <Divider styleName="line" />
          <Button onPress={this.props.clearCart.bind(this)}>
            <Text>Clear Cart</Text>
          </Button>
          <Divider styleName="line" />
          <Button onPress={this.props.placeOrder.bind(this)}>
            <Text>Reserve Items</Text>
          </Button>
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
