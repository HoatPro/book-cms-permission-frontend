import React from "react";
import { Modal, Checkbox, notification } from "antd";
import { PageModalWrapper } from "./Page.style";

import { createPage, updatePage } from "../../apis/page";

class PageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageId: 0,
      displayName: "",
      keyName: "",
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

    if (nextProps.displayName !== this.props.displayName) {
      this.setState({ displayName: nextProps.displayName });
    }

    if (nextProps.keyName !== this.props.keyName) {
      this.setState({ keyName: nextProps.keyName });
    }

    if (nextProps.pageId !== this.props.pageId) {
      this.setState({ pageId: nextProps.pageId });
    }

    if (
      nextProps.checkedFeatures &&
      nextProps.checkedFeatures.join("") !== this.props.checkedFeatures.join("")
    ) {
      this.setState({ checkedFeatures: nextProps.checkedFeatures });
    }
  };

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeFeatures = checkedFeatures => {
    this.setState({ checkedFeatures });
  };

  handleAddPage = async () => {
    const { displayName, keyName, checkedFeatures } = this.state;
    const { status } = await createPage({
      displayName,
      keyName,
      featureIds: checkedFeatures
    });
    if (status) {
      window.location.reload();
    } else {
      notification.error("Failed add page");
    }
  };

  handleUpdatePage = async () => {
    const { displayName, keyName, checkedFeatures } = this.state;
    const { pageId } = this.props;

    const { status } = await updatePage({
      pageId,
      displayName,
      keyName,
      featureIds: checkedFeatures
    });
    if (status) {
      window.location.reload();
    } else {
      notification.error("Failed update page");
    }
  };

  render() {
    const { title, visible, onCancel, type } = this.props;
    const { displayName, keyName, features, checkedFeatures } = this.state;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={type === "add" ? this.handleAddPage : this.handleUpdatePage}
        onCancel={onCancel}
      >
        <PageModalWrapper>
          <section>
            <label>Page name</label>
            <br />
            <input
              type="input"
              value={displayName}
              onChange={this.handleChangeInput}
              name="displayName"
            />
          </section>
          <section>
            <label>Key</label>
            <br />
            <input
              type="input"
              value={keyName}
              onChange={this.handleChangeInput}
              name="keyName"
            />
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
        </PageModalWrapper>
      </Modal>
    );
  }
}

export default PageModal;
