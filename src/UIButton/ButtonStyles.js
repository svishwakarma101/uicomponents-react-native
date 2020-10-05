import { StyleSheet } from 'react-native'
import { APPLIED_THEME as Theme } from '../utils/Constants'
import { Fonts, FontSize, Colors } from '../utils/StyleSheet'
import {getAdjustedFontSize} from '../utils/Fonts'

export const ButtonStyles = StyleSheet.create({
    primaryButton: {
      height: 44,
      backgroundColor: Theme.PrimaryButton.backgroundColor,
      borderRadius: 4,
      alignSelf: 'stretch',
      justifyContent: 'center',
      borderColor: Theme.PrimaryButton.borderColor,
    },
    secondaryButton: {
      height: 44,
      backgroundColor: Theme.SecondaryButton.backgroundColor,
      borderWidth: 2,
      borderColor: Theme.SecondaryButton.borderColor,
      borderRadius: 4,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    disabledButton: {
      height: 44,
      backgroundColor: Theme.DisabledPrimaryButton.backgroundColor,
      borderWidth: 1,
      borderColor: Theme.DisabledPrimaryButton.borderColor,
      borderRadius: 4,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    disabledSecondaryButton: {
      height: 44,
      backgroundColor: Theme.DisabledSecondaryButton.backgroundColor,
      borderColor: Theme.DisabledSecondaryButton.borderColor,
      borderRadius: 4,
      alignSelf: 'stretch',
      justifyContent: 'center',
      borderWidth: 2,
      fontWeight: 'bold',
    },
    gradientButton: {
      height: 60,
      backgroundColor: Theme.GradientButton.backgroundColorGradientStart,
      borderRadius: 4,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    transparentButton: {
      flex: 0,
      backgroundColor: Theme.TransparentButton.backgroundColor,
      borderWidth: 0,
      borderColor: Theme.TransparentButton.borderColor,
      borderRadius: 0,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    defaultButtonType: {
      height: 44,
      backgroundColor: Theme.DefaultButton.backgroundColor,
      borderWidth: 1,
      borderColor: Theme.DefaultButton.borderColor,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    linkButtonStyle: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: Colors.transparent,
      borderColor: Colors.transparent,
      borderWidth: 0,
    },
    defaultShapeButton: {
      borderRadius: 4,
    },
    roundedEdgeButton: {
      borderRadius: 10,
    },
    roundButton: {
      borderRadius: 30,
    },
    squareButton: {
      borderRadius: 0,
    },
    linkButtonTextStyle: {
      // fontFamily: Fonts.BrandSemibold,
      fontSize: getAdjustedFontSize(FontSize.Medium),
      color: Colors.linkTextColor
    },
    title: {
      textAlign: 'center',
      // fontFamily: Fonts.Heavy,
      fontSize: FontSize.Medium,
      backgroundColor: 'transparent',
      fontWeight: 'bold'
    },
    titleView: {
      justifyContent: 'center',
      // marginHorizontal: '10%'
    },
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentWithIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: '10%',
    }
  })