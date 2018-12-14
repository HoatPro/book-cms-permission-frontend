import React from "react";
import { Table, Input, Dropdown, Menu, Icon, Button } from "antd";
import moment from "moment";

import { UserWrapper } from "./User.style";
import Title from "../../components/Title/Title";
import ActionBar from "../../components/ActionBar/ActionBar";
import UserModal from "./UserModal";

import { getUsers, findUser } from "../../apis/user";
import { getRoles } from "../../apis/role";

const Search = Input.Search;

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: false,
      roles: [],
      showDetailUserModal: false,
      showAddUserModal: false,
      editUser: {
        userId: 0,
        email: "",
        roleIds: []
      }
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { status, users } = await getUsers();
    if (status) {
      this.setState({
        users: users.items.map((user, index) => ({
          ...user,
          key: user.id,
          index: index + 1
        })),
        loading: false
      });
    }

    const { status: getRolesStatus, roles } = await getRoles();
    if (getRolesStatus) {
      this.setState({ roles });
    }
  }

  getColumns = () => {
    const columns = [
      {
        title: "#",
        dataIndex: "index"
      },
      {
        title: "Email",
        dataIndex: "email"
      },
      {
        title: "OwnerBy",
        dataIndex: "ownerBy"
      },
      {
        title: "Created at",
        render: record => (
          <div>{moment(record.createdAt).format("DD-MM-YYYY HH:mm")}</div>
        )
      },
      {
        title: <div className="action">Action</div>,
        render: record => (
          <div className="action">
            <ActionBar
              menu={[
                {
                  icon: "bars",
                  label: "Chi tiết",
                  onClickMenuItem: () => {
                    this.handleDetailUser(
                      record.id,
                      record.email,
                      record.roles.map(role => role.id)
                    );
                  }
                }
              ]}
            />
          </div>
        )
      }
    ];
    return columns;
  };
  handleClickAddUser = () => {
    this.setState({ showAddUserModal: true });
  };

  handleDetailUser = (userId, email, roleIds) => {
    this.setState({
      showDetailUserModal: true,
      editUser: {
        ...this.state.editUser,
        userId,
        email,
        roleIds
      }
    });
  };

  handleClickCancelModal = () => {
    this.setState({
      showAddUserModal: false,
      showDetailUserModal: false
    });
  };
  onSearch = async keyword => {
    const { status, users } = await findUser(keyword);
    if (status) {
      this.setState({
        users: users.items.map((user, index) => ({
          ...user,
          key: user.id,
          index: index + 1
        })),
        loading: false
      });
    }
  };
  handleOwnerUser = async () => {
    const { status, users } = await getUsers();
    console.log(users);
    if (status) {
      const userOwner = [];
      users.items.map(user => {
        if (user.email === user.ownerBy) {
          userOwner.push(user);
        }
      });
      this.setState({
        users: userOwner.map((user, index) => {
          return {
            ...user,
            index: index + 1
          };
        })
      });
    }
  };
  onAbout = () => {
    this.componentDidMount();
  };
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.handleOwnerUser}>List Owner User</a>
        </Menu.Item>
      </Menu>
    );
    const {
      loading,
      users,
      showAddUserModal,
      showDetailUserModal,
      editUser,
      roles
    } = this.state;
    return (
      <UserWrapper>
        <Title title="User" />
        <div className="secondary-wrapper">
          <Button onClick={this.handleClickAddUser} className="button-add">
            + Add user
          </Button>
          <Search
            className="search"
            placeholder="Tìm kiếm tên người dùng..."
            onSearch={keyword => this.onSearch(keyword)}
          />
          &nbsp;
          <Dropdown overlay={menu} trigger={["hover"]}>
            <Button style={{ width: "120px" }} onClick={this.onAbout}>
              List User
              <Icon type="down" />
            </Button>
          </Dropdown>
          <br />
          <Table
            dataSource={users}
            columns={this.getColumns()}
            pagination={true}
            loading={loading}
            bordered={true}
            rowKey={record => record.index}
          />
        </div>
        <UserModal
          type="add"
          title="Add user"
          visible={showAddUserModal}
          roles={roles}
          onCancel={this.handleClickCancelModal}
        />
        <UserModal
          type="detail"
          title="Detail Role User "
          visible={showDetailUserModal}
          roles={roles}
          email={editUser.email}
          userId={editUser.userId}
          checkedRoles={editUser.roleIds}
          onCancel={this.handleClickCancelModal}
        />
      </UserWrapper>
    );
  }
}

export default User;
