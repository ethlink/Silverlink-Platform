import React from 'react';
import { connect } from 'react-redux';

const Status = (props) => {
  if (!props.initiated || window.location.pathname === '/') { return null; }

  return (
    <div id="status" style={{ marginTop: 15 }}>
      {!props.web3.web3Initiated &&
        <div className="alert alert-danger" role="alert">
          <strong>Warning!</strong> This application will not work without Metamask extension enabled. See download links for <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank" rel="noopener noreferrer">Chrome</a> and <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/" target="_blank" rel="noopener noreferrer">Firefox</a>. Once enabled, refresh the website.
        </div>}

      {props.account === 'empty' && props.web3.web3Initiated &&
        <div id="alert-container">
          <div className="alert alert-danger" role="alert">
            <strong>Warning!</strong> Seems like you have Metamask ready but your account is locked.
            Please unlock it before using the app.
          </div>
        </div>}

      {props.account && props.web3.web3Initiated && !props.deployed &&
        <div id="alert-container">
          <div className="alert alert-danger" role="alert">
            <strong>Warning!</strong> The given network is not supported.
          </div>
        </div>}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    web3: state.web3,
    account: state.account,
  };
}

export default connect(mapStateToProps)(Status);
