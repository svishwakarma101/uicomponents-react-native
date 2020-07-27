import { Dimensions, Platform } from 'react-native';
const deviceWidth = Dimensions.get('window').width;

export const getAdjustedFontSize = size => {
  // eslint-disable-next-line radix
  if (Platform.OS === 'ios' && Platform.isPad) {
    return getFontForIpad(size)
  } else {
    return getFontForIPhone(size)
  }
}

export function getFontForIpad(size){
  return parseInt(size) * deviceWidth * (2.8 - 0.002 * deviceWidth) / 700;
}

export function getFontForIPhone(size){
  return parseInt(size) * deviceWidth * (1.8 - 0.002 * deviceWidth) / 400;
}