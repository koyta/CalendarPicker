// Type definitions for react-native-calendar-picker yamoney-react-native-calendar-picker (fork from 6.1.4)

import * as React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Moment, MomentInput } from 'moment';

export default class CalendarPicker extends React.Component<CalendarPickerProps> {
  handleOnPressDay(day: number): void;
  handleOnPressNext(): void;
  handleOnPressPrevious(): void;
  resetSelections(): void;
}

export interface CalendarPickerProps {
  allowBackwardRangeSelect?: boolean;
  allowRangeSelection?: boolean;
  customDatesStyles?: CustomDateStyle[];
  customDatesStylesPriority?: 'dayOfWeek' | 'customDates';
  dayLabelsWrapper?: StyleProp<ViewStyle>;
  dayOfWeekStyles?: DayOfWeekStyle;
  dayShape?: 'circle' | 'square';
  disabledDates?: Date[] | DisabledDatesFunc;
  disabledDatesTextStyle?: StyleProp<TextStyle>;
  enableDateChange?: boolean;
  enableSwipe?: boolean;
  headingLevel?: number;
  height?: number;
  initialDate?: Date;
  maxDate?: Date;
  maxRangeDuration?: number | MaxDurationArrayItem[];
  minDate?: Date;
  minRangeDuration?: number | MinDurationArrayItem[];
  months?: string[];
  monthYearHeaderWrapperStyle?: StyleProp<ViewStyle>;
  nextComponent?: React.ReactNode;
  nextTitle?: string;
  nextTitleStyle?: StyleProp<TextStyle>;
  onDateChange?: DateChangedCallback;
  onMonthChange?: DateChangedCallback;
  onMonthControlPress?: () => void;
  onMonthSelect?: (date: Date) => void;
  onSwipe?: SwipeCallback;
  onYearControlPress?: () => void;
  previousComponent?: React.ReactNode;
  previousTitle?: string;
  previousTitleStyle?: StyleProp<TextStyle>;
  restrictMonthNavigation?: boolean;
  scaleFactor?: number;
  selectedDayColor?: string;
  selectedDayStyle?: StyleProp<ViewStyle>;
  selectedDayTextColor?: string;
  selectedEndDate?: Date;
  selectedMonthStyle?: StyleProp<ViewStyle>;
  selectedMonthTextStyle?: StyleProp<TextStyle>;
  selectedRangeEndStyle?: StyleProp<ViewStyle>;
  selectedRangeEndTextStyle?: StyleProp<TextStyle>;
  selectedRangeStartStyle?: StyleProp<ViewStyle>;
  selectedRangeStartTextStyle?: StyleProp<TextStyle>;
  selectedRangeStyle?: StyleProp<ViewStyle>;
  selectedStartDate?: Date;
  selectedYearStyle?: StyleProp<ViewStyle>;
  selectedYearTextStyle?: StyleProp<TextStyle>;
  selectMonthTitle?: string;
  selectYearTitle?: string;
  shouldControlViewViaProps?: boolean;
  showDayStragglers?: boolean;
  startFromMonday?: boolean;
  sundayColor?: string;
  swipeConfig?: SwipeConfig;
  textStyle?: StyleProp<TextStyle>;
  todayBackgroundColor?: string;
  todayTextStyle?: StyleProp<TextStyle>;
  view?: CalendarViews;
  weekdays?: string[];
  width?: number;
}

export type CalendarViews = 'days' | 'months' | 'years';

export type DayOfWeekStyle = {
  [key in '0' | '1' | '2' | '3' | '4' | '5' | '6']?: TextStyle;
};

export type DisabledDatesFunc = (date: Moment) => boolean;

export type MomentParsable = MomentInput;

export interface MinDurationArrayItem {
  date: MomentParsable;
  minDuration: number;
}

export interface MaxDurationArrayItem {
  date: MomentParsable;
  maxDuration: number;
}

export interface CustomDateStyle {
  date: MomentParsable;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export type DateChangedCallback = (date: Moment, type?: 'START_DATE' | 'END_DATE') => void;

export interface SwipeConfig {
  velocityThreshold?: number;
  directionalOffsetThreshold?: number;
}
export type SwipeDirection = 'SWIPE_LEFT' | 'SWIPE_RIGHT' | 'SWIPE_UP' | 'SWIPE_DOWN';

export type SwipeCallback = (swipeDirection: SwipeDirection) => void;
