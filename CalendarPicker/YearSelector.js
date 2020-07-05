// Parent view for Year selector

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import YearsGridView from './YearsGridView';
import YearsHeader from './YearsHeader';

export default class YearSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialYear: props.currentYear,
    };
  }

  handleOnYearViewPrevious = () => {
    this.setState({
      initialYear: parseInt(Math.max(this.state.initialYear - 25, 0), 10)
    });
  }

  handleOnYearViewNext = () => {
    this.setState({
      initialYear: parseInt(this.state.initialYear + 25, 10)
    });
  }

  render() {
    const {
      styles,
      textStyle,
      title,
      initialDate,
      currentMonth,
      currentYear,
      minDate,
      maxDate,
      restrictNavigation,
      previousComponent,
      nextComponent,
      previousTitle,
      nextTitle,
      previousTitleStyle,
      nextTitleStyle,
      headingLevel,
      onSelectYear,
      selectedYearStyle,
      selectedYearTextStyle,
    } = this.props;

    return (
      <View>
        <YearsHeader
          styles={styles}
          textStyle={textStyle}
          title={title}
          headingLevel={headingLevel}
          initialDate={initialDate}
          minDate={minDate}
          maxDate={maxDate}
          restrictNavigation={restrictNavigation}
          year={this.state.initialYear}
          previousComponent={previousComponent}
          nextComponent={nextComponent}
          previousTitle={previousTitle}
          nextTitle={nextTitle}
          previousTitleStyle={previousTitleStyle}
          nextTitleStyle={nextTitleStyle}
          onYearViewPrevious={this.handleOnYearViewPrevious}
          onYearViewNext={this.handleOnYearViewNext}
        />
        <YearsGridView
          initialYear={this.state.initialYear}
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
      </View>
    );
  }
}
