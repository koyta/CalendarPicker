import React, {memo, useMemo, useCallback} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import moment from 'moment';
import {DatePropType, TextPropType, ViewPropType} from './constants';

function Year({
  year,
  currentMonth,
  currentYear,
  styles,
  onSelectYear,
  textStyle,
  minDate,
  maxDate,
  selectedYearStyle,
  selectedYearTextStyle,
}) {
  // Check whether year is outside of min/max range.
  const yearIsAfterMax = useMemo(() => {
    return maxDate && year > maxDate.year();
  }, [maxDate, year]);
  const yearIsBeforeMin = useMemo(() => {
    return minDate && year < minDate.year();
  }, [minDate, year]);
  const yearIsDisabled = useMemo(() => false, []);

  // TODO: disabledYears props to disable years separate from disabledDates
  const yearOutOfRange = useMemo(
    () => yearIsAfterMax || yearIsBeforeMin || yearIsDisabled,
    [yearIsAfterMax, yearIsBeforeMin, yearIsDisabled]
  );

  const onSelect = useCallback(() => {
    // Guard against navigating to months beyond min/max dates.
    let month = currentMonth;
    let currentMonthYear = moment({year: currentYear, month});
    if (maxDate && currentMonthYear.isAfter(maxDate, 'month')) {
      month = maxDate.month();
    }
    if (minDate && currentMonthYear.isBefore(minDate, 'month')) {
      month = minDate.month();
    }
    onSelectYear({month, year});
  }, [currentMonth, currentYear, maxDate, minDate, onSelectYear, year]);

  const containerStyles = [styles.yearContainer];
  if (currentYear === year) {
    containerStyles.push([styles.yearSelected, selectedYearStyle]);
  }

  const textStyles = [styles.yearText, textStyle];
  if (currentYear === year) {
    textStyles.push([styles.yearSelectedText, selectedYearTextStyle]);
  }

  return (
    <View style={containerStyles}>
      {!yearOutOfRange
        ? (
          <TouchableOpacity onPress={onSelect}>
            <Text style={textStyles}>
              {year}
            </Text>
          </TouchableOpacity>
        )
        : (
          <Text style={[textStyle, styles.disabledText]}>
            {year}
          </Text>
        )
      }
    </View>
  );
}

Year.propTypes = {
  styles: PropTypes.shape({
    yearContainer: ViewPropType.style,
    yearText: TextPropType.style,
    disabledText: TextPropType.style,
  }),
  year: PropTypes.number,
  onSelectYear: PropTypes.func,
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  textStyle: TextPropType.style,
  minDate: DatePropType,
  maxDate: DatePropType,
  selectedYearStyle: ViewPropType.style,
  selectedYearTextStyle: TextPropType.style,
};

export default memo(Year);
