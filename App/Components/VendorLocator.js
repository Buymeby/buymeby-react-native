import React from 'react'
import { View } from 'react-native'
import MapView from 'react-native-maps'
import VendorLocatorCallout from './VendorLocatorCallout'
import Styles from './Styles/VendorLocatorStyles'
import { calculateRegion } from '../Lib/MapHelpers'
import { connect } from 'react-redux'

/* ***********************************************************
* IMPORTANT!!! Before you get started, if you are going to support Android,
* PLEASE generate your own API key and add it to android/app/src/main/AndroidManifest.xml
* https://console.developers.google.com/apis/credentials
* Also, you'll need to enable Google Maps Android API for your project:
* https://console.developers.google.com/apis/api/maps_android_backend/
*************************************************************/

class VendorLocator extends React.Component {
  /* ***********************************************************
  * This generated code is only intended to get you started with the basics.
  * There are TONS of options available from traffic to buildings to indoors to compass and more!
  * For full documentation, see https://github.com/lelandrichardson/react-native-maps
  *************************************************************/

  // constructor (props) {
    // this.renderMapMarkers = this.renderMapMarkers.bind(this)
    // this.onRegionChange = this.onRegionChange.bind(this)
  // }

  componentWillReceiveProps (newProps) {
    /* ***********************************************************
    * STEP 3
    * If you wish to recenter the map on new locations any time the
    * props change, do something like this:
    *************************************************************/
    // this.setState({
    //   region: calculateRegion(newProps.locations, { latPadding: 0.1, longPadding: 0.1 })
    // })
  }

  onRegionChange (newRegion) {
    /* ***********************************************************
    * STEP 4
    * If you wish to fetch new locations when the user changes the
    * currently visible region, do something like this:
    *************************************************************/
    // const searchRegion = {
    //   ne_lat: newRegion.latitude + newRegion.latitudeDelta / 2,
    //   ne_long: newRegion.longitude + newRegion.longitudeDelta / 2,
    //   sw_lat: newRegion.latitude - newRegion.latitudeDelta / 2,
    //   sw_long: newRegion.longitude - newRegion.longitudeDelta / 2
    // }
    // Fetch new data...
  }

  calloutPress (location) {
    /* ***********************************************************
    * STEP 5
    * Configure what will happen (if anything) when the user
    * presses your callout.
    *************************************************************/

    // console.tron.log(location) // Reactotron
  }

  renderMapMarkers (location) {
    /* ***********************************************************
    * STEP 6
    * Customize the appearance and location of the map marker.
    * Customize the callout in ./VendorLocatorCallout.js
    *************************************************************/

    return (
      <MapView.Marker key={location.title} coordinate={{latitude: location.latitude, longitude: location.longitude}}>
        <VendorLocatorCallout location={location} onPress={this.calloutPress} />
      </MapView.Marker>
    )
  }

  render () {
    return (
      <MapView
        style={Styles.container}
        region={this.props.region}
        onRegionChangeComplete={this.onRegionChange}
        showsUserLocation={true}
      >
        {this.props.locations.map((location) => this.renderMapMarkers(location))}
      </MapView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vendors: state.startup.vendors,
    locations: state.startup.locations,
    region: state.startup.region
    // longitude: state.startup.longitude
    // latitudeDelta: state.startup.latitudeDelta
    // longitudeDelta: state.startup.longitudeDelta
  }
}

export default connect(mapStateToProps)(VendorLocator)
