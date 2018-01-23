import React, { Component } from 'react';
import { connect } from 'react-redux';


class Address extends Component {
	render() {
		return (
			<div id="address" className="text-center">
				<h4>Your Address</h4>
				<h5><span className="datum">{this.props.account}</span></h5>
			</div>
		);
	}
};


function mapStateToProps(state) {
  return {
    web3: state.web3,
    account: state.account
  }
}

export default connect(mapStateToProps)(Address);
