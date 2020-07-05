import React, {memo} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Year from './Year';
import {DatePropType, TextPropType, ViewPropType} from './constants'

const guideArray = [0, 1, 2, 3, 4];

function YearsGridView({
  initialYear,
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
  let year = initialYear - 13; // center current year in grid

  const generateColumns = () => {
    return guideArray.map(() => {
      year++;
      return (
        <Year
          key={year}
          year={year}
          currentMonth={currentMonth}
          currentYear={currentYear}
          styles={styles}
          onSelectYear={onSelectYear}
          minDate={minDate}
          maxDate={maxDate}
          textStyle={textStyle}
          selectedYearStyle={selectedYearStyle}
          selectedYearTextStyle={selectedYearTextStyle}
        />
      );
    });
  };

  return (
    <View style={styles.yearsWrapper}>
      {guideArray.map(index => (
        <View key={year} style={styles.yearsRow}>
          {generateColumns(index)}
        </View>
      ))
      }
    </View>
  );
}

YearsGridView.propTypes = {
  styles: PropTypes.shape({}),
  initialYear: PropTypes.number.isRequired,
  onSelectYear: PropTypes.func,
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  maxDate: DatePropType,
  minDate: DatePropType,
  textStyle: TextPropType.style,
  selectedYearStyle: ViewPropType.style,
  selectedYearTextStyle: TextPropType.style,
};

export default memo(YearsGridView);
