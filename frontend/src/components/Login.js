import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import logo from '../img/logo.jpg';

const FormItem = Form.Item;

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  },
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { redirectToReferrer: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  login() {
    fakeAuth.authenticate(() => {

    });
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      <Redirect to={from} />;
    }

    return (
      <div id="login" className="text-center">
        <img className="logo" src={logo} alt="Ethereum Link" />
        <h2 style={{ marginBottom: 30 }}>Sign in</h2>

        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <Input
              type="email"
              onChange={this.handleChange}
              value={this.state.amount}
              name="email"
              placeholder="Email"
            />
          </FormItem>

          <FormItem>
            <Input
              type="password"
              onChange={this.handleChange}
              value={this.state.name}
              name="password"
              placeholder="Password"
            />
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              Sign in
            </Button>
          </FormItem>
        </Form>

        <Link href="/register" to="register" style={{ marginRight: 30 }}>Sign up</Link>
        <Link href="/password-recovery" to="password-recovery">Password Recovery</Link>
      </div>
    );
  }
}

export default Login;
