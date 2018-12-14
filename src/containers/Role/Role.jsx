import React from "react";
import { Table, Modal, message } from "antd";
import moment from "moment";

import { RoleWrapper } from "./Role.style";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import ActionBar from "../../components/ActionBar/ActionBar";
import RoleModal from "./RoleModal";

import { getRoles, deleteRole } from "../../apis/role";
import { getFeatures } from "../../apis/feature";
const confirm = Modal.confirm;
class Role extends React.Component {
  constructor() {
    super();
    this.state = {
      roles: [],
      editRole: {
        roleId: 0,
        name: "",
        featureIds: []
      },
      loading: false,
      showAddRoleModal: false,
      showEditRoleModal: false,
      disableAction: false,
      features: []
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { status, roles } = await getRoles();
    if (status) {
      this.setState({
        roles: roles.map((role, index) => {
          if (role.name === "Legal") {
            return {
              ...role,
              key: role.id,
              index: index + 1
            };
          } else {
            return {
              ...role,
              key: role.id,
              index: index + 1,
              totalFeatures: role.features.length
            };
          }
        }),
        loading: false
      });
    }

    const { status: getFeaturesStatus, features } = await getFeatures();
    if (getFeaturesStatus) {
      this.setState({ features });
    }
  }

  handleClickAddRole = () => {
    this.setState({ showAddRoleModal: true });
  };

  handleClickEditRole = (roleId, name, featureIds) => {
    this.setState({
      showEditRoleModal: true,
      editRole: {
        ...this.state.editRole,
        roleId,
        name,
        featureIds
      }
    });
  };

  handleClickCancelModal = () => {
    this.setState({
      showAddRoleModal: false,
      showEditRoleModal: false
    });
  };

  getColumns = () => {
    const columns = [
      {
        title: "#",
        dataIndex: "index"
      },
      {
        title: "Role",
        dataIndex: "name"
      },
      {
        title: <div className="total-features">Features</div>,
        render: record => (
          <div className="total-features">{record.totalFeatures}</div>
        )
      },
      {
        title: "Created at",
        render: record => (
          <div>{moment(record.createdAt).format("DD-MM-YYYY HH:mm")}</div>
        )
      },
      {
        title: <div className="action">Action</div>,
        render: record => {
          if (record.name === "Legal") {
            return <div />;
          } else {
            return (
              <div className="action">
                <ActionBar
                  menu={[
                    {
                      icon: "edit",
                      label: "Sửa",
                      onClickMenuItem: () => {
                        this.handleClickEditRole(
                          record.id,
                          record.name,
                          record.features.map(feature => feature.id)
                        );
                      }
                    },
                    {
                      icon: "delete",
                      label: "Xóa",
                      onClickMenuItem: () => {
                        this.showDeleteConfirm(record.id);
                      }
                    }
                  ]}
                />
              </div>
            );
          }
        }
      }
    ];
    return columns;
  };
  showDeleteConfirm = roleId => {
    confirm({
      title: "Are you sure delete this role?",
      content: "This will remove a role from the system",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteRole(roleId);
        message.success("Xóa thành công!");
        window.location.reload();
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  render() {
    const {
      loading,
      roles,
      showAddRoleModal,
      showEditRoleModal,
      features,
      editRole
    } = this.state;
    return (
      <RoleWrapper>
        <Title title="Role" />
        <div className="secondary-wrapper">
          <Button text="+ Add role" onClick={this.handleClickAddRole} />
          <Table
            dataSource={roles}
            columns={this.getColumns()}
            pagination={false}
            loading={loading}
            bordered={true}
          />
        </div>
        <RoleModal
          type="add"
          title="Add role"
          visible={showAddRoleModal}
          features={features}
          onCancel={this.handleClickCancelModal}
        />
        <RoleModal
          type="edit"
          title="Edit role"
          visible={showEditRoleModal}
          features={features}
          name={editRole.name}
          roleId={editRole.roleId}
          checkedFeatures={editRole.featureIds}
          onCancel={this.handleClickCancelModal}
        />
      </RoleWrapper>
    );
  }
}

export default Role;
