import React from 'react';
import {
  Dropdown, Menu, Icon,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { HeaderWrapper } from './Layout.style';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <HeaderWrapper>
        <div className="avatar-header">
          <span>
            {email}
          </span>
        </div>
      </HeaderWrapper>
    );
  }
}

export default withRouter(Header);
