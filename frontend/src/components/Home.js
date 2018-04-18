import React from 'react';

import Balance from './Balance';
import Address from './Address';
import CoinStats from './CoinStats';
import RecentTransactions from './RecentTransactions';
import Certificates from './Certificates';
import BuyRedeemButton from './BuyRedeemButton';

const Home = () => (
  <div>
    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <CoinStats />
      </div>

      <div className="col-xs-12 col-sm-6" id="buy-redeem-link-container">
        <BuyRedeemButton />
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

export default Home;
