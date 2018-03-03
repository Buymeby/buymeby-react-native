import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'
import RegistrationForm from '../Components/RegistrationForm.js'

// Styles
import styles from './Styles/ScreenStyles'

class RegistrationScreen extends Component {
  handleLoginSubmit = (values) => {
    this.props.register(values)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <RegistrationForm onSubmit={this.handleLoginSubmit} />
          <TouchableOpacity onPress={this.props.openLoginScreen.bind(this)}>
            <Text style={styles.sectionText}>Already a member? Login Here</Text>
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
  openLoginScreen: () => dispatch({ type: 'NavigateLogin' }),
  register: (_) => {
    dispatch(AuthActions.registrationRequest(_.email, _.password, _.password_confirmation))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
