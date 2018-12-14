import React from "react";
import { Table, Modal, message } from "antd";
import moment from "moment";

import { PageWrapper } from "./Page.style";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import ActionBar from "../../components/ActionBar/ActionBar";
import PageModal from "./PageModal";

import { getPages, deletePage } from "../../apis/page";
import { getFeatures } from "../../apis/feature";
const confirm = Modal.confirm;
class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      pages: [],
      loading: false,
      showAddPageModal: false,
      showEditPageModal: false,
      features: [],
      editPage: { pageId: 0, displayName: "", keyName: "", featureIds: [] }
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { status, pages } = await getPages();
    if (status) {
      this.setState({
        pages: pages.map((page, index) => ({
          ...page,
          keyName: page.key,
          index: index + 1,
          totalFeatures: page.featureIds.length
        })),
        loading: false
      });
    }

    const { status: getFeaturesStatus, features } = await getFeatures();
    if (getFeaturesStatus) {
      this.setState({ features });
    }
  }

  getColumns = () => {
    const columns = [
      {
        title: "#",
        dataIndex: "index"
      },
      {
        title: "Page",
        dataIndex: "displayName"
      },
      {
        title: "Key",
        dataIndex: "key"
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
        render: record => (
          <div className="action">
            <ActionBar
              menu={[
                {
                  icon: "edit",
                  label: "Sửa",
                  onClickMenuItem: () => {
                    this.handleClickEditRole(
                      record.id,
                      record.displayName,
                      record.key,
                      record.featureIds
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
        )
      }
    ];
    return columns;
  };

  handleClickAddPage = () => {
    this.setState({ showAddPageModal: true });
  };

  handleClickCancelModal = () => {
    this.setState({
      showAddPageModal: false,
      showEditPageModal: false
    });
  };

  handleClickEditRole = (pageId, displayName, keyName, featureIds) => {
    this.setState({
      showEditPageModal: true,
      editPage: {
        ...this.state.editPage,
        pageId,
        displayName,
        keyName,
        featureIds
      }
    });
  };

  showDeleteConfirm = pageId => {
    confirm({
      title: "Are you sure delete this page?",
      content: "This will remove a page from the system",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deletePage(pageId);
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
      pages,
      showAddPageModal,
      showEditPageModal,
      features,
      editPage
    } = this.state;
    return (
      <PageWrapper>
        <Title title="Page" />
        <div className="secondary-wrapper">
          <Button text="+ Add page" onClick={this.handleClickAddPage} />
          <Table
            dataSource={pages}
            columns={this.getColumns()}
            pagination={false}
            loading={loading}
            bordered={true}
          />
        </div>
        <PageModal
          type="add"
          title="Add page"
          visible={showAddPageModal}
          features={features}
          onCancel={this.handleClickCancelModal}
        />
        <PageModal
          type="edit"
          title="Edit page"
          visible={showEditPageModal}
          features={features}
          displayName={editPage.displayName}
          keyName={editPage.keyName}
          pageId={editPage.pageId}
          checkedFeatures={editPage.featureIds}
          onCancel={this.handleClickCancelModal}
        />
      </PageWrapper>
    );
  }
}

export default Page;
