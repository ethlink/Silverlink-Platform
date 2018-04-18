import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Alert, Row, Col, Icon } from 'antd';
import logo from '../img/logo.png';
import InputText from './InputText';
import * as actions from '../actions';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: this.props.auth.authenticated,
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert) {
      this.setState({ loading: false });
    }

    if (nextProps.auth.authenticated) {
      this.setState({ loading: false, redirectToReferrer: true });
    }
  }

  handleSubmit(values) {
    this.setState({ loading: true });
    this.props.signinUser({ email: values.email, password: values.password });
  }

  render() {
    const { redirectToReferrer } = this.state;
    const { match: { params } } = this.props;

    if (redirectToReferrer === true) {
      return <Redirect to="/app" />;
    }

    return (
      <div id="login" className="text-center">
        <img className="logo" src={logo} alt="Ethereum Link" />

        <Row>
          <Col span={24} sm={{ span: 14, offset: 5 }}>
            {params.userState === 'verified' &&
              <Alert
                style={{ marginTop: 30 }}
                message="Email successfully verified. Now you can login."
                type="success"
              />
            }

            {this.props.alert.message &&
              <Alert
                style={{ marginTop: 30 }}
                {...this.props.alert}
              />}
          </Col>
        </Row>

        <h2 style={{ marginBottom: 30 }}>Sign in</h2>

        <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field name="email" type="text" component={InputText} placeholder="Email" />
          <Field name="password" type="password" component={InputText} placeholder="Password" />

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              <Icon type="login" /> Sign in
            </Button>
          </FormItem>
        </Form>

        <Link href="/register" to="/register" style={{ marginRight: 30 }}>Sign up</Link>
        <Link href="/password-recovery" to="/password-recovery">Password Recovery</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  alert: state.alert,
});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'login',
})(Login));
