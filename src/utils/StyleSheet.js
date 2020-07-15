/**
 *
 */

export const Fonts = {
  Roman: 'AvenirLTStd-Roman',
  Heavy: 'AvenirLTStd-Heavy',
  Light: 'AvenirLTStd-Light',
  Medium: 'AvenirLTStd-Medium',
  Black: 'AvenirLTStd-Black',
  Book: 'AvenirLTStd-Book',

  BrandBlack: 'Averta-Black',
  BrandBold: 'Averta-Bold',
  BrandExtrabold: 'Averta-Extrabold',
  BrandSemibold: 'Averta-Semibold',
  BrandLight: 'Averta-Light',
  BrandRegular: 'Averta-Regular',
  BrandThin: 'Averta-Thin',
  BrandExtraThin: 'Averta-ExtraThin'
};

export const FontSize = {
  Micro: 8,
  Mini: 10,
  XSmall: 12,
  Small: 14,
  Medium: 16,
  Large1: 18,
  Large2: 20,
  Large3: 22,
  Large4: 23,
  XLarge: 24,
  XXLarge: 28,
  XXXLarge: 32,
  Huge: 36
};
export const Colors = {
  /* COMMON */
  /* screen background color */
  screenBgColor: '#fff',
  separatorColor: '#efefef',
  creamColor: '#f4f4f4',
  searchPlaceholderGray: '#a7a7a7',

  /*form elements color*/
  radioBtnBorderColor: '#3b98fc',
  inputBgColor: '#fff',
  fieldPlaceholderColor: '#86888A',
  fieldTextColor: '#86888A',
  darkGray: '#6a6c6e',

  /* button style */
  buttonBgColor: '#202859',
  buttonTextColor: '#fff',

  /* link text style */
  linkColor: '#70cff3',

  noteColor: '#888888',

  formTitleColor: '#000',

  disabledBtnBgColor: '#f2f2f2',
  disabledBtnTextColor: '#bfbfc0',

  errMessageColor: '#d40000',

  /*text input colors*/
  borderColor: '#E4E7EA',

  backBtnColor: '#52A8DC',
  sectionTitleColor: '#181C47',
  sectionSeparatorLineColor: '#202859',

  transparent: 'transparent',

  /*Screen Specific*/

  /*onboarding screen*/
  registerBtnBgColor: '#52a8dd',
  cyanBtnColor: '#00DAF9',

  /*Login and Sign Up screen*/
  disabledGray: '#f8f8f8',
  normalTextColor: '#a2a0a0',
  Red: '#f92929',
  LightestGray: '#f5f5f5',
  LightGray: '#b6b6b6',
  Green: '#57b578',
  Blue: '#202859',
  BlueLight: '#52a8dd',
  grayMedium: '#e4e4e4',
  Disable: '#9b9b9b',
  White: '#ffffff',
  DenimBlue: '#354087',
  TextBg: '#46aeee',
  DarkBlue: '#354087',
  SkyBlue: '#46aeee',
  Black: '#000',
  PageTitle: '#354087',
  BtnBgColor: '#354087',
  BorderSeparatorColor: '#bfbfbf',
  currencyConverterTextColor: '#46aeee',
  SecondaryButtonBg: '#fff',
  SecondaryButtonText: '#46aeee',
  CurrencyText: '#354087',
  SuccessMsg: '#57b578',
  textFieldValue: '#354087',
  labelColor: '#202859',
  overlay: 'rgba(0, 0, 0, 0.5)',
  activityIndicator: '#b6b6b6',
  Orange: '#f7a454',
  ErrRed: '#f77961',
  FieldBlueColor: '#46aeee',
  TextColor: '#a7a7a7',
  timelineDotLight: '#08abdf',
  LightText: '#c1c1c1',
  timeLineBorderColor: '#ebebeb',
  transactionSummarySeparator: '#efefef',
  cardBorder: '#efefef',
  transparent: 'rgba(0,0,0,0)',

  /* Send Money */
  infoText: '#949494',
  transactionSummaryText: '#a7a7a7',
  transactionSummaryHighBr: '#354087',

  optionDotColor: '#00a9df',

  myInfoText: '#9b9b9b',

  gray: '#979797',
  grayShadeText: '#9b9b9b',
  blinkerColor: '#7ed321',

  /*Card */

  blueGradientStart: '#2974D2',
  blueGradientMid: '#253494',
  blueGradientEnd: '#1F2C80',
  blueGray: '#8FA3C1',
  blueGrayBorderLight: '#E6E9F0',
  headerGray: '#E9EAF4',
  cardOverlay: 'rgba(0, 19, 45, 0.8)',

  /*AmazeCard */
  purpleDark: '#300551',
  purpleMild: '#AC37EB',
  purpleGradientStart: '#AF37EB',
  purpleGradientEnd: '#8500CD',
  greyMid: '#746F9F',
  greenSuccess: '#00A8A6',
  purpleLight: '#E7BAFF',
  grayMild: '#746F9F',
  grayDark: '#393939',
  grayLight: '#DFDEEA',
  brandPurple: '#752EFF',
  brandGreen: '#00DBD8',
  brandYellow: '#FED931',
  brandPink: '#00DBD8'
};

export const Themes = {
  Light: {
    PrimaryButton: {
      textColor: Colors.White,
      backgroundColor: Colors.buttonBgColor,
      borderColor: Colors.buttonBgColor,
      activeTextColor: Colors.White,
      activeBackgroundColor: Colors.buttonBgColor,
      activeBorderColor: Colors.buttonBgColor
    },
    SecondaryButton: {
      textColor: Colors.buttonBgColor,
      backgroundColor: Colors.transparent,
      borderColor: Colors.buttonBgColor,
      activeTextColor: Colors.buttonBgColor,
      activeBackgroundColor: Colors.transparent,
      activeBorderColor: Colors.buttonBgColor
    },
    DisabledButton: {
      textColor: Colors.greyMid,
      backgroundColor: Colors.transparent,
      borderColor: Colors.greyMid,
      activeTextColor: Colors.greyMid,
      activeBackgroundColor: Colors.transparent,
      activeBorderColor: Colors.greyMid
    },
    GradientButton: {
      textColor: Colors.White,
      backgroundColorGradientStart: Colors.blueGradientStart,
      backgroundColorGradientMid: Colors.blueGradientMid,
      backgroundColorGradientEnd: Colors.blueGradientEnd,
      activeTextColor: Colors.White,
      activeBackgroundColor: Colors.buttonBgColor,
      activeBorderColor: Colors.buttonBgColor
    },
    TransparentButton: {
      textColor: Colors.buttonBgColor,
      backgroundColor: Colors.transparent,
      borderColor: Colors.transparent,
      activeTextColor: Colors.buttonBgColor,
      activeBackgroundColor: Colors.transparent,
      activeBorderColor: Colors.transparent
    },
    DefaultButton: {
      textColor: Colors.DenimBlue,
      backgroundColor: Colors.White,
      borderColor: Colors.White,
      activeTextColor: Colors.DenimBlue,
      activeBackgroundColor: Colors.White,
      activeBorderColor: Colors.White
    },
    Overlay: {
      backgroundColor: Colors.cardOverlay
    },
    Swiper: {
      pageIndicatorTintColor: Colors.greyMid,
      currentPageIndicatorTintColor: Colors.blueGradientMid
    },
    TabBar: {
      backgroundColor: Colors.White,
      inactiveTintColor: Colors.greyMid,
      activeTintColor: Colors.blueGradientMid
    },
    Onboarding: {
      textColor: Colors.White,
      backgroundColor: Colors.blueGradientMid,
      pageIndicatorTintColor: Colors.White,
      currentPageIndicatorTintColor: Colors.White
    },
    TextField: {
      backgroundColor: Colors.transparent,
      borderColor: Colors.blueGrayBorderLight,
      underLineColor: Colors.blueGrayBorderLight,
      underLineColorFocus: Colors.blueGrayBorderLight,
      placeholderTextColor: Colors.blueGray,
      textColor: Colors.DenimBlue
    },
    Alert: {
      textColor: Colors.blueGradientMid,
      backgroundColor: Colors.transparent,
      primaryTickColor: Colors.blueGradientMid,
      secondaryTickColor: Colors.blueGradientMid,
      secondaryTickBackgroundColor: Colors.blueGradientMid
    },
    StreamInputField: {
      backgroundColor: Colors.LightestGray,
      activeBackgroundColor: Colors.blueGradientMid,
      borderColor: Colors.grayShadeText,
      activeBorderColor: Colors.blueGradientMid,
      placeholderTextColor: Colors.grayShadeText,
      textColor: Colors.blueGradientMid,
      secondaryTextColor: Colors.White
    },
    AttributedText: {
      textColor: Colors.blueGray,
      attributedTextColor: Colors.blueGradientMid
    },
    SnackBar: {
      backgroundColor: Colors.White,
      buttonBackgroundColor: Colors.blueGradientMid,
      buttonTitleColor: Colors.White,
      textColor: Colors.blueGradientMid,
      borderColor: Colors.blueGradientMid,
      shadowColor: Colors.LightGray,
      nativeBackgroundColor: Colors.grayDark,
      nativeTextColor: Colors.White,
      nativeButtonTitleColor: Colors.Orange
    }
  },

  Dark: {
    PrimaryButton: {
      textColor: Colors.blueGradientMid,
      backgroundColor: Colors.White,
      borderColor: Colors.White,
      activeTextColor: Colors.blueGradientMid,
      activeBackgroundColor: Colors.White,
      activeBorderColor: Colors.White
    },
    SecondaryButton: {
      textColor: Colors.White,
      backgroundColor: Colors.transparent,
      borderColor: Colors.White,
      activeTextColor: Colors.White,
      activeBackgroundColor: Colors.transparent,
      activeBorderColor: Colors.White
    },
    DisabledButton: {
      textColor: Colors.White,
      backgroundColor: Colors.transparent,
      borderColor: Colors.greyMid,
      activeTextColor: Colors.White,
      activeBackgroundColor: Colors.transparent,
      activeBorderColor: Colors.greyMid
    },
    GradientButton: {
      textColor: Colors.White,
      backgroundColorGradientStart: Colors.blueGradientStart,
      backgroundColorGradientMid: Colors.blueGradientMid,
      backgroundColorGradientEnd: Colors.blueGradientEnd,
      activeTextColor: Colors.White,
      activeBackgroundColor: Colors.buttonBgColor,
      activeBorderColor: Colors.buttonBgColor
    },
    TransparentButton: {
      textColor: Colors.buttonBgColor,
      backgroundColor: Colors.transparent,
      borderColor: Colors.transparent,
      activeTextColor: Colors.buttonBgColor,
      activeBackgroundColor: Colors.transparent,
      activeBorderColor: Colors.transparent
    },
    DefaultButton: {
      textColor: Colors.White,
      backgroundColor: Colors.blueGradientMid,
      borderColor: Colors.blueGradientMid,
      activeTextColor: Colors.White,
      activeBackgroundColor: Colors.blueGradientMid,
      activeBorderColor: Colors.blueGradientMid
    },
    Overlay: {
      backgroundColor: Colors.cardOverlay
    },
    Swiper: {
      pageIndicatorTintColor: Colors.greyMid,
      currentPageIndicatorTintColor: Colors.blueGradientMid
    },
    TabBar: {
      backgroundColor: Colors.Black,
      inactiveTintColor: Colors.greyMid,
      activeTintColor: Colors.White
    },
    Onboarding: {
      textColor: Colors.White,
      backgroundColor: Colors.blueGradientMid,
      pageIndicatorTintColor: Colors.White,
      currentPageIndicatorTintColor: Colors.White
    },
    TextField: {
      backgroundColor: Colors.transparent,
      borderColor: Colors.blueGrayBorderLight,
      underLineColor: Colors.blueGrayBorderLight,
      underLineColorFocus: Colors.blueGrayBorderLight,
      placeholderTextColor: Colors.blueGray,
      textColor: Colors.blueGradientMid
    },
    Alert: {
      textColor: Colors.blueGradientMid,
      backgroundColor: Colors.transparent,
      primaryTickColor: Colors.blueGradientMid,
      secondaryTickColor: Colors.blueGradientMid,
      secondaryTickBackgroundColor: Colors.blueGradientMid
    },
    StreamInputField: {
      backgroundColor: Colors.LightestGray,
      activeBackgroundColor: Colors.blueGradientMid,
      borderColor: Colors.grayShadeText,
      activeBorderColor: Colors.blueGradientMid,
      placeholderTextColor: Colors.grayShadeText,
      textColor: Colors.purpleMild,
      secondaryTextColor: Colors.White
    },
    AttributedText: {
      textColor: Colors.blueGray,
      attributedTextColor: Colors.blueGradientMid
    },
    SnackBar: {
      backgroundColor: Colors.White,
      buttonBackgroundColor: Colors.blueGradientMid,
      buttonTitleColor: Colors.White,
      textColor: Colors.blueGradientMid,
      borderColor: Colors.blueGradientMid,
      shadowColor: Colors.LightGray,
      nativeBackgroundColor: Colors.grayDark,
      nativeTextColor: Colors.White,
      nativeButtonTitleColor: Colors.Orange
    }
  }
};
