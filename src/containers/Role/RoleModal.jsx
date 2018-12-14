import React from "react";
import { Modal, Checkbox, notification } from "antd";
import { RoleModalWrapper } from "./Role.style";

import { createRole, updateRole } from "../../apis/role";

class RoleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleId: 0,
      name: "",
      features: [],
      checkedFeatures: []
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.features.length !== this.props.features.length) {
      this.setState({
        features: nextProps.features.map(feature => ({
          label: feature.displayName,
          value: feature.id
        }))
      });
    }

    if (nextProps.name !== this.props.name) {
      this.setState({ name: nextProps.name });
    }

    if (nextProps.roleId !== this.props.roleId) {
      this.setState({ roleId: nextProps.roleId });
    }

    if (
      nextProps.checkedFeatures &&
      nextProps.checkedFeatures.join("") !== this.props.checkedFeatures.join("")
    ) {
      this.setState({ checkedFeatures: nextProps.checkedFeatures });
    }
  };

  handleChangeName = e => {
    this.setState({ name: e.target.value });
  };

  handleChangeFeatures = checkedFeatures => {
    this.setState({ checkedFeatures });
  };

  handleAddRole = async () => {
    const { name, checkedFeatures } = this.state;
    const { status } = await createRole({
      name,
      featureIds: checkedFeatures
    });
    if (status) {
      window.location.reload();
    } else {
      notification.error("Failed add role");
    }
  };

  handleUpdateRole = async () => {
    const { name, checkedFeatures } = this.state;
    const { roleId } = this.props;
    const { status } = await updateRole({
      roleId,
      name,
      featureIds: checkedFeatures
    });
    if (status) {
      window.location.reload();
    } else {
      notification.error("Failed update role");
    }
  };

  render() {
    const { title, visible, onCancel, type } = this.props;
    const { name, features, checkedFeatures } = this.state;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={type === "add" ? this.handleAddRole : this.handleUpdateRole}
        onCancel={onCancel}
      >
        <RoleModalWrapper>
          <section>
            <label>Name</label>
            <br />
            <input type="input" value={name} onChange={this.handleChangeName} />
          </section>
          <section>
            <label>Features</label>
            <br />
            <Checkbox.Group
              options={features}
              value={checkedFeatures}
              onChange={this.handleChangeFeatures}
            />
          </section>
        </RoleModalWrapper>
      </Modal>
    );
  }
}

export default RoleModal;
