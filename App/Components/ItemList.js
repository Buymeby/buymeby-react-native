import React, { Component } from 'react'
import styles from './Styles/ItemListStyle'
import { connect } from 'react-redux'
import {
  ScrollView,
  GridRow,
  Text,
  Screen,
  TouchableOpacity,
  Image,
  Tile,
  Title,
  Subtitle,
  Divider,
  Card,
  View,
  Caption,
  ListView
} from '@shoutem/ui';

class ItemList extends Component {

  renderRow(rowData, sectionId, index) {
    const cellViews = rowData.map((item, id) => {
    return (
        <TouchableOpacity key={id} styleName="flexible">
          <Card styleName="flexible">
            <Image
              styleName="medium-wide"
              source={{ uri: "https://allshecooks.com/wp-content/uploads/2016/08/CRUSHED-TOMATOES-RECIPE.jpg"  }}
            />
            <View styleName="content">
              <Subtitle numberOfLines={3}>{item.name}</Subtitle>
              <View styleName="horizontal">
                <Caption styleName="collapsible" numberOfLines={2}>{item.description}</Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    );
  }

  render() {
    const groupedData = GridRow.groupByRows(this.props.items, 2, () => {
      return 1;
    });
    return (
      <Screen>
        <ListView
          data={groupedData}
          renderRow={this.renderRow}
        />
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.vendor.selected_vendor.items
  }
}

const mapDispatchToProps = (dispatch) => ({
  openVendorDetails: (vendor) => dispatch({ type: 'NavigateVendor', vendor: vendor })
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
