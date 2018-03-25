import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartActions from '../Redux/CartRedux'
import { Title, View, Button, Divider, ScrollView, Text, Row, Image, Subtitle, Caption } from '@shoutem/ui'

class OrderDetailsScreen extends Component {
  render () {
    const order_details = this.props.order_details;
    if (!order_details) {
      return null
    }

    return (
      <View>
        <ScrollView>
          {
            order_details.vendor_orders.map((vendor_order, i) => (
              <View key={vendor_order.id}>
                <Divider styleName="line" />
                <View>
                  <Row styleName="small">
                    <View styleName="horizontal space-between">
                      <Title>{vendor_order.name}</Title>
                      <Caption styleName="right">{vendor_order.status}</Caption>
                    </View>
                  </Row>
                    {
                      vendor_order.order_details.map((item, j) => (
                        <Row key={vendor_order.id + '-' + item.id}>
                          <Image
                            styleName="small rounded-corners"
                            source={{ uri: item.image_file_src }}
                          />
                          <View styleName="vertical stretch space-between">
                            <Subtitle>{item.name}</Subtitle>
                            <View styleName="horizontal">
                              <Subtitle styleName="md-gutter-right">${item.price}</Subtitle>
                              <Caption styleName="line-through md-gutter-right">${item.price}</Caption>
                            </View>
                            <View styleName="horizontal">
                              <Caption>Quantity: {item.quantity} | </Caption>
                              <Caption>Total: ${item.total_cost}</Caption>
                            </View>
                          </View>
                        </Row>
                      ))
                    }
                </View>
              </View>
            ))
          }
          <Divider styleName="line" />
          <Button onPress={this.props.completeOrder.bind(this)}>
            <Text>Complete Order</Text>
          </Button>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order_details: state.order.selected_order
  }
}

const mapDispatchToProps = (dispatch) => ({
  completeOrder: () => dispatch({ type: 'NavigateBack' })
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen)
