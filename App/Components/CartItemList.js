import React from 'react'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
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
    if (!populated_cart) {
      return null;
    }

    return (
      populated_cart.map((vendor, i) => (
        <View>
          <Row styleName="small">
            <Title>{vendor.name}</Title>
            <Icon styleName="disclosure" name="right-arrow" />
          </Row>
            {
              vendor.items.map((item, j) => (
                <Row>
                  <Image
                    styleName="small rounded-corners"
                    source={{ uri: item.image_src }}
                  />
                  <View styleName="vertical stretch space-between">
                    <Subtitle>{item.name}</Subtitle>
                    <View styleName="horizontal">
                      <Subtitle styleName="md-gutter-right">${item.price}</Subtitle>
                      <Caption styleName="line-through">${item.price}</Caption>
                    </View>
                  </View>
                  <Button styleName="right-icon"><Icon name="close" /></Button>
                </Row>
              ))
            }
        </View>
      ))
    )
  }
}

const mapStateToProps = (state) => {
  console.tron.log(state)
  return {
    populated_cart: state.cart.populated_cart,
    cart: state.cart.cart
  }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItemList)
