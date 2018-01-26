import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartActions from '../Redux/CartRedux'
import {
  Screen,
  ScrollView,
  GridRow,
  TouchableOpacity,
  Image,
  Title,
  Subtitle,
  Card,
  View,
  Caption,
  ListView,
  Tile,
  Button,
  Heading,
  Text
} from '@shoutem/ui';

// Styles
import styles from './Styles/LaunchScreenStyles'

class ItemDetailsScreen extends Component {
  render () {
    const item = this.props.item
    const vendor = this.props.vendor

    return (
      <View>
        <ScrollView>
          <Image
            styleName="featured"
            source={{ uri: item.image_src }}
            >
            <Tile>
              <Title>{item.name}</Title>
              <Subtitle styleName="line-through sm-gutter-top">${item.price}</Subtitle>
              <Heading>${item.price}</Heading>
            </Tile>
          </Image>
          <View styleName="content">
            <Title>{item.description}</Title>
            <View styleName="horizontal space-between">
              <Caption>{item.category}</Caption>
              <Caption>{item.quantity} available</Caption>
            </View>
            <Button styleName="md-gutter-top" onPress={this.props.addToCart.bind(this, vendor.id, item.id)}><Text>Add to Cart</Text></Button>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.nav.item,
    vendor: state.nav.vendor
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (vendor_id, item_id) => dispatch(CartActions.add(vendor_id, item_id, 2))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsScreen)
