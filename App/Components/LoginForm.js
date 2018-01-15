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

class LoginForm extends React.Component {
  render () {
    const { handleSubmit } = this.props;
    return (
      <View>
        <FormLabel>E-mail</FormLabel>
        <Field name="email" component={renderInput} />
        <FormLabel>Password</FormLabel>
        <Field name="password" component={renderSecureInput} />

        <RoundedButton text={'Login'} onPress={handleSubmit} styles={{marginTop: 10}} />
      </View>
    )
  }
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginForm;
