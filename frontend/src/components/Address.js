import React, { Component } from 'react';
import { connect } from 'react-redux';


class Address extends Component {
	render() {
		return (

			<div id="ADDRESS" className="row text-center col-sm-6" >
				<h4><center><font color="#AAABAD">Your Address:</font></center></h4> <h5><font color="black">{this.props.account}</font></h5>
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
