import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Row, Col } from 'antd';
import logo from '../img/logo.png';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import * as actions from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { page: 1, loading: false };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert) {
      this.setState({ loading: false });
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  handleSubmit(values) {
    this.setState({ loading: true });
    this.props.signupUser(values);
  }

  render() {
    const { page } = this.state;

    return (
      <div id="register" className="text-center">
        <img className="logo" src={logo} alt="Ethereum Link" />

        {this.props.alert.message &&
          <Row>
            <Col span={24} sm={{ span: 14, offset: 5 }}>
              <Alert
                style={{ marginTop: 30 }}
                {...this.props.alert}
              />
            </Col>
          </Row>
        }

        <h2>Sign up</h2>

        {page === 1 && <RegisterStep1
          onSubmit={this.nextPage}
        />}

        {page === 2 && <RegisterStep2
          previousPage={this.previousPage}
          onSubmit={this.nextPage}
        />}

        {page === 3 && <RegisterStep3
          previousPage={this.previousPage}
          loading={this.state.loading}
          onSubmit={this.handleSubmit}
        />}

        <Link href="/login" to="/login">Sign in</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
});

export default connect(mapStateToProps, actions)(Login);
