import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initWeb3, initLNKSTokenContract, initLNKSExchangeContract } from '../actions';

import 'antd/dist/antd.css';

import Header from '../containers/Header';
import Address from './Address';
import Balance from './Balance';
import CoinStats from './CoinStats';
import ExchangeStats from './ExchangeStats';
import BuyDirect from './BuyDirect';
import Redeem from './Redeem';


class App extends Component {
  componentDidMount() {
    this.props.initWeb3();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.web3 !== nextProps.web3) {
      this.props.initLNKSTokenContract(nextProps.web3);
      this.props.initLNKSExchangeContract(nextProps.web3);
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Address />
        <Balance />

        <div className="container">
          <div className="row">
            <CoinStats />
            <ExchangeStats />
          </div>

          <div className="row">
            <BuyDirect />
            <Redeem />
          </div>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initWeb3: initWeb3,
    initLNKSTokenContract: initLNKSTokenContract,
    initLNKSExchangeContract: initLNKSExchangeContract,
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    web3: state.web3
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

