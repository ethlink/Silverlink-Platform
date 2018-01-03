import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Balance from './Balance';
import Address from './Address';
import CoinStats from './CoinStats';
import ExchangeStats from './ExchangeStats';
import BuyDirect from './BuyDirect';
import Redeem from './Redeem';
import RecentTransactions from './RecentTransactions';
import RecentUserTransactions from './RecentUserTransactions';


class Home extends Component {
  render() {
    return (
      <div>
        <div className="col-md-15">
          <Balance />
          <Address />

          <CoinStats />
          <ExchangeStats />
        </div>

        <div className="row">
          <BuyDirect />
          <Redeem />
        </div>

        <div className="row">
          <RecentUserTransactions />
          <RecentTransactions />
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    web3: state.web3,
    LNKSExchange: state.LNKSExchange,
    LNKSToken: state.LNKSToken,
    account: state.account
  }
}

export default connect(mapStateToProps, actions)(Home);
