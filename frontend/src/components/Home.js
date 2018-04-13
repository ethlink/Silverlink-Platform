import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

import Balance from './Balance';
import Address from './Address';
import CoinStats from './CoinStats';
import RecentTransactions from './RecentTransactions';
import Certificates from './Certificates';


const Home = () => (
  <div>
    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <CoinStats />
      </div>

      <div className="col-xs-12 col-sm-6" id="buy-redeem-link-container">
        <Link
          href="/buy-redeem"
          to="/buy-redeem"
          id="buy-redeem-link"
          className="ant-btn ant-btn-primary"
        >
          Buy and Redeem
        </Link>
      </div>
    </div>

    <hr style={{ margin: '15px 0 0 0', borderBottom: '2px solid #fff' }} />

    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <Address />
      </div>

      <div className="col-xs-12 col-sm-6">
        <Balance />
      </div>
    </div>

    <hr style={{ margin: '15px 0 0 0', borderBottom: '2px solid #fff' }} />

    <div className="row">
      <div className="col-xs-12">
        <Certificates />
      </div>
    </div>

    <hr style={{ margin: '15px 0 0 0', borderBottom: '2px solid #fff' }} />

    <div className="row">
      <div className="col-xs-12">
        <RecentTransactions />
      </div>
    </div>
  </div>
);


function mapStateToProps(state) {
  return {
    web3: state.web3,
    LNKSExchange: state.LNKSExchange,
    LNKSToken: state.LNKSToken,
    account: state.account,
  };
}

export default connect(mapStateToProps, actions)(Home);
