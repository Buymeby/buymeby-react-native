import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, StyleSheet, PixelRatio } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import getDirections from 'react-native-google-maps-directions'
import timeToHumanReadable from '../Lib/OperationalHoursHelper'
import {
  Heading,
  Tile,
  Text,
  Title,
  Subtitle,
  Caption,
  Icon,
  Overlay,
  Button,
  Row,
  Switch,
  Divider,
  TextInput,
  View
} from '@shoutem/ui'

class VendorDetailsScreen extends Component {
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: <ConnectedHeaderTitle navigation={navigation} />
    };
  };

  handleGetDirections = () => {
    const data = {
      destination: {
        latitude: Number(this.props.latitude),
        longitude: Number(this.props.longitude)
      },
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    }

    getDirections(data)
  }

  render () {
    let uri = this.props.image_src || this.props.logo_url;
    let image_source = uri ? {uri: uri} : require('../Images/logo_missing.png')
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior='position'>
          <Tile>
            <View styleName='center md-gutter-top'>
              <Image style={styles.avatar} source={image_source} />
            </View>
          </Tile>
          <Row>
            <Text>{this.props.description}</Text>
          </Row>
          <Divider styleName='line' />
          <TouchableOpacity onPress={this.handleGetDirections}>
            <Row>
              <View>
                <Subtitle styleName="sm-gutter-bottom">Address</Subtitle>
                <Text>{this.props.address}</Text>
              </View>
              <Icon styleName="disclosure" name="right-arrow" />
            </Row>
          </TouchableOpacity>
          <Divider styleName='line' />
          <Row>
            <View>
              <Subtitle styleName="sm-gutter-bottom">Hours of operation</Subtitle>
              {
                this.days.map((day, i) => {
                  let day_hours = this.props.hours.find(day_hours => day_hours.day === day)
                  if (day_hours) {
                    return (
                      <Text key={i}>
                        {day_hours.day + ': ' + timeToHumanReadable(day_hours.open_time) + ' - ' + timeToHumanReadable(day_hours.close_time)}
                      </Text>
                    )
                  }
                })
              }
            </View>
          </Row>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.vendor.selected_vendor.name,
    logo_url: state.vendor.selected_vendor.logo_url,
    image_src: state.vendor.selected_vendor.image_src,
    description: state.vendor.selected_vendor.description,
    latitude: state.vendor.selected_vendor.latitude,
    longitude: state.vendor.selected_vendor.longitude,
    place_id: state.vendor.selected_vendor.place_id,
    address: state.vendor.selected_vendor.address,
    hours: state.vendor.selected_vendor.hours
  }
}

const mapDispatchToProps = (dispatch) => ({
  editLogo: () => dispatch(NavigationActions.navigate({ routeName: 'LogoUploadScreen' })),
  editDescription: () => dispatch(NavigationActions.navigate({ routeName: 'EditDescriptionScreen' })),
  editLocation: () => dispatch(NavigationActions.navigate({ routeName: 'EditLocationScreen' })),
  editHours: () => dispatch(NavigationActions.navigate({ routeName: 'EditHoursScreen' }))
})

export default connect(mapStateToProps, mapDispatchToProps)(VendorDetailsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
})

const HeaderTitle = ({ navigation, text }) => <Subtitle navigation={navigation}>{text}</Subtitle>;
const ConnectedHeaderTitle = connect(state => ({ text: state.vendor.selected_vendor.name }))(HeaderTitle);
