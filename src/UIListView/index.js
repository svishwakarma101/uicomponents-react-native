import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, ViewPropTypes, Text, Animated } from "react-native";
import PropTypes from "prop-types";

import UITextField from "../UITextField/index";
import { Fonts, FontSize } from "../utils/StyleSheet";
import { accessibilityId } from "../utils/index";
import searchIcon from "../../assets/images/button/searchIcon.png";
import cancelIcon from "../../assets/images/button/cancelIcon.png";

const UIListView = (props) => {
  const flatListRef = useRef(null);
  const inputRef = useRef(null);
  const sectionListRef = useRef(null);
  const [searchText, setSearchText] = useState(props.serachValue || '');
  const [showCancelButton, setShowCancelButton] = useState(false);

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
    placeholder,
    searchFieldProps,
    showLeftSearchButton,
    sectionHeaderComponent,
    isSectionList,
  } = props;

  useEffect(() => {
    if (showSearchBar) inputRef.current.focus();
  }, [showSearchBar]);

  useEffect(() => {
    setSearchText(props.serachValue);
    if(props.serachValue?.length) setShowCancelButton(true);
  }, [props.serachValue]);

  const _renderSeparator = () => {
    if (separatorComponent) {
      return separatorComponent();
    } else if (hideSeparator) {
      return null;
    } else {
      return (
        <View
          style={{
            ...styles.separatorStyle,
            backgroundColor: theme.ListView.seperatorColor,
          }}
        />
      );
    }
  };

  const _handleSearch = (text) => {
    setSearchText(text);
    if (text?.length) setShowCancelButton(true);
    else setShowCancelButton(false);
    if (props.onChangeText) {
      props.onChangeText(text);
    }
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
          <Text
            style={{ ...styles.emptyText, color: theme.TextField.textColor }}
          >
            {"The list is empty"}
          </Text>
        </View>
      );
    } else return null;
  };

  return (
    <View style={{ flex: 1 }}>
      {showSearchBar && (
        <Animated.View style={[styles.shadowView, props.shadowStyle]}>
          <UITextField
            theme={theme}
            refField={inputRef}
            value={searchText}
            input={{ value: searchText }}
            placeholder={placeholder}
            name={"textfield"}
            accessibilityLabel={accessibilityLabel||'textfield'}
            testID={testID||'textfield'}
            isFloating={true}
            isStaticLabel={true}
            labelFontSize={14}
            onChangeText={_handleSearch}
            showLeftSearchButton={showLeftSearchButton}
            containerStyle={styles.searchbarContainer}
            inputContainerStyle={styles.inputTextContainer}
            labelTextStyle={{ fontWeight: "bold" }}
            underlineType={"textMatch"}
            blurOnSubmit={true}
            autoFocus={true}
            showClearButton={true}
            searchIcon={true}
            clearButtonImage={showCancelButton ? cancelIcon : searchIcon}
            disabledClear={showCancelButton ? false : true}
            {...searchFieldProps}
          />
          {props.children}
        </Animated.View>
      )}
      {/* added here to maintain shadow opacity */}
      {!showSearchBar && props.children}
      <Animated.View
        style={[
          !showSearchBar && styles.animatedShadow,
          !showSearchBar && props.shadowStyle,
          { flex: 1 },
        ]}
      >
        {!isSectionList ? (
          <Animated.FlatList
            {...props}
            ref={props.scrollRef || flatListRef}
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
        ) : (
          <Animated.SectionList
            {...props}
            ref={props.scrollRef || sectionListRef}
            keyExtractor={(item, index) => item + index}
            horizontal={isHorizontal}
            contentContainerStyle={[styles.containerView, contentContainerStyle]}
            sections={data}
            extraData={extraData}
            renderItem={renderListItem}
            ListEmptyComponent={_renderEmptyComponent}
            ItemSeparatorComponent={_renderSeparator}
            ListHeaderComponent={_renderHeader}
            ListFooterComponent={renderFooter}
            renderSectionHeader={sectionHeaderComponent}
            onRefresh={handleRefresh}
            refreshing={shouldRefresh}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={thresholdValue}
            accessibilityLabel={
              accessibilityLabel
                ? accessibilityLabel
                : accessibilityId(testID ? testID : "sectionListView")
            }
            testID={testID ? testID : "sectionListView"}
        /> 
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    paddingBottom: 20,
    flexGrow: 1,
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
    flex: 1,
  },
  emptyText: {
    fontFamily: Fonts.Regular,
    fontSize: FontSize.Medium,
  },
  inputTextContainer: {
    height: 40,
  },
  shadowView: {
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  image: {
    marginTop: 10,
    width: 20,
    height: 20,
  },
  animatedShadow: {
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
  isSectionList: false,
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
  isSectionList: PropTypes.bool,
  sectionHeaderComponent: PropTypes.func,
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