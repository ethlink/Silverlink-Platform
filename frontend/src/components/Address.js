import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAccount } from '../actions';


class Address extends Component {
	constructor(props) {
		super(props);

		this.state = {
			account: '...'
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.web3 !== nextProps.web3) {
			this.props.fetchAccount(nextProps.web3);

			setInterval(() => {
				this.props.fetchAccount(nextProps.web3);
			}, 2000);
		}

		if (this.props.account !== nextProps.account) {
			this.setState({account: nextProps.account});
		}
	}

	render() {
		return (
			<div className="address container">
				<div className="row">
					<div className="col-xs-12">
						<h4>Your address: {this.state.account}</h4>
					</div>
				</div>
			</div>
		);
	}
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAccount: fetchAccount,
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    web3: state.web3,
    account: state.account
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);
