import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Row, Col, Alert } from 'antd';
import InputUpload from './InputUpload';
import * as actions from '../actions';

const FormItem = Form.Item;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/users/me')
      .then((response) => {
        this.setState({ user: response.data.user });
      });
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
    return (
      <div id="account" className="text-center">
        <h2>Verification status:</h2>

        <div style={{ margin: '60px 0' }}>
          <h4>Proof of residence: {this.state.user ? this.state.user.residenceApproved.toUpperCase() : 'Loading...'}</h4>
          <h4>Identity document: {this.state.user ? this.state.user.identityApproved.toUpperCase() : 'Loading...'}</h4>
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
