import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/_checkbox.scss';
import appImg from '../img/app.jpg';
import Terms from './Terms';
import Instructions from './Instructions';

class Agreement extends Component {
  constructor(props) {
    super(props);
    this.state = { termsVisible: true, instructionsVisible: false, redirect: false };
    this.handleTermsOk = this.handleTermsOk.bind(this);
    this.handleInstructionsOk = this.handleInstructionsOk.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleTermsOk() {
    this.setState({ termsVisible: false, instructionsVisible: true });
  }

  handleInstructionsOk() {
    this.setState({ redirect: true });
  }

  goBack() {
    this.setState({ termsVisible: true, instructionsVisible: false });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/app" />;
    }

    return (
      <div>
        <img src={appImg} alt="App screenshot" />
        <Terms visible={this.state.termsVisible} handleOk={this.handleTermsOk} />
        <Instructions visible={this.state.instructionsVisible} handleOk={this.handleInstructionsOk} goBack={this.goBack} />
      </div>
    );
  }
}

export default Agreement;
