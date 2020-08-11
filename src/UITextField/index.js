import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Platform,
    TouchableOpacity,
    ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import { TextField } from 'react-native-material-textfield';
import { Colors, Fonts, FontSize } from '../utils/StyleSheet';
import {
    APPLIED_THEME as Theme,
    TEXTFIELD_TYPES,
    TEXTFIELD_SHAPES,
    TEXTFIELD_UNDERLINESTYLE
} from '../utils/Constants';
import cancelIcon from '../../assets/images/button/cancelIcon.png';
import showIcon from '../../assets/images/button/hideIconGray.png';
import hideIcon from '../../assets/images/button/hideIconGray.png';
import searchIcon from '../../assets/images/button/searchIcon.png';
import { replaceSpaceWithUnderscore, accessibilityId } from '../utils/index'

export default function UITextField(props) {

    const [autoFocusEnabled, setAutoFocusEnabled] = useState(props.autoFocus || false);
    const [shouldEncryptedTextBeVisible, setShouldEncryptedTextBeVisible] = useState(props.isSecureText || false);
    const [showPlaceHolderForFloating, setShowPlaceHolderForFloating] = useState(false);
    const inputRef = React.createRef();

    function getMaxLength(type) {
        let length = 0;
        switch (type) {
            case TEXTFIELD_TYPES.date:
                length = 10;
                break;
            case TEXTFIELD_TYPES.shortDate:
                length = 8;
                break;
            case TEXTFIELD_TYPES.monthYearDate:
                length = 7;
                break;
            case TEXTFIELD_TYPES.monthYearShortDate:
                length = 5;
                break;
            default:
                length = 100;
                break;
        }
        return length;
    };

    function handleChange(text) {
        var { type } = props;
        let textTemp = text;
        let singleSeperatorRequired =
            type === TEXTFIELD_TYPES.monthYearDate ||
            type === TEXTFIELD_TYPES.monthYearShortDate;

        if (type !== TEXTFIELD_TYPES.default) {
            if (
                textTemp.length === 2 ||
                (!singleSeperatorRequired && textTemp.length === 5)
            ) {
                if (
                    props.value.length === 1 ||
                    (!singleSeperatorRequired && props.value.length === 4)
                ) {
                    textTemp += '/';
                } else {
                    textTemp = textTemp[0];
                }
            }
        }
        return textTemp;
    };

    function getTextFieldStyle() {
        return StyleSheet.flatten([
            styles.containerView,
            props.shape === TEXTFIELD_SHAPES.rounded
                ? styles.rounded
                : styles.rectangular,
            props.containerStyle,
            {
                backgroundColor:
                    props.backgroundColor ||
                    props.theme.TextField.backgroundColor,
                borderColor:
                    props.borderColor || props.theme.TextField.borderColor
            }
        ]);
    };

    function getTextFieldUnderline() {
        if (
            props.shape === TEXTFIELD_SHAPES.rectangular &&
            props.underlineType === TEXTFIELD_UNDERLINESTYLE.custom
        ) {
            const backgroundColor =
                props.autoFocus === false
                    ? props.theme.TextField.underLineColor
                    : props.theme.TextField.underLineColor;
            return (
                <View
                    style={[
                        styles.underline,
                        { backgroundColor },
                        { backgroundColor: props.underLineColor },
                        props.underlineStyle
                    ]}
                />
            );
        }
        return null;
    }

    function getAccessoryView() {
        if (props.rightAccessoryView && typeof props.rightAccessoryView === 'function') {
            return props.rightAccessoryView()
        }
        else {
            if (props.showClearButton && props.showShowHideButton) {
                return <View style={{ flexDirection: 'row' }}>
                    {getRightSideShowButton()}
                    {getRightSideClearButton()}
                </View>
            } else if (props.showClearButton) {
                return getRightSideClearButton();
            } else if (props.showShowHideButton) {
                return getRightSideShowButton();
            }
            else {
                return null;
            }
        }
    };

    function getRightSideClearButton() {
        const { value, theme, showClearButton, clearButton } = props;
        const textFieldNotEmpty = value && value !== '';
        const isClearButton = clearButton && typeof clearButton === 'function';

        if ( showClearButton || isClearButton ) {
            let clearButtonSource = props.clearButtonImage || cancelIcon;

            return (
                <TouchableOpacity style={[styles.rightAccessory, props.rightAccessoryStyle]} onPress={clearText}>
                    {
                        isClearButton ? clearButton() :
                        <Image
                            style={[styles.image, props.clearButtonStyle,
                            { tintColor: showPlaceHolderForFloating || textFieldNotEmpty ? theme.TextField.textColor : theme.TextField.placeholderTextColor }]}
                            source={clearButtonSource}
                            resizeMode='contain'
                        />          
                    }
                    
                </TouchableOpacity>
            );
        }
        return null;
    };

    function getRightSideShowButton() {
        const { value, theme, showButton, hideButton } = props;
        const textFieldNotEmpty = value && value !== '';

        const isShowButton = showButton && typeof showButton === 'function';
        const isHideButton = hideButton && typeof hideButton === 'function';


        if (props.showShowHideButton || (isShowButton && isHideButton )) {
            let hideButtonSource = props.hideButtonImage || hideIcon;
            let showButtonSource = props.showButtonImage || showIcon;

            return (
                <TouchableOpacity style={[styles.rightAccessory, props.rightAccessoryStyle]} onPress={showHideSecureText}>
                    {
                        (isShowButton && isHideButton ) ? shouldEncryptedTextBeVisible ? hideButton() : showButton() :
                        <Image
                            style={[styles.image, props.clearButtonStyle,
                                { tintColor: showPlaceHolderForFloating || textFieldNotEmpty ? theme.TextField.textColor : theme.TextField.placeholderTextColor }]}
                            source={
                                shouldEncryptedTextBeVisible
                                    ? hideButtonSource
                                    : showButtonSource
                            }
                            resizeMode='contain'
                        />
                    }
                    
                </TouchableOpacity>
            );
        }
        return null;
    };

    function getLeftAccessoryView(){
        if (props.leftAccessoryView && typeof props.leftAccessoryView === 'function') {
            return props.leftAccessoryView()
        }
        else  return getLeftButton()
    }

    function getLeftButton() {
        const { value, theme , showLeftSearchButton, leftButton } = props;
        const textFieldNotEmpty = value && value !== '';
        const isleftButton = leftButton && typeof leftButton === 'function';

        if (showLeftSearchButton || isleftButton) {
            let showLeftSearchButton = props.leftButtonImage || searchIcon;
            return (
                <TouchableOpacity style={[styles.rightAccessory, styles.leftAccessory, props.rightAccessoryStyle]} onPress={() => { }}>
                    {  isleftButton ? leftButton() :
                        <Image
                            style={[styles.image, props.leftButtonStyle,
                            { tintColor: showPlaceHolderForFloating && textFieldNotEmpty ? theme.TextField.textColor : theme.TextField.placeholderTextColor }]}
                            source={showLeftSearchButton}
                            resizeMode='contain'
                        />
                    }
                </TouchableOpacity>
            );
        }
        return null;
    };


    function onFocus() {
        if (props.onFocus) {
            props.onFocus();
        } else {
            setShowPlaceHolderForFloating(true);
        }
    };
    function onBlur() {
        if (props.onBlur) {
            props.onBlur();
        } else {
            setShowPlaceHolderForFloating(false);
        }
    };

    function onTextChanged(text) {
        const { input } = props;
        let refinedText = handleChange(text);
        if(input.onChange && typeof input.onChange === 'function')
            input.onChange(text);
        if (props.onChangeText) {
            props.onChangeText(refinedText);
        }
    }

    function clearText() {
        if (props.showClearButton !== 1 && !props.disabledClear) { // If the entered text is valid then avoid the text clear action. 
            clear()
            if (props.onChangeText) {
                props.onChangeText('');
            }
        }
    };

    function clear() {
        inputRef.current.clear();
    }

    function focus() {
        inputRef.current.focus();
    };

    function showHideSecureText() {
        setShouldEncryptedTextBeVisible(!shouldEncryptedTextBeVisible)
        if (props.onSecureTextModeChange) {
            props.onSecureTextModeChange(shouldEncryptedTextBeVisible);
        }
    };
    function getAccessibilityLabel(name) {
        let label = ''
        label = `${replaceSpaceWithUnderscore(name)}`
        return label
    }

    const {
        theme,
        floatingLabel,
        placeholder,
        placeholderColor,
        multiline,
        numberOfLines,
        returnKeyType,
        isFloating,
        textColor,
        underlineType,
        descriptionMessage,
        errorMessage,
        descriptionStyle,
        textStyle,
        labelPadding,
        labelHeight,
        inputContainerPadding,
        blurOnSubmit,
        labelColor,
        isStaticLabel,
        labelFontSize,
        labelTextStyle,
        labelOffset,
        showLeftSearchButton,
        errorMessageStyle,
        disabled,
        tintColor,
        errorColor,
        accessibilityLabel,
        testID,
        input: { value: preProcessedValue },
    } = props;

    const value = preProcessedValue && preProcessedValue.toString();
    let isTintedUnderlineRequired =
        underlineType === TEXTFIELD_UNDERLINESTYLE.textMatch &&
        props.shape === TEXTFIELD_SHAPES.rectangular;

    return (
        <View style={[getTextFieldStyle()]}>
            <View style={styles.underlineContainerView}>
                <View style={[styles.textInputContainerView]}>

                    <TextField
                        {...props}
                        labelTextStyle={[styles.text, textStyle, showLeftSearchButton ? styles.labelTextStyle : null, labelTextStyle]}
                        style={[styles.text, textStyle]}
                        labelPadding={!isFloating ? 0 : labelPadding || 4}
                        labelHeight={!isFloating ? 0 : labelHeight || 32}
                        inputContainerPadding={
                            !isFloating ? inputContainerPadding || 0 : inputContainerPadding || 8
                        }
                        titleTextStyle={[styles.descriptionStyle, errorMessage ? errorMessageStyle : descriptionStyle]}
                        label={isFloating ? floatingLabel || '' : null}
                        labelFontSize={labelFontSize || 12}
                        labelOffset={labelOffset || null}
                        textColor={textColor || theme.TextField.textColor}
                        tintColor={tintColor || theme.TextField.tintColor || theme.TextField.placeholderTextColor}
                        labelColor={!disabled ? labelColor || theme.TextField.textColor : placeholderColor || theme.TextField.placeholderTextColor}
                        baseColor={
                            placeholderColor || theme.TextField.placeholderTextColor
                        }
                        lineWidth={isTintedUnderlineRequired ? 1 : 0}
                        activeLineWidth={isTintedUnderlineRequired ? 1 : 0}
                        placeholder={
                            !isFloating || isStaticLabel ||
                                (isFloating && showPlaceHolderForFloating)
                                ? placeholder
                                : null
                        }
                        error={errorMessage || null}
                        errorColor={errorColor || theme.TextField.errorColor}
                        title={descriptionMessage || null}
                        renderRightAccessory={() => getAccessoryView()}
                        renderLeftAccessory={() => getLeftAccessoryView()}
                        ref={inputRef}
                        placeholderTextColor={!isFloating ? placeholderColor || '' : placeholderColor || null}
                        underlineColorAndroid='transparent'
                        multiline={multiline}
                        disabledLineType={'solid'}
                        secureTextEntry={shouldEncryptedTextBeVisible}
                        numberOfLines={multiline ? numberOfLines : 1}
                        returnKeyType={returnKeyType}
                        onChangeText={(value) => onTextChanged(value)}
                        value={value}
                        onFocus={onFocus.bind(this)}
                        onBlur={onBlur.bind(this)}
                        responsive={false}
                        blurOnSubmit={blurOnSubmit}
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoCompleteType={'off'}
                        maxLength={
                            props.maxLength || getMaxLength(props.type)
                        }
                        accessibilityLabel={ accessibilityLabel ? accessibilityLabel: accessibilityId(
                            testID ? testID :getAccessibilityLabel(floatingLabel || props.name || 'textfield'), (floatingLabel || props.name)
                          )}
                        testID={testID ? testID: getAccessibilityLabel(floatingLabel || props.name || 'textfield')}
                    >
                        {props.children}
                    </TextField>
                </View>
                {getTextFieldUnderline()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerView: {
        flex: 0,
        height: 60,
        flexDirection: 'column',
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: Theme.TextField.backgroundColor
    },
    underlineContainerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.transparent
    },
    textInputContainerView: {
        flex: 1
    },
    rounded: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Theme.TextField.borderColor
    },
    rectangular: {
        alignContent: 'flex-end'
    },
    text: {
        fontFamily: Fonts.Regular,
        fontSize: FontSize.Large1,
        ...Platform.select({
            android: {
                paddingTop: -10,
                paddingBottom: -10
            }
        }),
        marginHorizontal: 2
    },
    descriptionStyle: {
        fontFamily: Fonts.Regular,
        fontSize: FontSize.Mini,
        ...Platform.select({
            android: {
                paddingTop: -10,
                paddingBottom: -10
            }
        })
    },
    underline: {
        flex: 0.01
    },
    image: {
        marginTop: 10,
        width: 20,
        height: 20,
    },
    rightAccessory: {
        width: 30,
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    leftAccessory: {
        alignItems: 'flex-start',
    },
    labelTextStyle: {
        marginLeft: -30
    }
});

UITextField.defaultProps = {
    theme: Theme,
    type: TEXTFIELD_TYPES.default,
    shape: TEXTFIELD_SHAPES.rectangular,
    underlineType: TEXTFIELD_UNDERLINESTYLE.textMatch,
    numberOfLines: 1,
    isFloating: true,
    isStaticLabel: false,
    editable: true,
    autoCorrect: false,
    returnKeyType: 'done',
    autoFocus: false,
    placeholderColor: Theme.TextField.placeholderTextColor,
    showClearButton: false,
    showShowHideButton: false,
    showLeftSearchButton: false,
    leftAccessoryImage: {
        source: '',
        resizeMode: 'center'
    },
    blurOnSubmit: true
};

UITextField.propTypes = {
    theme: PropTypes.object,
    type: PropTypes.oneOf(TEXTFIELD_TYPES),
    shape: PropTypes.oneOf(TEXTFIELD_SHAPES),
    isFloating: PropTypes.bool,
    isStaticLabel: PropTypes.bool,
    underlineType: PropTypes.oneOf(TEXTFIELD_UNDERLINESTYLE),
    errorMessage: PropTypes.string,
    descriptionMessage: PropTypes.string,
    descriptionStyle: PropTypes.shape({
        ...ViewPropTypes.style
    }),
    textStyle: PropTypes.shape({
        ...ViewPropTypes.style
    }),
    textColor: PropTypes.string,
    floatingLabel: PropTypes.string,
    placeholder: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    underLineColor: PropTypes.string,
    placeholderColor: PropTypes.string,
    labelColor: PropTypes.string,
    numberOfLines: PropTypes.number,
    multiline: PropTypes.bool,
    returnKeyType: PropTypes.string,
    onChangeText: PropTypes.func,
    onSecureTextModeChange: PropTypes.func,

    leftAccessoryView: PropTypes.func,
    rightAccessoryView: PropTypes.func,
    leftButton: PropTypes.func,
    clearButton: PropTypes.func,
    showButton: PropTypes.func,
    hideButton: PropTypes.func,

    containerStyle: PropTypes.shape({
        ...ViewPropTypes.style
    }),
    inputContainerStyle: PropTypes.shape({
        ...ViewPropTypes.style
    }),
    underlineStyle: PropTypes.shape({
        ...ViewPropTypes.style
    }),
    leftAccessoryImage: PropTypes.shape({
        source: PropTypes.any,
        resizeMode: PropTypes.string,
        style: PropTypes.shape({
            ...Image.propTypes.style
        })
    }),
    showClearButton: PropTypes.bool,
    showShowHideButton: PropTypes.bool,
    showLeftSearchButton: PropTypes.bool,
    clearButtonStyle: PropTypes.shape({}),
    rightButtonStyle: PropTypes.shape({}),
    autoFocus: PropTypes.bool,
    clearButtonImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    showButtonImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    hideButtonImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    leftButtonImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    accessibilityLabel: PropTypes.string,
    testID: PropTypes.string
};
