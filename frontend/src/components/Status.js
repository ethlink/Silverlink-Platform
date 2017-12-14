import React, { Component } from 'react';
import { connect } from 'react-redux';


class Status extends Component {
  render() {
    if (!this.props.initiated)
      return null;

    return (
      <div id="status" className="col-xs-12" style={{marginTop: 15}}>
        {!this.props.web3.web3Initiated ?
          <div className="alert alert-danger" role="alert">
            <strong>Warning!</strong> This application will not work without Metamask extension enabled. See download links for <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank" rel="noopener noreferrer">Chrome</a> and <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/" target="_blank" rel="noopener noreferrer">Firefox</a>. Once enabled, refresh the website.
          </div>
        : null}

        {(!this.props.account || this.props.account === 'empty') && this.props.web3.web3Initiated ?
        <div id="alert-container">
          <div className="alert alert-danger" role="alert">
            <strong>Warning!</strong> Seems like you have Metamask ready but your account is locked. Please unlock it before using the app.
          </div>
        </div>
        : null}

        {this.props.account && this.props.web3.web3Initiated && !this.props.deployed ?
        <div id="alert-container">
          <div className="alert alert-danger" role="alert">
            <strong>Warning!</strong> The given network is not supported.
          </div>
        </div>
        : null}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    web3: state.web3,
    account: state.account
  }
}

export default connect(mapStateToProps)(Status);
