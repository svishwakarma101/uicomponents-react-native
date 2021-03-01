import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  Image,
} from "react-native";
import { BUTTON_TYPES, BUTTON_SHAPES } from "../utils/Constants";
import { APPLIED_THEME as Theme } from "../utils/Constants";
import renderIf from "../utils/RenderIf";
import { ButtonStyles } from "./ButtonStyles";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";
import { replaceSpaceWithUnderscore, accessibilityId } from "../utils/index";
function UIButton(props) {
  var {
    content,
    buttonType,
    style,
    buttonShape,
    disabled,
    gradientStyle,
    iconLeftPositioned,
    onPressIn,
    iconWithBtnText,
    titleStyle,
    iconStyle,
    contentStyle,
    onPressOut,
    linkStyle,
    buttonOpacity,
  } = props;

  const [buttonPressedIn, setButtonPressedIn] = useState(false);
  var buttonStyle;
  var buttonShape = buttonShape || "default";
  var buttonType = buttonType || "default";
  var isDisabled = disabled || false;
  var isIconLeftPositioned = iconLeftPositioned || false;
  var buttonBackgroundColor;
  var buttonBorderColor;

  const isGradient = buttonType === BUTTON_TYPES.gradient;

  switch (buttonType) {
    case BUTTON_TYPES.primary:
      buttonStyle = ButtonStyles.primaryButton;
      break;
    case BUTTON_TYPES.secondary:
      buttonStyle = ButtonStyles.secondaryButton;
      break;
    case BUTTON_TYPES.disabled:
      buttonStyle = ButtonStyles.disabledButton;
      break;
    case BUTTON_TYPES.gradient:
      buttonStyle = ButtonStyles.gradientButton;
      break;
    case BUTTON_TYPES.transparent:
      buttonStyle = ButtonStyles.transparentButton;
      break;
    default:
      buttonStyle = ButtonStyles.defaultButtonType;
      break;
  }

  switch (buttonShape) {
    case BUTTON_SHAPES.square:
      buttonShape = ButtonStyles.squareButton;
      break;
    case BUTTON_SHAPES.rounded:
      buttonShape = ButtonStyles.roundButton;
      break;
    case BUTTON_SHAPES.roundedEdge:
      buttonShape = ButtonStyles.roundedEdgeButton;
      break;
    default:
      buttonShape = ButtonStyles.defaultShapeButton;
      break;
  }

  var textColor = getTextColor(buttonPressedIn, buttonType, isDisabled, props);
  var iconColor = getImageColor(buttonType, isDisabled, props);
  let buttonAttributes = { buttonStyle, buttonShape, textColor };

  if (!isGradient) {
    buttonBackgroundColor = getButtonBackgroundColor(
      buttonType,
      isDisabled,
      props
    );
    buttonBorderColor = getButtonBorderColor(buttonType, isDisabled, props);
    buttonAttributes = {
      ...buttonAttributes,
      buttonBackgroundColor,
      buttonBorderColor,
    };
  }

  if (buttonType === BUTTON_TYPES.link) {
    buttonAttributes = {
      ...buttonAttributes,
      buttonStyle: ButtonStyles.linkButtonStyle,
      buttonShape: null,
      buttonBackgroundColor: "transparent",
      buttonBorderColor: "transparent",
      linkStyle: linkStyle,
    };
  }

  if (props.buttonType === BUTTON_TYPES.primary) {
    buttonAttributes = {
      ...buttonAttributes,
      titleTextStyle: props.isTitleCapital
        ? { textTransform: "uppercase" }
        : { textTransform: "capitalize" },
    };
  }

  return isGradient
    ? getGradientButton(buttonAttributes)
    : getNormalButton(buttonAttributes);

  function getGradientButton(buttonAttributes) {
    const { buttonStyle, buttonShape, textColor } = buttonAttributes;
    return (
      <>
        <TouchableOpacity
          {...props}
          disabled={disabled || false}
          style={[buttonStyle, buttonShape, style]}
          activeOpacity={buttonOpacity || 1.0}
          delayPressIn={100}
          delayPressOut={100}
          onPressIn={() => btnPressedIn()}
          onPressOut={() => btnPressedOut()}
          accessibilityLabel={accessibilityId(
            getButtonAccessibilityLabel(content || "icon"),
            content
          )}
          testID={getButtonAccessibilityLabel(content || "icon")}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
              props.theme.GradientButton.backgroundColorGradientStart,
              props.theme.GradientButton.backgroundColorGradientMid,
              props.theme.GradientButton.backgroundColorGradientEnd,
            ]}
            style={[buttonStyle, buttonShape, gradientStyle]}
          >
            {renderIf(content || iconWithBtnText)(
              <View
                style={[
                  ButtonStyles.contentWithIcon,
                  contentStyle && contentStyle,
                  {
                    flexDirection: isIconLeftPositioned ? "row-reverse" : "row",
                  },
                ]}
              >
                {renderIf(content)(
                  <View style={[ButtonStyles.titleView]}>
                    <Text
                      style={[
                        ButtonStyles.title,
                        { color: textColor },
                        titleStyle,
                      ]}
                      numberOfLines={1}
                    >
                      {" "}
                      {content}
                    </Text>
                  </View>
                )}
                {renderIf(iconWithBtnText)(
                  <View style={{ justifyContent: "center" }}>
                    {iconWithBtnText}
                  </View>
                )}
              </View>
            )}
            {props.children}
          </LinearGradient>
        </TouchableOpacity>
      </>
    );
  }

  function getNormalButton(buttonAttributes) {
    const {
      buttonStyle,
      buttonShape,
      textColor,
      buttonBackgroundColor,
      buttonBorderColor,
      linkTextStyle,
      titleTextStyle,
      linkStyle,
    } = buttonAttributes;
    return (
      <>
        <TouchableOpacity
          {...props}
          style={[
            buttonStyle,
            buttonShape,
            passStyles(buttonBackgroundColor, buttonBorderColor),
            style,
          ]}
          disabled={disabled ? disabled : false}
          activeOpacity={buttonOpacity || 1.0}
          delayPressIn={100}
          delayPressOut={100}
          onPressIn={() => btnPressedIn()}
          onPressOut={() => btnPressedOut()}
          accessibilityLabel={accessibilityId(
            getButtonAccessibilityLabel(content || "icon"),
            content
          )}
          testID={getButtonAccessibilityLabel(content || "icon")}
        >
          {renderIf(content || iconWithBtnText)(
            <View
              style={[
                ButtonStyles.buttonContainer,
                iconWithBtnText && iconWithBtnText
                  ? ButtonStyles.contentWithIcon
                  : null,
                contentStyle && contentStyle,
                { flexDirection: isIconLeftPositioned ? "row-reverse" : "row" },
              ]}
            >
              {renderIf(content)(
                <View
                  style={[
                    props.buttonType === "link" ? null : ButtonStyles.titleView,
                  ]}
                >
                  <Text
                    style={[
                      ButtonStyles.title,
                      { color: textColor },
                      linkTextStyle,
                      titleTextStyle,
                      titleStyle,
                      linkStyle,
                    ]}
                    numberOfLines={1}
                  >
                    {content}
                  </Text>
                </View>
              )}
              {renderIf(iconWithBtnText)(
                <View style={{ justifyContent: "center" }}>
                  {iconWithBtnText}
                </View>
              )}
            </View>
          )}
          {props.children}
        </TouchableOpacity>
      </>
    );
  }

  function passStyles() {
    return {
      backgroundColor: buttonBackgroundColor,
      borderColor: buttonBorderColor,
      opacity: buttonType === BUTTON_TYPES.disabled ? 0.5 : 1,
    };
  }

  function btnPressedIn() {
    if (!disabled) {
      setButtonPressedIn(true);
    }
    if (onPressIn !== undefined) {
      onPressIn();
    }
  }

  function btnPressedOut() {
    if (!disabled) {
      setButtonPressedIn(false);
    }
    if (onPressOut !== undefined) {
      onPressOut();
    }
  }
}

function getButtonBackgroundColor(buttonType, isDisabled, props) {
  const buttonTheme = getThemeForButtonType(buttonType, isDisabled, props);
  return buttonTheme.backgroundColor;
}

function getTextColor(buttonPressedIn, buttonType, isDisabled, props) {
  const buttonTheme = getThemeForButtonType(buttonType, isDisabled, props);
  let textColor = buttonTheme.textColor;
  if (buttonPressedIn) {
    textColor = buttonTheme.activeTextColor;
  }
  return textColor;
}

function getImageColor(buttonType, isDisabled, props) {
  const buttonTheme = getThemeForButtonType(buttonType, isDisabled, props);
  let iconColor = buttonTheme.tintColor;
  return iconColor;
}

function getThemeForButtonType(buttonType, isDisabled, props) {
  if (buttonType === BUTTON_TYPES.primary) {
    return isDisabled ? props.theme.DisabledButton : props.theme.PrimaryButton;
  } else if (buttonType === BUTTON_TYPES.secondary) {
    return isDisabled
      ? props.theme.DisabledSecondaryButton
      : props.theme.SecondaryButton;
  } else if (buttonType === BUTTON_TYPES.disabled) {
    return props.theme.DisabledButton;
  } else if (buttonType === BUTTON_TYPES.gradient) {
    return props.theme.GradientButton;
  } else if (buttonType === BUTTON_TYPES.link) {
    return props.theme.LinkButton;
  }
  return props.theme.DefaultButton;
}

function getButtonBorderColor(buttonType, isDisabled, props) {
  const buttonTheme = getThemeForButtonType(buttonType, isDisabled, props);
  return buttonTheme.borderColor;
}

function getButtonAccessibilityLabel(content) {
  let label = "";
  label = `${replaceSpaceWithUnderscore(content)}_button`;
  return label;
}
UIButton.propTypes = {
  theme: PropTypes.object,
  disabled: PropTypes.bool,
  buttonType: PropTypes.oneOf(Object.keys(BUTTON_TYPES)),
  buttonShape: PropTypes.oneOf(Object.keys(BUTTON_SHAPES)),
  titleStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  gradientStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  linkStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  contentStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  iconStyle: PropTypes.shape({
    ...ViewPropTypes.style,
  }),
  iconLeftPositioned: PropTypes.bool,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
};

UIButton.defaultProps = {
  theme: Theme,
};

export default UIButton;
