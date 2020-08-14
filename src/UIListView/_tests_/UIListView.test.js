import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import UIListView from "..";

const props = {
  data: [{ name: "test" }],
};

describe("UIListView ", () => {

  it("Renders UIListView for default scenarios", () => {
    let field = renderer.create(<UIListView {...props} />).toJSON();
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders list item correctly", () => {
    let field = shallow(<UIListView {...props} renderItem={jest.fn()} />);
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders with separatorComponent correctly", () => {
    let field = shallow(
      <UIListView {...props} ItemSeparatorComponent={jest.fn()} />
    );
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders without separator correctly", () => {
    let field = shallow(
      <UIListView
        {...props}
        hideSeparator={true}
        _renderSeparator={jest.fn()}
      />
    );
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders with searchbar correctly", () => {
    let field = shallow(<UIListView {...props} showSearchBar={true} />);
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders without searchbar correctly", () => {
    let field = shallow(<UIListView {...props} showSearchBar={false} />);
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders with header correctly", () => {
    let field = shallow(
      <UIListView {...props} ListHeaderComponent={jest.fn()} />
    );
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders with header component correctly", () => {
    let field = shallow(<UIListView {...props} headerComponent={jest.fn()} />);
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders without header correctly", () => {
    let field = shallow(<UIListView {...props} headerComponent={null} />);
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders with footer correctly", () => {
    let field = shallow(
      <UIListView {...props} ListFooterComponent={jest.fn()} />
    );
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders horizontally correctly", () => {
    let field = shallow(<UIListView {...props} horizontal={true} />);
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders with mutilple columns correctly", () => {
    let field = shallow(<UIListView {...props} numColumns={4} />);
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders with empty list correctly", () => {
    let field = shallow(
      <UIListView {...props} ListEmptyComponent={jest.fn()} />
    );
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders with pull to refresh correctly", () => {
    let field = shallow(
      <UIListView {...props} onRefresh={jest.fn()} refreshing={true} />
    );
    expect(field).toMatchSnapshot();
  });

  it("To verify UIListView renders after threshold value reached", () => {
    let field = shallow(
      <UIListView
        {...props}
        onEndReached={jest.fn()}
        onEndReachedThreshold={20}
      />
    );
    expect(field).toMatchSnapshot();
  });
});
