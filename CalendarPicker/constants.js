import {Text, View, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

export const DatePropType = PropTypes.oneOfType([PropTypes.string,
  PropTypes.instanceOf(Date),
  PropTypes.instanceOf(moment)]);
export const ViewPropType = ViewPropTypes || View.propTypes;
export const TextPropType = Text.propTypes;
