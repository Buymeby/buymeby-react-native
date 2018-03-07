import React, { Component } from 'react'
import OrderActions from '../Redux/OrderRedux'
import { connect } from 'react-redux'
import {
  Screen,
  Divider,
  ScrollView,
  GridRow,
  TouchableOpacity,
  Image,
  Icon,
  Subtitle,
  View,
  Caption,
  Row,
  Button,
  Title,
  Text
} from '@shoutem/ui';

class OrdersScreen extends Component {
  componentWillMount() {
    this.props.getOrderList()
  }

  render () {
    const orders = this.props.orders;
    if (!orders) {
      return null;
    }

    return (
      <View>
        <ScrollView>
        {
          orders.map((order) => (
            <TouchableOpacity key={order.id} onPress={this.props.openOrderDetails.bind(this, order)}>
              <Row>
                <Image
                  styleName="small rounded-corners"
                  source={{ uri: order.image_src || " " }}
                />
                <View styleName="vertical stretch space-between">
                  <Subtitle>{order.name}</Subtitle>
                  <Caption>Total: {order.total_description}</Caption>
                  <View styleName="horizontal">
                    <Caption>0.8 miles away | </Caption>
                    <Caption>{order.created_description}</Caption>
                  </View>
                </View>
                <Button styleName="right-icon">
                  <Icon name="right-arrow"/>
                </Button>
              </Row>
              <Divider styleName="line" />
            </TouchableOpacity>
          ))
        }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    navigation: state.nav
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOrderList: () => dispatch(OrderActions.orderListRequest()),
  openOrderDetails: (order) => dispatch({ type: 'NavigateOrder', order: order })
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen)
