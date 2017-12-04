import React from 'react'
import { List, ListItem } from 'react-native-elements'
import { TouchableHighlight } from 'react-native'
import Styles from './Styles/VendorListStyles'
import { connect } from 'react-redux'

class VendorList extends React.Component {

  render () {
    const vendors = this.props.vendors;
    if (!vendors) {
      return null;
    }

    return (
      <List style={Styles.list}>
        {
          vendors.map((vendor, i) => (
            <ListItem
              key={i}
              title={vendor.name}
              subtitle={vendor.description}
              onPress={this.props.openVendorDetails.bind(this, vendor)}
            />
          ))
        }
      </List>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vendors: state.startup.vendors,
    navigation: state.nav
  }
}

const mapDispatchToProps = (dispatch) => ({
  openVendorDetails: (vendor) => dispatch({ type: 'NavigateVendor', vendor: vendor })
})

export default connect(mapStateToProps, mapDispatchToProps)(VendorList)
