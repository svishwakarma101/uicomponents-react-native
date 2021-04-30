import {Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export const MIN_TRANSLATE_X = -deviceWidth;
export const MAX_TRANSLATE_X = deviceWidth;
export const MIN_TRANSLATE_Y = -1000;
export const MAX_TRANSLATE_Y = 0;
export const DEFAULT_COMPONENT_HEIGHT = 200;
export const DEFAULT_DURATION = 3000;
export const DEFAULT_ANIMATION_DURATION = 400;
export const SWIPE_PIXELS_TO_CLOSE = deviceWidth / 2.5;
export const SWIPE_ANIMATION_DURATION = 200;
export const DEFAULT_SWIPE_ENABLED = true;
export const DEFAULT_COLOR_THEME = 'light';
