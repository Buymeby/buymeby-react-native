import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'
import LoginForm from '../Components/LoginForm.js'

// Styles
import styles from './Styles/ScreenStyles'

class LoginScreen extends Component {
  handleLoginSubmit = (values) => {
    this.props.register(values)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <RegistrationForm onSubmit={this.handleLoginSubmit} />
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
