import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initWeb3, initLNKSTokenContract, initLNKSExchangeContract } from '../actions';

import Header from '../containers/Header';
import Address from './Address';
import Balance from './Balance';


class App extends Component {
  componentDidMount() {
    this.props.initWeb3();
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXT PROPS APP", nextProps);

    if (this.props.web3 !== nextProps.web3) {
      this.props.initLNKSTokenContract(nextProps.web3);
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Address />
        <Balance />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initWeb3: initWeb3,
    initLNKSTokenContract: initLNKSTokenContract
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    web3: state.web3
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

