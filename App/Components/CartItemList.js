import React from 'react'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import CartActions from '../Redux/CartRedux'
import {
  Screen,
  ScrollView,
  GridRow,
  TouchableOpacity,
  Image,
  Subtitle,
  Card,
  View,
  Caption,
  Row,
  Button,
  Icon,
  Title
} from '@shoutem/ui';


class CartItemList extends React.Component {

  render () {
    const populated_cart = this.props.populated_cart;
    const cart = this.props.cart;
    if (!populated_cart) {
      return null;
    }

    return (
      populated_cart.map((vendor, i) => (
        <View key={vendor.id}>
          <Row styleName="small">
            <Title>{vendor.name}</Title>
            <Icon styleName="disclosure" name="right-arrow" />
          </Row>
            {
              vendor.items.map((item, j) => (
                <Row key={vendor.id + '-' + item.id}>
                  <Image
                    styleName="small rounded-corners"
                    source={{ uri: item.image_src }}
                  />
                  <View styleName="vertical stretch space-between">
                    <Subtitle>{item.name} | qty: {cart[vendor.id][item.id]}</Subtitle>
                    <View styleName="horizontal">
                      <Subtitle styleName="md-gutter-right">${item.price}</Subtitle>
                      <Caption styleName="line-through">${item.price}</Caption>
                    </View>
                  </View>
                  <Button styleName="right-icon" onPress={this.props.removeFromCart.bind(this, vendor.id, item.id)}><Icon name="close"/></Button>
                </Row>
              ))
            }
        </View>
      ))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    populated_cart: state.cart.populated_cart,
    cart: state.cart.cart
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (vendor_id, item_id) => dispatch(CartActions.remove(vendor_id, item_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItemList)
