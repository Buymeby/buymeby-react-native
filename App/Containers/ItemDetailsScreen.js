import React, { Component } from 'react'
import { connect } from 'react-redux'
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
            <Button styleName="md-gutter-top"><Text>Add to Cart</Text></Button>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.nav.item
  }
}

const mapDispatchToProps = (dispatch) => ({
  openItemDetails: (item) => dispatch({ type: 'NavigateItem', item: item })
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsScreen)
