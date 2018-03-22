import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Screen,
  ScrollView,
  GridRow,
  TouchableOpacity,
  Image,
  Subtitle,
  Card,
  View,
  Caption,
  ListView
} from '@shoutem/ui';

class ItemList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData) {
    const { openItemDetails } = this.props;

    const cellViews = rowData.map((item, id) => {
      return (
        <TouchableOpacity styleName="flexible" key={item.id} onPress={() => openItemDetails(item)}>
          <Card styleName="flexible">
            <Image
              styleName="medium-wide"
              source={{ uri: item.image_file_src  }}
            />
            <View styleName="content">
              <Subtitle numberOfLines={2}>{item.name}</Subtitle>
              <View styleName="horizontal v-center space-between">
                <View styleName="horizontal">
                  <Caption styleName="md-gutter-right">${item.price}/{item.unit}</Caption>
                  <Caption styleName="line-through">${item.price}</Caption>
                </View>
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
          renderRow={(rowData) => this.renderRow(rowData)}
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
  openItemDetails: (item) => dispatch({ type: 'NavigateItem', item: item })
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
