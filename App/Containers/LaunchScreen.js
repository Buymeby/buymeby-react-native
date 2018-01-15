import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'
import LoginForm from '../Components/LoginForm.js'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  handleLoginSubmit = (values) => {
    this.props.login(values)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <LoginForm onSubmit={this.handleLoginSubmit} />
          <Text style={styles.sectionText}>
          {`
Not a member? Register Here
or
Continue without logging in
          `}</Text>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  login: (_) => {
    dispatch(AuthActions.loginRequest(_.email, _.password))
  },
  register: (_) => {
    dispatch(AuthActions.registrationRequest(_.email, _.password, _.password_confirmation))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
