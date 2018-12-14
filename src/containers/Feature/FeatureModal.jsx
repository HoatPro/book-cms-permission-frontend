import React from "react";
import { Modal, notification, Radio } from "antd";
import { FeatureModalWrapper } from "./Feature.style";

import { createFeature, updateFeature } from "../../apis/feature";
const RadioGroup = Radio.Group;
class FeatureModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featureId: 0,
      displayName: "",
      frontendKey: "",
      backendKey: "",
      value: true //isAll book true or false
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.featureId !== this.props.featureId) {
      this.setState({ featureId: nextProps.featureId });
    }

    if (nextProps.displayName !== this.props.displayName) {
      this.setState({ displayName: nextProps.displayName });
    }

    if (nextProps.frontendKey !== this.props.frontendKey) {
      this.setState({ frontendKey: nextProps.frontendKey });
    }
    if (nextProps.backendKey !== this.props.backendKey) {
      this.setState({ backendKey: nextProps.backendKey });
    }
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  };
  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };
  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddFeature = async () => {
    const { displayName, frontendKey, backendKey, value } = this.state;
    const { status } = await createFeature({
      displayName: displayName,
      frontendKey: frontendKey,
      backendKey: backendKey,
      all: value
    });
    if (status) {
      window.location.reload();
    } else {
      notification.error("Failed add feature");
    }
  };

  handleUpdateFeature = async () => {
    const { displayName, frontendKey, backendKey, value } = this.state;
    const { featureId } = this.props;
    const { status } = await updateFeature({
      featureId,
      displayName: displayName,
      frontendKey: frontendKey,
      backendKey: backendKey,
      all: value
    });
    if (status) {
      window.location.reload();
    } else {
      notification.error("Failed update feature");
    }
  };

  render() {
    const { title, visible, onCancel, type } = this.props;
    const { displayName, frontendKey, backendKey, value } = this.state;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={type === "add" ? this.handleAddFeature : this.handleUpdateFeature}
        onCancel={onCancel}
      >
        <FeatureModalWrapper>
          <section>
            <label>Name</label>
            <br />
            <input
              type="input"
              value={displayName}
              name="displayName"
              onChange={this.handleChangeInput}
            />
          </section>
          <section>
            <label>Front-End Key</label>
            <br />
            <input
              type="input"
              value={frontendKey}
              name="frontendKey"
              onChange={this.handleChangeInput}
            />
          </section>
          <section>
            <label>Back-End Key</label>
            <br />
            <input
              type="input"
              value={backendKey}
              name="backendKey"
              onChange={this.handleChangeInput}
            />
          </section>
          <section>
            <label>Is-All?</label>
            <br />
            <RadioGroup onChange={this.onChange} value={value}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </RadioGroup>
          </section>
        </FeatureModalWrapper>
      </Modal>
    );
  }
}

export default FeatureModal;
