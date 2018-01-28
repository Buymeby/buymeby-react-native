import React from 'react'
import { List, ListItem } from 'react-native-elements'
import { TouchableHighlight } from 'react-native'
import Styles from './Styles/VendorListStyles'
import { connect } from 'react-redux'
import {
  Screen,
  Divider,
  ScrollView,
  GridRow,
  TouchableOpacity,
  Image,
  Subtitle,
  Card,
  View,
  Caption,
  Row,
  Button,
  Icon,
  Title
} from '@shoutem/ui';


class VendorList extends React.Component {

  render () {
    const vendors = this.props.vendors;
    if (!vendors) {
      return null;
    }

    return (
      vendors.map((vendor, i) => (
        <TouchableOpacity onPress={this.props.openVendorDetails.bind(this, vendor)}>
          <Row key={i}>
            <Image
              styleName="small rounded-corners"
              source={{ uri: vendor.image_src || " " }}
            />
            <View styleName="vertical stretch space-between">
              <Subtitle>{vendor.name}</Subtitle>
              <View styleName="horizontal">
                <Caption>{vendor.description}</Caption>
              </View>
            </View>
            <Button styleName="right-icon" onPress={this.props.openVendorDetails.bind(this, vendor)}>
              <Icon name="right-arrow"/>
            </Button>
          </Row>
          <Divider styleName="line" />
        </TouchableOpacity>
      ))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vendors: state.vendor.vendors,
    navigation: state.nav
  }
}

const mapDispatchToProps = (dispatch) => ({
  openVendorDetails: (vendor) => dispatch({ type: 'NavigateVendor', vendor: vendor })
})

export default connect(mapStateToProps, mapDispatchToProps)(VendorList)
