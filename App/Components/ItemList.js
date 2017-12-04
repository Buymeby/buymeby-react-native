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
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow

    if (index === '0') {
      return (
        <TouchableOpacity key={index}>
          <Image
            styleName="large"
            source={{ uri: "https://allshecooks.com/wp-content/uploads/2016/08/CRUSHED-TOMATOES-RECIPE.jpg" }}
          >
            <Tile>
              <Title styleName="md-gutter-bottom">{rowData[0].name}</Title>
              <Subtitle styleName="sm-gutter-horizontal">{rowData[0].description}</Subtitle>
            </Tile>
          </Image>
          <Divider styleName="line" />
        </TouchableOpacity>
      );
    }

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
      <GridRow columns={3}>
        {cellViews}
      </GridRow>
    );
  }

  render() {
    console.tron.log(this.props.items)
    // Group the restaurants into rows with 2 columns, except for the
    // first article. The first article is treated as a featured article
    let isFirstArticle = true;
    const groupedData = GridRow.groupByRows(this.props.items, 3, () => {
      if (isFirstArticle) {
        isFirstArticle = false;
        return 3;
      }

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
