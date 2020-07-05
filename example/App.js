import React, { Component } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import moment from 'moment';
import CalendarPicker from './CalendarPicker';
import {Utils} from './CalendarPicker/Utils';

const switchProps = {
  trackColor: { false: '#767577', true: '#34c759' },
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
      calendarType: 'day',
      view: Utils.getViewFromType('day'),
      shouldControlViewViaProps: false
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.clear = this.clear.bind(this);
    this.onMonthSelect = this.onMonthSelect.bind(this);
    this.onYearSelect = this.onYearSelect.bind(this);
    this.onCalendarTypeChange = this.onCalendarTypeChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const {calendarType} = this.state;

    let doStateUpdate = false;
    let newState = {};

    if (prevState.calendarType !== calendarType) {
      newState.selectedStartDate = null;
      newState.selectedEndDate = null;
      newState.view = Utils.getViewFromType(calendarType);
      newState.shouldControlViewViaProps = ['months', 'years'].includes(newState.view);

      doStateUpdate = true;
    }

    if (doStateUpdate) {
      this.setState({
        ...newState
      });
    }
  }

  onDateChange(date, type) {
    const { calendarType } = this.state;

    if (calendarType === 'day') {
      this.setState({
        selectedStartDate: date
      });
      return;
    }

    if (calendarType === 'week') {
      if (type === Utils.END_DATE) {
        return;
      }

      this.setState({
        selectedStartDate: moment(date).startOf('week'),
        selectedEndDate: moment(date).endOf('week'),
      });

      return;
    }

    if (calendarType === 'range') {
      if (type === 'START_DATE') {
        this.setState({
          selectedStartDate: date,
        });
      } else {
        this.setState({
          selectedEndDate: date,
        });
      }
      return;
    }

    if (calendarType === 'month') {
      // onMonthChange
    }

    if (calendarType === 'year') {
      // onYearChange
    }
  }

  onMonthSelect(date) {
    this.setState({
      selectedStartDate: moment(date).startOf('month'),
      selectedEndDate: moment(date).endOf('month'),
    });
  }

  onYearSelect(date) {
    this.setState({
      selectedStartDate: moment(date).startOf('year'),
      selectedEndDate: moment(date).endOf('year'),
    });
  }

  clear() {
    this.setState({
      selectedStartDate: null,
      selectedEndDate: null,
    });
  }

  onCalendarTypeChange(type) {
    this.setState({
      calendarType: type,
      view: Utils.getViewFromType(type),
      shouldControlViewViaProps: true,
    });
  }

  render() {
    const {
      selectedStartDate,
      selectedEndDate,
      calendarType,
      view,
      shouldControlViewViaProps,
    } = this.state;

    const formattedStartDate = selectedStartDate
      ? selectedStartDate.format('YYYY-MM-DD')
      : '';
    const formattedEndDate = selectedEndDate
      ? selectedEndDate.format('YYYY-MM-DD')
      : '';

    const enableRangeSelect = ['week', 'range'].includes(calendarType);

    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View style={{marginBottom: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 18, display: 'flex'}}>Select</Text>
              <Text style={{fontSize: 10}}>{JSON.stringify({calendarType,view,shouldControlViewViaProps})}</Text>
              <View style={styles.switchers}>
                <View>
                  <Text>Range</Text>
                  <Switch
                    {...switchProps}
                    onValueChange={() => this.onCalendarTypeChange('range')}
                    value={calendarType === 'range'}
                  />
                </View>
                <View>
                  <Text>Day</Text>
                  <Switch
                    {...switchProps}
                    onValueChange={() => this.onCalendarTypeChange('day')}
                    value={calendarType === 'day'}
                  />
                </View>
                <View>
                  <Text>Week</Text>
                  <Switch
                    {...switchProps}
                    onValueChange={() => this.onCalendarTypeChange('week')}
                    value={calendarType === 'week'}
                  />
                </View>
                <View>
                  <Text>Month</Text>
                  <Switch
                    {...switchProps}
                    onValueChange={() => this.onCalendarTypeChange('month')}
                    value={calendarType === 'month'}
                  />
                </View>
                <View>
                  <Text>Year</Text>
                  <Switch
                    {...switchProps}
                    onValueChange={() => this.onCalendarTypeChange('year')}
                    value={calendarType === 'year'}
                  />
                </View>
              </View>
            </View>
          </View>
          <CalendarPicker
            allowBackwardRangeSelect={enableRangeSelect}
            allowRangeSelection={enableRangeSelect}
            shouldControlViewViaProps={shouldControlViewViaProps}
            view={view}
            onDateChange={this.onDateChange}
            onMonthSelect={this.onMonthSelect}
            onYearSelect={this.onYearSelect}
            selectedDayColor={'#0070f0'}
            selectedDayTextColor={'#fff'}
            selectedEndDate={selectedEndDate}
            selectedRangeEndTextStyle={styles.selectedRangeEdgeTextStyle}
            selectedRangeStartTextStyle={styles.selectedRangeEdgeTextStyle}
            selectedStartDate={selectedStartDate}
            selectedToday={styles.selectedToday}
            selectedMonthStyle={styles.selectedMonthStyle}
            selectMonthTitle={'Выберите месяц'}
            selectYearTitle={'Выберите год'}
          />

          <View style={styles.topSpacing}>
            <Text style={styles.text}>
              Selected Start date: {formattedStartDate}
            </Text>
            {!!formattedEndDate && (
              <Text style={styles.text}>
                Selected End date: {formattedEndDate}
              </Text>
            )}
          </View>

          <View style={styles.topSpacing}>
            <Button onPress={this.clear} title="Clear Selection" />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
    alignItems: 'center',
  },
  topSpacing: {
    marginTop: 60,
  },
  text: {
    fontSize: 24,
  },
  textInput: {
    height: 40,
    fontSize: 24,
    borderColor: 'gray',
    borderWidth: 1,
  },
  switchers: {
    flexDirection: 'row'
  },
  selectedToday: {
    backgroundColor: 'transparent'
  },
  selectedRangeEdgeTextStyle: { color: 'white' },
});
