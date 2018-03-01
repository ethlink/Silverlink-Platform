import React from 'react';
import { connect } from 'react-redux';


const Address = props => (
  <div id="address" className="text-center">
    <h4>Your Address</h4>
    <h5><span className="datum">{props.account}</span></h5>
  </div>
);


function mapStateToProps(state) {
  return {
    web3: state.web3,
    account: state.account,
  };
}

export default connect(mapStateToProps)(Address);
