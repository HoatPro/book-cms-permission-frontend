import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Menu, Icon } from "antd";
import uuid from "uuid";

class ActionBar extends React.Component {
  render() {
    const { menu } = this.props;
    return (
      <div style={{ textAlign: "center", cursor: "pointer" }}>
        <Dropdown
          overlay={
            <Menu>
              {menu.map(item => (
                <Menu.Item
                  onClick={() => {
                    item.onClickMenuItem();
                  }}
                  key={uuid.v4()}
                >
                  <Icon type={item.icon} />
                  &nbsp; &nbsp;
                  <span>{item.label}</span>
                </Menu.Item>
              ))}
            </Menu>
          }
          placement="bottomLeft"
          trigger={["click"]}
        >
          <Icon type="ellipsis" style={{ fontSize: "1.5rem" }} />
        </Dropdown>
      </div>
    );
  }
}

ActionBar.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onClickMenuItem: PropTypes.func.isRequired
    })
  ).isRequired
};

export default ActionBar;
