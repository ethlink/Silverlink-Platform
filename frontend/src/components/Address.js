import React, { Component } from 'react';
import { connect } from 'react-redux';


class Address extends Component {
	render() {
		return (
			<div className="col-xs-12">
				<h4>Your address: {this.props.account}</h4>
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
