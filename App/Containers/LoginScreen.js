import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'
import LoginForm from '../Components/LoginForm.js'

// Styles
import styles from './Styles/ScreenStyles'

class LoginScreen extends Component {
  handleLoginSubmit = (values) => {
    this.props.login(values)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <LoginForm onSubmit={this.handleLoginSubmit} />
          <TouchableOpacity onPress={this.props.openRegistrationScreen.bind(this)}>
            <Text style={styles.sectionText}>Not a member? Register Here</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  openRegistrationScreen: () => dispatch({ type: 'NavigateRegistration' }),
  login: (_) => {
    dispatch(AuthActions.loginRequest(_.email, _.password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
