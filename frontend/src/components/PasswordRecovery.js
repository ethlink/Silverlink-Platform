import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Row, Col } from 'antd';
import logo from '../img/logo.png';
import * as actions from '../actions';
import PasswordRecoveryForm from './PasswordRecoveryForm';
import PasswordChange from './PasswordChange';

class PasswordRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };

    this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
    this.handleRecoverySubmit = this.handleRecoverySubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert) {
      this.setState({ loading: false });
    }
  }

  handleChangeSubmit(values) {
    this.setState({ loading: true });
    this.props.changePassword(this.props.match.params.recoveryString, values.password);
  }

  handleRecoverySubmit(values) {
    this.setState({ loading: true });
    this.props.recoverPassword(values.email);
  }

  render() {
    const { match: { params } } = this.props;

    return (
      <div id="password-recovery" className="text-center">
        <img className="logo" src={logo} alt="Ethereum Link" />

        {this.props.alert.message &&
          <Row>
            <Col span={24} sm={{ span: 14, offset: 5 }}>
              <Alert
                style={{ marginTop: 30 }}
                {...this.props.alert}
              />
            </Col>
          </Row>}

        {params.recoveryString ?
          <PasswordChange
            loading={this.state.loading}
            onSubmit={this.handleChangeSubmit}
          /> :
          <PasswordRecoveryForm
            loading={this.state.loading}
            onSubmit={this.handleRecoverySubmit}
          />}

        <Link href="/login" to="/login" style={{ marginRight: 30 }}>Sign in</Link>
        <Link href="/register" to="/register">Sign up</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
});

export default connect(mapStateToProps, actions)(PasswordRecovery);
