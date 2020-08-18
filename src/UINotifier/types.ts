import {NotificationComponentProps} from './components/Notification';

export interface ShowParams {
  /** How fast notification will appear/disappear
   * @default 300 */
  animationDuration?: number;

  /** How fast notification will appear.
   * @default animationDuration || 300 */
  showAnimationDuration?: number;

  /** How fast notification will disappear.
   * @default animationDuration || 300 */
  hideAnimationDuration?: number;

  /** Animation easing. Details: https://reactnative.dev/docs/easing
   * @default null */
  easing?: (value: number) => number;

  /** Show Animation easing.
   * @default easing || null */
  showEasing?: (value: number) => number;

  /** Hide Animation easing.
   * @default easing || null */
  hideEasing?: (value: number) => number;

  /** Function called when notification started hiding
   * @default null */
  onStartHiding?: Function;

  /** Function called when notification completely hidden
   * @default null */
  onHidden?: Function;

  /** Function called when user press on notification
   * @default null */
  onPress?: Function;

  /** Should notification hide when user press on it
   * @default false */
  hideOnPress?: boolean;

  /** How many pixels user should swipe-up notification to dismiss it
   * @default 20 */
  swipePixelsToClose?: number;

  /** Animation easing after user finished swiping
   * @default null */
  swipeEasing?: (value: number) => number;

  /** How fast should be animation after user finished swiping
   * @default 200 */
  swipeAnimationDuration?: number;

  /** Time after notification will disappear. Set to `0` to not hide notification automatically
   * @default 3000 */
  duration?: number;
}

export type ColorTheme = 'dark' | 'light';
export type QueueMode = 'immediate' | 'next' | 'standby' | 'reset';

type ComponentProps = NotificationComponentProps | object;

export interface ShowNotificationParams extends ShowParams {
  /** Title of notification. __Passed to `Component`.__
   * @default null */
  title?: string;

  /** Description of notification. __Passed to `Component`.__
   * @default null */
  description?: string;

  /** Can notification be hidden by swiping it out
   * @default true */
  swipeEnabled?: boolean;

  /** Component of the notification body. You can use one of the [built-in components](https://github.com/seniv/react-native-notifier#components), or your [custom component](https://github.com/seniv/react-native-notifier#custom-component).
   * @default NotifierComponents.Notification */
  Component?: Function;

  /** Additional props that are passed to `Component`. See all available props of built-in components in the [components section](https://github.com/seniv/react-native-notifier#components)
   * @default {} */
  componentProps?: ComponentProps;

  /** Determines the order in which notifications are shown. Read more in the [Queue Mode](https://github.com/seniv/react-native-notifier#queue-mode) section.
   * @default 'reset' */
  queueMode?: QueueMode;

  /** Notification theme
   * @default light */
  colorTheme?: ColorTheme;
}

export interface StateInterface {
  title?: string;
  description?: string;
  swipeEnabled: boolean;
  Component: Function;
  componentProps: ComponentProps;
  colorTheme?: ColorTheme;
}

export type EndResult = {finished: boolean};
export type EndCallback = (result: EndResult) => void;

export interface NotifierInterface {
  showNotification: (params: ShowNotificationParams) => void;
  hideNotification: (onHidden?: EndCallback) => void;
}
