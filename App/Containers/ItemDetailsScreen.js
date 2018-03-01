import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartActions from '../Redux/CartRedux'
import {
  Screen,
  ScrollView,
  GridRow,
  TouchableOpacity,
  DropDownMenu,
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
  constructor(props) {
    super(props)
    this.state = {selectedQuantity: 1};
  }

  setQuantity(quantity) {
    this.setState({ selectedQuantity: quantity.value })
  }

  render () {
    const options = [
      {key: '1', value: 1},
      {key: '2', value: 2},
      {key: '3', value: 3},
      {key: '4', value: 4},
      {key: '5', value: 5},
      {key: '6', value: 6},
      {key: '7', value: 7},
      {key: '8', value: 8},
      {key: '9', value: 9}
    ]
    const item = this.props.item
    const vendor = this.props.vendor
    const selectedQuantity = options[this.state.selectedQuantity - 1]

    return (
      <View>
        <ScrollView>
          <Tile>
            <Image
              styleName="featured"
              source={{ uri: item.image_src }}
              >
            </Image>
          </Tile>
          <View styleName="content">
            <Tile>
              <Title>{item.name}</Title>
              <Caption styleName="md-gutter-top">{item.description}</Caption>
              <View styleName="horizontal sm-gutter-top">
                <Subtitle styleName="line-through sm-gutter-right">${item.price}</Subtitle>
                <Title>${item.price}</Title>
              </View>
              <DropDownMenu
                styleName="horizontal"
                options={options}
                selectedOption={selectedQuantity}
                onOptionSelected={(quantity) => this.setQuantity(quantity)}
                titleProperty="key"
                valueProperty="value"
              />
            </Tile>
            <Button onPress={this.props.addToCart.bind(this, vendor.id, item.id, selectedQuantity.value)}>
              <Text>Add to Cart</Text>
            </Button>
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
  addToCart: (vendor_id, item_id, quantity) => dispatch(CartActions.add(vendor_id, item_id, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsScreen)
