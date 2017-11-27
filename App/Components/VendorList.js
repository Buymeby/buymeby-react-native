import React from 'react'
import { List, ListItem } from 'react-native-elements'
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
          this.props.vendors.map((vendor, i) => (
            <ListItem
              key={i}
              title={vendor.name}
              subtitle={vendor.description}
            />
          ))
        }
      </List>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vendors: state.startup.vendors
  }
}

export default connect(mapStateToProps)(VendorList)
