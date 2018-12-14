import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Select, DatePicker } from 'antd';
import { HeaderControllerWrapper } from './HeaderController.style';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default class HeaderController extends React.Component {
  onChangeDatePick = (value) => {
    const { handleChangeTime } = this.props;
    handleChangeTime(moment(value[0]).format('YYYY-MM-DD'), moment(value[1]).format('YYYY-MM-DD'));
  }

  handleChangeType = (value) => {
    this.props.handleChangeType(value);
  }

  handleChangeTimeSelect = (value) => {
    const currentTime = new Date();
    const { handleChangeTime } = this.props;
    if (value === 'last_7_days') {
      const startTimeFormat = moment(new Date(currentTime.getTime() - 6 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD').toString();
      const sevenDayBefore = new Date(`${startTimeFormat}T00:00:00`);
      handleChangeTime(sevenDayBefore, currentTime);
    } else if (value === 'this_month') {
      const firstDayOfThisMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
      handleChangeTime(firstDayOfThisMonth, currentTime);
    } else {
      const firstDayOfLastMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() - 1, 1);
      const lastDayOfLastMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 0);
      handleChangeTime(firstDayOfLastMonth, lastDayOfLastMonth);
    }
  }

  render() {
    const { title } = this.props;
    return (
      <HeaderControllerWrapper>
        <h3>
          {title}
        </h3>
        <div className="control">
          <Select
            defaultValue="last_7_days"
            className="select-overview"
            style={{ width: 130 }}
            onChange={this.handleChangeTimeSelect}
          >
            <Option value="last_7_days">
              7 ngày qua
            </Option>
            <Option value="this_month">
              Tháng này
            </Option>
            <Option value="last_month">
              Tháng trước
            </Option>
          </Select>
          <RangePicker
            className="rangepicker-overview"
            onChange={this.onChangeDatePick}
          />
          {
            this.props.type
              ? (
                <Select
                  defaultValue="by_request"
                  className="select-overview"
                  style={{ width: 135 }}
                  onChange={this.handleChangeType}
                >
                  <Option value="by_request">
                    Theo yêu cầu
                  </Option>
                  <Option value="by_money">
                    Theo số tiền
                  </Option>
                </Select>
              ) : null
          }
        </div>
      </HeaderControllerWrapper>
    );
  }
}

HeaderController.defaultProps = {
  title: '',
};

HeaderController.propTypes = {
  title: PropTypes.string,
};
