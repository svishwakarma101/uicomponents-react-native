import React from "react";
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
} from "react-native";
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import { Notification as NotificationComponent } from "./components";

import style from "./Notifier.styles";
import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_DURATION,
  MAX_TRANSLATE_Y,
  MIN_TRANSLATE_Y,
  SWIPE_ANIMATION_DURATION,
  SWIPE_PIXELS_TO_CLOSE,
  DEFAULT_SWIPE_ENABLED,
  DEFAULT_COMPONENT_HEIGHT,
  DEFAULT_COLOR_THEME,
  MAX_TRANSLATE_X,
  MIN_TRANSLATE_X,
} from "./constants";
import {
  ShowParams,
  ShowNotificationParams,
  StateInterface,
  EndCallback,
  NotifierInterface,
} from "./types";

export const UINotifier: NotifierInterface = {
  showNotification: () => {},
  hideNotification: () => {},
};

export class NotifierRoot extends React.PureComponent<
  ShowNotificationParams,
  StateInterface
> {
  private isShown: boolean;
  private isHiding: boolean;
  private hideTimer: any;
  private showParams: ShowParams | null;
  private callStack: Array<ShowNotificationParams>;
  private hiddenComponentValue: number;
  private readonly translateY: Animated.Value;
  private readonly translateYInterpolated: Animated.AnimatedInterpolation;
  private readonly translateX: Animated.Value;
  private readonly translateXInterpolated: Animated.AnimatedInterpolation;
  private readonly onGestureEvent: (...args: any[]) => void;

  constructor(props: ShowNotificationParams) {
    super(props);

    this.state = {
      Component: NotificationComponent,
      swipeEnabled: DEFAULT_SWIPE_ENABLED,
      componentProps: {},
    };
    this.isShown = false;
    this.isHiding = false;
    this.hideTimer = null;
    this.showParams = null;
    this.callStack = [];
    this.hiddenComponentValue = -DEFAULT_COMPONENT_HEIGHT;

    this.translateY = new Animated.Value(MIN_TRANSLATE_Y);
    this.translateX = new Animated.Value(0);

    this.translateYInterpolated = this.translateY.interpolate({
      inputRange: [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
      outputRange: [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
      extrapolate: "clamp",
    });

    this.translateXInterpolated = this.translateX.interpolate({
      inputRange: [MIN_TRANSLATE_X, 0, MAX_TRANSLATE_X],
      outputRange: [MIN_TRANSLATE_X, 0, MAX_TRANSLATE_X],
      extrapolate: "clamp",
    });

    this.onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
          },
        },
      ],
      { useNativeDriver: true }
    );

    this.onPress = this.onPress.bind(this);
    this.onHandlerStateChange = this.onHandlerStateChange.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.hideNotification = this.hideNotification.bind(this);

    UINotifier.showNotification = this.showNotification;
    UINotifier.hideNotification = this.hideNotification;
  }

  componentWillUnmount() {
    clearTimeout(this.hideTimer);
  }

  public hideNotification(callback?: EndCallback) {
    if (!this.isShown || this.isHiding) {
      return;
    }

    Animated.timing(this.translateY, {
      toValue: this.hiddenComponentValue,
      easing: this.showParams?.hideEasing ?? this.showParams?.easing,
      duration:
        this.showParams?.hideAnimationDuration ??
        this.showParams?.animationDuration ??
        DEFAULT_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start((result) => {
      this.onHidden();
      callback?.(result);
    });

    this.onStartHiding();
  }

  public showNotification(functionParams: ShowNotificationParams) {
    const params = {
      ...this.props,
      ...functionParams,
      componentProps: {
        ...this.props?.componentProps,
        ...functionParams?.componentProps,
      },
    };

    if (this.isShown) {
      switch (params.queueMode) {
        case "standby": {
          this.callStack.push(params);
          break;
        }
        case "next": {
          this.callStack.unshift(params);
          break;
        }
        case "immediate": {
          this.callStack.unshift(params);
          this.hideNotification();
          break;
        }
        default: {
          this.callStack = [params];
          this.hideNotification();
          break;
        }
      }
      return;
    }

    const {
      title,
      description,
      swipeEnabled,
      Component,
      componentProps,
      colorTheme,
      ...restParams
    } = params;

    this.setState({
      title,
      description,
      Component: Component ?? NotificationComponent,
      swipeEnabled: swipeEnabled ?? DEFAULT_SWIPE_ENABLED,
      componentProps: componentProps,
      colorTheme: colorTheme ?? DEFAULT_COLOR_THEME,
    });

    this.showParams = restParams;
    this.isShown = true;

    this.setHideTimer();

    this.translateY.setValue(-DEFAULT_COMPONENT_HEIGHT);
    Animated.timing(this.translateY, {
      toValue: MAX_TRANSLATE_Y,
      easing: this.showParams?.showEasing ?? this.showParams?.easing,
      duration:
        this.showParams?.showAnimationDuration ??
        this.showParams?.animationDuration ??
        DEFAULT_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }

  private setHideTimer() {
    const { duration = DEFAULT_DURATION } = this.showParams ?? {};
    clearTimeout(this.hideTimer);
    if (duration && !isNaN(duration)) {
      this.hideTimer = setTimeout(this.hideNotification, duration);
    }
  }

  private onStartHiding() {
    this.showParams?.onStartHiding?.();
    this.isHiding = true;
    clearTimeout(this.hideTimer);
  }

  private onHidden() {
    this.showParams?.onHidden?.();
    this.isShown = false;
    this.isHiding = false;
    this.showParams = null;
    this.translateY.setValue(MIN_TRANSLATE_Y);
    this.translateX.setValue(0);

    const nextNotification = this.callStack.shift();
    if (nextNotification) {
      this.showNotification(nextNotification);
    }
  }

  private onHandlerStateChange({
    nativeEvent,
  }: PanGestureHandlerStateChangeEvent) {
    if (nativeEvent.state === State.ACTIVE) {
      clearTimeout(this.hideTimer);
    }
    if (nativeEvent.oldState !== State.ACTIVE) {
      return;
    }
    this.setHideTimer();

    const swipePixelsToClose =
      this.showParams?.swipePixelsToClose ?? SWIPE_PIXELS_TO_CLOSE;
    const isSwipedOut = Math.abs(nativeEvent.translationX) > swipePixelsToClose;
    const isSwipedLeft = nativeEvent.translationX < 0 ? true : false;
    const value = isSwipedLeft ? -800 : 800;
    Animated.timing(this.translateX, {
      toValue: isSwipedOut ? value : MAX_TRANSLATE_Y,
      easing: this.showParams?.swipeEasing,
      duration:
        this.showParams?.swipeAnimationDuration ?? SWIPE_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      if (isSwipedOut) {
        this.onHidden();
      }
    });

    if (isSwipedOut) {
      this.onStartHiding();
    }
  }

  private onPress() {
    this.showParams?.onPress?.();
    if (this.showParams?.hideOnPress === true) {
      this.hideNotification();
    }
  }

  private onLayout({ nativeEvent }: LayoutChangeEvent) {
    const heightWithMargin = nativeEvent.layout.height + 50;
    this.hiddenComponentValue = -Math.max(
      heightWithMargin,
      DEFAULT_COMPONENT_HEIGHT
    );
  }

  render() {
    const {
      title,
      description,
      swipeEnabled,
      Component,
      componentProps,
      colorTheme,
    } = this.state;

    return (
      <PanGestureHandler
        enabled={swipeEnabled}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View
          style={[
            style.container,
            {
              transform: [
                { translateY: this.translateYInterpolated },
                { translateX: this.translateXInterpolated },
              ],
            },
          ]}
        >
          <TouchableWithoutFeedback onPress={this.onPress}>
            <View onLayout={this.onLayout}>
              <Component
                title={title}
                description={description}
                colorTheme={colorTheme}
                {...componentProps}
              />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}
