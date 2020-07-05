import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Month from './Month';
import {TextPropType, ViewPropType} from './constants';

export default function MonthsGridView(props) {
  const {
    currentMonth,
    currentYear,
    months,
    styles,
    onSelectMonth,
    textStyle,
    minDate,
    maxDate,
    selectedMonthStyle,
    selectedMonthTextStyle,
  } = props;
  const _months = Array.from(Array(12).keys());
  const columnArray = [0, 1, 2];
  const rowArray = [0, 1, 2, 3];

  function generateColumns() {
    return columnArray.map(index => {
      const month = _months.shift();
      return (
        <Month
          key={month + index}
          currentMonth={currentMonth}
          month={month}
          currentYear={currentYear}
          months={months}
          styles={styles}
          onSelectMonth={onSelectMonth}
          minDate={minDate}
          maxDate={maxDate}
          textStyle={textStyle}
          selectedMonthStyle={selectedMonthStyle}
          selectedMonthTextStyle={selectedMonthTextStyle}
        />
      );
    });
  }

  return (
    <View style={styles.monthsWrapper}>
      {rowArray.map(index => (
        <View key={index} style={styles.monthsRow}>
          {generateColumns()}
        </View>
      ))
      }
    </View>
  );
}

MonthsGridView.propTypes = {
  styles: PropTypes.shape({}),
  selectedMonth: PropTypes.number,
  currentYear: PropTypes.number,
  months: PropTypes.array,
  onSelectMonth: PropTypes.func,
  selectedMonthStyle: ViewPropType.style,
  selectedMonthTextStyle: TextPropType.style,
};
