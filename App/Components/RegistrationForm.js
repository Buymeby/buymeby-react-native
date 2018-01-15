import React from 'react'
import { View } from 'react-native'
import { Field, reduxForm } from 'redux-form';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import RoundedButton from './RoundedButton'

const renderInput = ({ input: { onChange, ...restInput }}) => {
  return <FormInput onChangeText={onChange} {...restInput} />
}

const renderSecureInput = ({ input: { onChange, ...restInput }}) => {
  return <FormInput onChangeText={onChange} secureTextEntry={true} {...restInput} />
}

class RegistrationForm extends React.Component {
  render () {
    const { handleSubmit } = this.props;
    return (
      <View>
        <FormLabel>E-mail</FormLabel>
        <Field name="email" component={renderInput} />
        <FormLabel>Password</FormLabel>
        <Field name="password" component={renderSecureInput} />
        <FormLabel>Confirm Password</FormLabel>
        <Field name="password_confirmation" component={renderSecureInput} />

        <RoundedButton text={'Register'} onPress={handleSubmit} styles={{marginTop: 10}} />
      </View>
    )
  }
}

RegistrationForm = reduxForm({
  form: 'login'
})(RegistrationForm);

export default RegistrationForm;
