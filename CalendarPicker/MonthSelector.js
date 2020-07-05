// Parent view for Month selector

import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import MonthsGridView from './MonthsGridView';
import MonthsHeader from './MonthsHeader';
import {DatePropType, TextPropType} from './constants';

function MonthSelector(props) {
  const {
    styles,
    textStyle,
    title,
    headingLevel,
    currentMonth,
    currentYear,
    months,
    minDate,
    maxDate,
    onSelectMonth,
  } = props;

  return (
    <View>
      <MonthsHeader
        styles={styles}
        textStyle={textStyle}
        title={title}
        headingLevel={headingLevel}
      />
      <MonthsGridView
        styles={styles}
        textStyle={textStyle}
        currentMonth={currentMonth}
        currentYear={currentYear}
        months={months}
        minDate={minDate}
        maxDate={maxDate}
        onSelectMonth={onSelectMonth}
      />
    </View>
  );
}

MonthSelector.propTypes = {
  styles: PropTypes.shape({}),
  textStyle: TextPropType.style,
  title: PropTypes.string,
  headingLevel: PropTypes.number,
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  months: PropTypes.arrayOf(PropTypes.string),
  minDate: DatePropType,
  maxDate: DatePropType,
  onSelectMonth: PropTypes.func,
};

export default memo(MonthSelector);
