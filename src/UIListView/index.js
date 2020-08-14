import React, { useRef, useState } from "react";
import { View, FlatList, StyleSheet, ViewPropTypes, Appearance, Text } from "react-native";
import PropTypes from "prop-types";

import UITextField from "../UITextField/index";
import { Fonts, FontSize } from "../utils/StyleSheet";
import { accessibilityId } from "../utils/index";

const UIListView = (props) => {
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  const {
    theme,
    isHorizontal,
    data,
    numColumns,
    extraData,
    renderListItem,
    separatorComponent,
    hideSeparator,
    headerComponent,
    showSearchBar,
    handleSearch,
    renderFooter,
    handleRefresh,
    shouldRefresh,
    handleLoadMore,
    thresholdValue,
    emptyComponent,
    footerComponentStyle,
    headerComponentStyle,
    columnWrapperStyle,
    contentContainerStyle,
    showDefaultEmptyComponent,
    accessibilityLabel,
    testID,
  } = props;

  const _renderSeparator = () => {
    if (separatorComponent) {
      return separatorComponent();
    } else if (hideSeparator) {
      return null;
    } else {
      return <View style={{...styles.separatorStyle, backgroundColor: theme.ListView.seperatorColor}} />;
    }
  };

  const _handleSearch = (text) => {
    setSearchText(text);
    if (handleSearch) handleSearch(text);
  };

  const _renderHeader = () => {
    if (headerComponent) {
      return headerComponent();
    } else return null;
  };

  const _renderEmptyComponent = () => {
    if (emptyComponent) {
      return emptyComponent();
    } else if (showDefaultEmptyComponent) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={{...styles.emptyText, color: theme.TextField.textColor}}>{"The list is empty"}</Text>
        </View>
      );
    } else return null;
  };

  return (
    <View style={{ flex: 1 }}>
      {showSearchBar && (
        <UITextField
          theme={theme}
          value={searchText}
          input={{ value: searchText }}
          placeholder={"Name"}
          isFloating={true}
          isStaticLabel={true}
          labelFontSize={14}
          onChangeText={_handleSearch}
          showLeftSearchButton
          containerStyle={styles.searchbarContainer}
          inputContainerStyle={styles.inputTextContainer}
          labelTextStyle={{ fontWeight: "bold" }}
          underlineType={"textMatch"}
          blurOnSubmit={true}
        />
      )}
      <FlatList
        {...props}
        ref={flatListRef}
        keyExtractor={(item, index) => `${index}`}
        horizontal={isHorizontal}
        numColumns={numColumns}
        contentContainerStyle={[styles.containerView, contentContainerStyle]}
        data={data}
        extraData={extraData}
        renderItem={renderListItem}
        ListEmptyComponent={_renderEmptyComponent}
        ItemSeparatorComponent={_renderSeparator}
        ListHeaderComponent={_renderHeader}
        ListHeaderComponentStyle={headerComponentStyle}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={footerComponentStyle}
        columnWrapperStyle={columnWrapperStyle}
        onRefresh={handleRefresh}
        refreshing={shouldRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={thresholdValue}
        accessibilityLabel={
          accessibilityLabel
            ? accessibilityLabel
            : accessibilityId(testID ? testID : "listView")
        }
        testID={testID ? testID : "listView"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    paddingBottom: 20,
    flex: 1
  },
  separatorStyle: {
    height: 1,
    width: "90%",
    alignSelf: "center",
  },
  searchbarContainer: {
    paddingHorizontal: 10,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  emptyText: {
    fontFamily: Fonts.Regular,
    fontSize: FontSize.Medium,
  },
  inputTextContainer: {
    height: 40,
  },
});

UIListView.defaultProps = {
  isHorizontal: false,
  numColumns: 0,
  shouldRefresh: false,
  thresholdValue: 0,
  hideSeparator: false,
  showSearchBar: false,
  showDefaultEmptyComponent: false,
};

UIListView.propTypes = {
  isHorizontal: PropTypes.bool,
  data: PropTypes.array.isRequired,
  numColumns: PropTypes.number,
  extraData: PropTypes.array,
  renderListItem: PropTypes.func,
  separatorComponent: PropTypes.func,
  hideSeparator: PropTypes.bool,
  headerComponent: PropTypes.func,
  showSearchBar: PropTypes.bool,
  handleSearch: PropTypes.func,
  renderFooter: PropTypes.func,
  handleRefresh: PropTypes.func,
  shouldRefresh: PropTypes.bool,
  handleLoadMore: PropTypes.func,
  thresholdValue: PropTypes.number,
  emptyComponent: PropTypes.func,
  showDefaultEmptyComponent: PropTypes.bool,
  footerComponentStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  headerComponentStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  columnWrapperStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  contentContainerStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  accessibilityLabel: PropTypes.string,
  testID: PropTypes.string,
};

export default UIListView;
