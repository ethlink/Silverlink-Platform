import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Row, Col, Alert } from 'antd';
import InputUpload from './InputUpload';
import * as actions from '../actions';

const FormItem = Form.Item;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert) {
      this.setState({ loading: false });
    }
  }

  handleSubmit(values) {
    this.setState({ loading: true });
    this.props.updateUserDocuments(values);
  }

  render() {
    let residence = 'Loading...';
    let identity = 'Loading...';
    let limit = 'Loading...';

    if (this.props.auth.user) {
      residence = this.props.auth.user.residenceApproved.toUpperCase();
      identity = this.props.auth.user.identityApproved.toUpperCase();
      limit = (residence === 'APPROVED' && identity === 'APPROVED') ? '10,000' : '0,00';
    }

    return (
      <div id="account" className="text-center">
        <h2>Verification status:</h2>

        <div style={{ margin: '60px 0' }}>
          <h4>Proof of residence: {residence}</h4>
          <h4>Identity document: {identity}</h4>
          <br />
          <h4>Verification Limit: {limit} USD per transaction</h4>
        </div>

        <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          {this.props.alert.message &&
            <Alert
              style={{ margin: '15px 0 30px 0' }}
              {...this.props.alert}
            />}

          <Row>
            <Col span={24} md={{ span: 12, offset: 6 }}>
              <Field
                name="identity"
                type="file"
                component={InputUpload}
                label="Identity Document"
              />

              <Field
                name="residence"
                type="file"
                component={InputUpload}
                label="Proof of Residence"
              />

              <FormItem>
                <Button
                  type="primary"
                  loading={this.state.loading}
                  htmlType="submit"
                >
                  Upload documents
                </Button>
                <p style={{ marginTop: 15, lineHeight: '1.5em' }}>
                  * If you upload again your documents they will overwrite the current ones
                </p>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  alert: state.alert,
});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'documentsReupload',
})(Account));
