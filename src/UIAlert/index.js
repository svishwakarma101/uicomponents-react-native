/**
 * An Alert box is a basic UI component for showing alerts.
 */

import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ViewPropTypes,
  Animated,
  Easing,
} from "react-native";
import PropTypes from "prop-types";
import renderIf from "../utils/RenderIf";
import {
  BUTTON_TYPES,
  BUTTON_SHAPES,
  APPLIED_THEME as Theme,
} from "../utils/Constants";
import { Colors, Fonts, FontSize, LineHeight } from "../utils/StyleSheet";
import UIButton from "../UIButton";
import cancelImage from "../../assets/images/button/cancelIcon.png";
import UICircleWithTick from "../UICircleWithTick";

export default function UIAlert(props) {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    startAnimation();
  }, []);

  function startAnimation() {
    Animated.timing(animatedValue, {
      duration: 650,
      easing: Easing.linear,
      useNativeDriver: false,
      isInteraction: true,
      toValue: 1,
    }).start();
  }

  const header = () => {
    let {
      isIconPrimary,
      headerIconColor,
      headerIconBackgroundColor,
      theme,
    } = props;
    if (props.headerIcon) {
      return props.headerIcon();
    } else {
      return (
        <UICircleWithTick
          {...props}
          color={
            headerIconColor || isIconPrimary
              ? theme.Alert.primaryTickColor
              : theme.Alert.secondaryTickColor
          }
          isPrimary={isIconPrimary}
          backgroundColor={
            headerIconBackgroundColor ||
            theme.Alert.secondaryTickBackgroundColor
          }
          value={animatedValue}
          size={"small"}
          unfilledColor={"transparent"}
          animationConfig={{ speed: 4 }}
        />
      );
    }
  };

  const dismissIcon = () => {
    if (props.dismissIcon) {
      return props.dismissIcon();
    } else {
      return (
        <Image
          resizeMode="contain"
          source={props.dismissButtonImage || cancelImage}
          style={[styles.alertDismissButtonImage, props.dismissButtonStyle]}
        />
      );
    }
  };

  const {
    theme,
    title,
    titleStyle,
    description,
    descriptionStyle,
    containerStyle,
    separatorStyle,
    isIconRequired,
    isDismissButtonRequired,
    primaryButtonTitle,
    primaryButtonTitleStyle,
    primaryButtonStyle,
    primaryButtonType,
    primaryButtonAction,
    primaryButtonShape,
    secondaryButtonTitle,
    secondaryButtonTitleStyle,
    secondaryButtonStyle,
    secondaryButtonType,
    secondaryButtonAction,
    secondaryButtonShape,
    separatorRequired,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {renderIf(isDismissButtonRequired)(
        <View style={styles.dismissButtonContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={primaryButtonAction}
            style={styles.alertDismissButton}
          >
            {dismissIcon()}
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.alertMessageContainer}>
        {renderIf(isIconRequired)(<View>{header()}</View>)}
        <Text
          style={[styles.title, { color: theme.Alert.textColor }, titleStyle]}
        >
          {title}
        </Text>
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
        {props.children}

        <View style={styles.buttonContainer}>
          {renderIf(separatorRequired)(
            <View style={[styles.separator, separatorStyle]} />
          )}

          {renderIf(primaryButtonAction)(
            <UIButton
              theme={theme}
              buttonType={primaryButtonType}
              buttonShape={primaryButtonShape}
              onPressIn={primaryButtonAction}
              // onPressOut={navigateToNext.bind(this)}
              content={primaryButtonTitle}
              titleStyle={primaryButtonTitleStyle}
              style={[styles.button, primaryButtonStyle]}
            />
          )}
          {renderIf(secondaryButtonTitle !== undefined)(
            <UIButton
              theme={theme}
              buttonType={secondaryButtonType}
              buttonShape={secondaryButtonShape}
              onPressIn={secondaryButtonAction}
              // onPressOut={navigateToNext.bind(this)}
              content={secondaryButtonTitle}
              titleStyle={secondaryButtonTitleStyle}
              style={[styles.button, secondaryButtonStyle, { marginTop: 10 }]}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 20,
    flexDirection: "column",
    borderRadius: 5,
    backgroundColor: Colors.White,
    elevation: 5,
    shadowColor: Colors.grayDark,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 5,
      width: 0.25,
    },
  },
  dismissButtonContainer: {
    flex: 0,
    alignItems: "flex-end",
  },
  alertMessageContainer: {
    flex: 0,
    alignItems: "center",
  },
  buttonContainer: {
    flex: 0,
    width: "100%",
  },
  title: {
    color: Colors.darkBanner,
    fontFamily: Fonts.Bold,
    fontSize: FontSize.Medium,
    lineHeight: LineHeight.Medium,

    marginTop: 20,
  },
  description: {
    color: Colors.grayShade2,
    fontFamily: Fonts.Regular,
    fontSize: FontSize.Small,
    lineHeight: LineHeight.Small,

    marginTop: 10,
  },
  alertDismissButton: {
    height: 44,
    width: 44,
    alignItems: "flex-end",
  },
  alertDismissButtonImage: {
    height: 16,
    width: 16,
  },
  alertHeaderIcon: {
    height: 52,
    width: 52,
  },
  button: {
    width: "100%",
    height: 46,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightWhite,
    marginVertical: 16,
  },
});

UIAlert.proptypes = {
  theme: PropTypes.object,
  isIconRequired: PropTypes.bool,
  isIconPrimary: PropTypes.bool,
  headerIconColor: PropTypes.string,
  headerIconBackgroundColor: PropTypes.string,
  headerIcon: PropTypes.func,
  isDismissButtonRequired: PropTypes.bool,
  dismissButtonImage: PropTypes.string,
  dismissButtonStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.string,
  description: PropTypes.string,
  descriptionStyle: PropTypes.string,
  separatorStyle: PropTypes.string,
  separatorRequired: PropTypes.bool,
  customDescription: PropTypes.element,
  primaryButtonTitle: PropTypes.string,
  primaryButtonTitleStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  primaryButtonStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  primaryButtonAction: PropTypes.func,
  primaryButtonType: PropTypes.oneOf(BUTTON_TYPES),
  primaryButtonShape: PropTypes.oneOf(BUTTON_SHAPES),
  secondaryButtonTitle: PropTypes.string,
  secondaryButtonTitleStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  secondaryButtonStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  secondaryButtonAction: PropTypes.func,
  secondaryButtonType: PropTypes.oneOf(BUTTON_TYPES),
  secondaryButtonShape: PropTypes.oneOf(BUTTON_SHAPES),
};

UIAlert.defaultProps = {
  theme: Theme,
  isIconPrimary: true,
  primaryButtonType: BUTTON_TYPES.primary,
  primaryButtonShape: BUTTON_SHAPES.default,
  secondaryButtonType: BUTTON_TYPES.link,
  secondaryButtonShape: BUTTON_SHAPES.default,
  separatorRequired: true,
};
