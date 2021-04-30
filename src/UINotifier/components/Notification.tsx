import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
  Image,
  TextStyle,
  ImageStyle,
  Platform,
  SafeAreaView,
} from "react-native";

import { Fonts, FontSize, Themes, LineHeight } from "../../utils/StyleSheet";

import { DEFAULT_COLOR_THEME } from "../constants";

const style = StyleSheet.create({
  main: {
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24.0,
    elevation: 10,
  },
  container: {
    marginTop: Platform.OS === "ios" ? 0 : 30,
    paddingVertical: 5,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    alignItems: "center",
    marginRight: 10,
    borderRadius: 5,
    height: 30,
    width: 30,
  },
  icon: {
    alignItems: "center",
    marginRight: 10,
  },
  content: {
    flex: 1,
    marginHorizontal: 5,
  },
  title: {
    fontFamily: Fonts.Regular,
    fontWeight: "bold",
    fontSize: FontSize.Medium,
    lineHeight: LineHeight.Medium,
  },
  description: {
    fontFamily: Fonts.Regular,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: FontSize.Small,
    lineHeight: LineHeight.Small,
  },
});

export interface NotificationComponentProps {
  /** Passed to `<Image />` as `source` param.
   * @default null */
  imageSource?: ImageSourcePropType;

  /** The maximum number of lines to use for rendering title.
   * @default null */
  maxTitleLines?: number;

  /** The maximum number of lines to use for rendering description.
   * @default null */
  maxDescriptionLines?: number;

  /** A container of the component. Set it in case you use different SafeAreaView than the standard
   * @default SafeAreaView */
  ContainerComponent?: Function;

  /** The style to use for rendering title
   * @default null */
  titleStyle?: TextStyle;

  /** The style to use for rendering description
   * @default null */
  descriptionStyle?: TextStyle;

  /** The style to use for rendering image
   * @default null */
  imageStyle?: ImageStyle;

  /** The Icomoon component
   * @default 24 */
  IcomoonComponent?: Function;
}

interface NotificationComponentAllProps extends NotificationComponentProps {
  title?: string;
  description?: string;
  colorTheme?: string;
}

const UINotificationComponent: React.FunctionComponent<NotificationComponentAllProps> = ({
  title,
  titleStyle,
  description,
  descriptionStyle,
  imageSource,
  imageStyle,
  ContainerComponent,
  maxTitleLines,
  maxDescriptionLines,
  IcomoonComponent,
  colorTheme,
}) => {
  const Container = ContainerComponent ?? SafeAreaView;

  const { Notifier } =
    colorTheme === DEFAULT_COLOR_THEME ? Themes.Light : Themes.Dark;

  return (
    <View style={[style.main, { backgroundColor: Notifier.banner }]}>
      <Container>
        <View style={[{ backgroundColor: Notifier.banner }, style.container]}>
          {!!imageSource ? (
            <Image style={[style.image, imageStyle]} source={imageSource} />
          ) : (
            !!IcomoonComponent && (
              <View style={[style.icon]}>
                <IcomoonComponent />
              </View>
            )
          )}

          <View style={[style.content]}>
            {!!title && (
              <Text
                style={[{ color: Notifier.primary }, style.title, titleStyle]}
                numberOfLines={maxTitleLines}
              >
                {title}
              </Text>
            )}
            {!!description && (
              <Text
                style={[
                  { color: Notifier.primaryText },
                  style.description,
                  descriptionStyle,
                ]}
                numberOfLines={maxDescriptionLines}
              >
                {description}
              </Text>
            )}
          </View>
        </View>
      </Container>
    </View>
  );
};

export default UINotificationComponent;
