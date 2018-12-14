import React from "react";
import { Modal, Checkbox, message } from "antd";
import { UserModalWrapper } from "./User.style";

import { createUser } from "../../apis/user";

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      userId: 0,
      email: "",
      roleIds: [],
      checkedRoles: []
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.roles.length !== this.props.roles.length) {
      this.setState({
        roles: nextProps.roles.map(role => ({
          label: role.name,
          value: role.id
        }))
      });
    }

    if (nextProps.email !== this.props.email) {
      this.setState({ email: nextProps.email });
    }

    if (nextProps.userId !== this.props.userId) {
      this.setState({ userId: nextProps.userId });
    }

    if (
      nextProps.checkedRoles &&
      nextProps.checkedRoles.join("") !== this.props.checkedRoles.join("")
    ) {
      this.setState({ checkedRoles: nextProps.checkedRoles });
    }
  };
  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChangeRoles = checkedRoles => {
    console.log(checkedRoles);
    const { roles } = this.state;
    const checkedDefault = [];
    roles.map(role => {
      console.log(role);
      if (role.label === "Admin" || role.label === "Legal") {
        checkedDefault.push(role.value);
      }
    });
    this.setState({ checkedRoles: checkedDefault });
  };

  handleAddUser = async () => {
    const { email, checkedRoles } = this.state;
    const { status } = await createUser({
      email,
      ownerBy: email,
      roleIds: checkedRoles
    });
    if (status) {
      window.location.reload();
    } else {
      message.error("Failed add page");
    }
  };

  render() {
    const { title, visible, onCancel, type } = this.props;
    const { email, roles, checkedRoles } = this.state;
    return (
      <Modal
        title={`${title} ${email}`}
        visible={visible}
        onOk={type === "add" ? this.handleAddUser : onCancel}
        onCancel={onCancel}
      >
        <UserModalWrapper>
          <section>
            <section>
              <label>Email</label>
              <br />
              <input
                type="input"
                value={email}
                onChange={this.handleChangeInput}
                name="email"
              />
            </section>
            <br />
            <label>Roles</label>
            <br />
            <Checkbox.Group
              options={roles}
              value={checkedRoles}
              onChange={this.handleChangeRoles}
            />
          </section>
        </UserModalWrapper>
      </Modal>
    );
  }
}

export default UserModal;
