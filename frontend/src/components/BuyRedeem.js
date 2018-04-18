import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';

import BuyDirect from './BuyDirect';
import Redeem from './Redeem';
import RecentTransactions from './RecentTransactions';


const BuyRedeem = (props) => {
  if (props.auth.user && (props.auth.user.residenceApproved !== 'approved' || props.auth.user.identityApproved !== 'approved')) {
    return <Redirect to="/app" />;
  }

  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-sm-5 col-sm-push-1 text-center">
          <Redeem />
        </div>

        <div className="col-xs-12 col-sm-5 col-sm-push-1 text-center">
          <BuyDirect />
        </div>
      </div>

      <hr style={{ margin: '30px 0 0 0', borderBottom: '2px solid #fff' }} />

      <div className="row">
        <div className="col-xs-12">
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, actions)(BuyRedeem);
