import React from 'react'
import { List, ListItem } from 'react-native-elements'
import Styles from './Styles/VendorListStyles'
import { connect } from 'react-redux'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]

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

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorList)
