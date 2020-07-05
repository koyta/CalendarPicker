import React, {memo, useCallback, useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Utils} from './Utils';
import {DatePropType, TextPropType, ViewPropType} from './constants';

function Month(props) {
  const {
    months,
    month,
    currentMonth,
    currentYear,
    styles,
    onSelectMonth,
    textStyle,
    minDate,
    maxDate,
    selectedMonthStyle,
    selectedMonthTextStyle,
  } = props;

  const monthName = useMemo(() => {
    const MONTHS = months || Utils.MONTHS;
    return MONTHS[month];
  }, [month, months]);

  let monthOutOfRange;
  let monthIsBeforeMin = false;
  let monthIsAfterMax = false;
  let monthIsDisabled = false;

  // Check whether currentMonth is outside of min/max range.
  if (maxDate) {
    monthIsAfterMax = month > maxDate.month();
  }
  if (minDate) {
    monthIsBeforeMin = month < minDate.month();
  }

  // ToDo: disabledMonths props to disable months separate from disabledDates

  monthOutOfRange = monthIsAfterMax || monthIsBeforeMin || monthIsDisabled;

  const onSelect = useCallback(() => {
    let _year = currentYear;
    if (minDate && (currentYear < minDate.year())) {
      _year = minDate.year();
    }
    if (maxDate && (currentYear > maxDate.year())) {
      _year = maxDate.year();
    }
    onSelectMonth({month, year: _year});
  }, [currentYear, minDate, maxDate, onSelectMonth, month]);

  const isMonthSelected = useMemo(() => {
    return currentMonth === month;
  },
  [currentMonth, month]);

  const containerStyles = useMemo(() => {
    const result = [styles.monthContainer];
    if (isMonthSelected) {
      result.push([styles.monthSelected, selectedMonthStyle]);
    }
    return result;
  }, [isMonthSelected, selectedMonthStyle, styles.monthContainer, styles.monthSelected]);

  const textStyles = useMemo(() => {
    const result = [styles.monthText, textStyle];
    if (isMonthSelected) {
      result.push([styles.monthSelectedText, selectedMonthTextStyle]);
    }
    return result;
  }, [isMonthSelected, selectedMonthTextStyle, styles.monthSelectedText, styles.monthText, textStyle]);

  return (
    <View style={containerStyles}>
      {!monthOutOfRange ?
        <TouchableOpacity
          onPress={onSelect}>
          <Text style={textStyles}>
            {monthName}
          </Text>
        </TouchableOpacity>
        :
        <Text style={[textStyle, styles.disabledText]}>
          {monthName}
        </Text>
      }
    </View>
  );
}

Month.propTypes = {
  styles: PropTypes.shape({}),
  // Month number
  month: PropTypes.number,
  // Selected month
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onSelectMonth: PropTypes.func,
  months: PropTypes.arrayOf(PropTypes.string),
  textStyle: TextPropType.style,
  minDate: DatePropType,
  maxDate: DatePropType,
  selectedMonthStyle: ViewPropType.style,
  selectedMonthTextStyle: TextPropType.style,
};

export default memo(Month);
