import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.jpg';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';

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

    this.state = { page: 1 };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nextPage(values) {
    console.log('NEXT PAGE', values);

    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  login() {
    fakeAuth.authenticate(() => {

    });
  }

  // handleChange(event) {
  //   const { target } = event;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const { name } = target;

  //   this.setState({
  //     [name]: value,
  //   });
  // }

  handleSubmit(values) {
    console.log('SUBMIT', values);
  }

  render() {
    const { page } = this.state;

    return (
      <div id="register" className="text-center">
        <img className="logo" src={logo} alt="Ethereum Link" />
        <h2>Sign up</h2>

        {page === 1 && <RegisterStep3
          onSubmit={this.handleSubmit}
        />}

        {page === 2 && <RegisterStep2
          previousPage={this.previousPage}
          onSubmit={this.nextPage}
        />}

        {page === 3 && <RegisterStep1
          previousPage={this.previousPage}
          onSubmit={this.handleSubmit}
        />}

        <Link href="/login" to="login">Sign in</Link>
      </div>
    );
  }
}

export default Login;
