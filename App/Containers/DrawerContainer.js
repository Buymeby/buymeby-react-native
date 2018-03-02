import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class DrawerContainer extends React.Component {

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text
          style={styles.uglyDrawerItem}>
          Screen 1
        </Text>
        <Text
          style={styles.uglyDrawerItem}>
          Screen 2
        </Text>
        <Text
          style={styles.uglyDrawerItem}>
          Screen 3
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    fontSize: 20,
    color: 'blue',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: 'white',
    overflow: 'hidden'
  }
})
