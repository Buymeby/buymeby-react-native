import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/HeaderNavStyle'
import { Header } from 'react-native-elements'
import { connect } from 'react-redux'
import CartActions from '../Redux/CartRedux'

class HeaderNav extends Component {
  _onPressLeftIcon () {
    switch(this.props.icon) {
      case 'chevron-left':
        this.props.navigateBack()
        break
      default:
        break
    }
  }

  render () {
    return (
      <Header
        leftComponent={{
          icon: this.props.icon,
          color: '#fff',
          onPress: this._onPressLeftIcon.bind(this)
        }}
        centerComponent={{
          text: this.props.text,
          style: { color: '#fff' }
        }}
        rightComponent={{
          icon: 'shopping-cart',
          color: '#fff',
          onPress: () => this.props.getCartItems()
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    text: state.nav.headerText,
    icon: state.nav.icon
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigateBack: () => dispatch({ type: 'NavigateBack' }),
  getCartItems: () => dispatch(CartActions.populate())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav)
