import React from "react";
import { Table, Modal, message } from "antd";
import moment from "moment";

import { FeatureWrapper } from "./Feature.style";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import ActionBar from "../../components/ActionBar/ActionBar";
import FeatureModal from "./FeatureModal";

import { getFeatures, deleteFeature } from "../../apis/feature";

const confirm = Modal.confirm;
class Feature extends React.Component {
  constructor() {
    super();
    this.state = {
      features: [],
      loading: false,
      showAddFeatureModal: false,
      showEditFeatureModal: false,
      editFeature: {
        featureId: "",
        displayName: "",
        frontendKey: "",
        backendKey: "",
        all: Boolean
      }
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { status, features } = await getFeatures();
    if (status) {
      this.setState({
        features: features.map((feature, index) => ({
          ...feature,
          index: index + 1
        })),
        loading: false
      });
    }
  }

  getColumns = () => {
    const columns = [
      { title: "#", dataIndex: "index" },
      { title: "Feature", dataIndex: "displayName" },
      { title: "Front-End Key", dataIndex: "frontendKey" },
      { title: "Back-End Key", dataIndex: "backendKey" },
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
                    this.handleClickEditFeature(
                      record.id,
                      record.displayName,
                      record.frontendKey,
                      record.backendKey,
                      record.all
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

  handleClickAddFeature = () => {
    this.setState({
      showAddFeatureModal: true
    });
  };

  handleClickCancelModal = () => {
    this.setState({
      showAddFeatureModal: false,
      showEditFeatureModal: false
    });
  };

  handleClickEditFeature = (
    featureId,
    displayName,
    frontendKey,
    backendKey,
    all
  ) => {
    this.setState({
      showEditFeatureModal: true,
      editFeature: {
        ...this.state.editFeature,
        featureId,
        displayName,
        frontendKey,
        backendKey,
        all
      }
    });
  };
  showDeleteConfirm = featureId => {
    confirm({
      title: "Are you sure delete this feature?",
      content: "This will remove a feature from the system",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteFeature(featureId);
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
      features,
      loading,
      showAddFeatureModal,
      showEditFeatureModal,
      editFeature
    } = this.state;
    return (
      <FeatureWrapper>
        <Title title="Feature" />
        <div className="secondary-wrapper">
          <Button text="+ Add feature" onClick={this.handleClickAddFeature} />
          <Table
            dataSource={features}
            columns={this.getColumns()}
            pagination={false}
            loading={loading}
            rowKey={record => record.index}
            bordered={true}
          />
        </div>
        <FeatureModal
          type="add"
          title="Add feature"
          visible={showAddFeatureModal}
          features={features}
          onCancel={this.handleClickCancelModal}
        />
        <FeatureModal
          type="edit"
          title="Edit feature"
          visible={showEditFeatureModal}
          displayName={editFeature.displayName}
          frontendKey={editFeature.frontendKey}
          backendKey={editFeature.backendKey}
          featureId={editFeature.featureId}
          value={editFeature.all}
          onCancel={this.handleClickCancelModal}
        />
      </FeatureWrapper>
    );
  }
}

export default Feature;
