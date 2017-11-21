import React, { Component } from 'react';
import { connect } from 'react-redux';


class Balance extends Component {
	constructor(props) {
		super(props);

		this.state = {
			balance: '...'
		}

		this.getBalance = this.getBalance.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.LNKSToken !== nextProps.LNKSToken) {
			this.getBalance(nextProps.LNKSToken);
		}
	}

	getBalance(LNKSToken) {
		LNKSToken.deployed().then(token => {
			token.balanceOf(this.props.account).then(balance => {
				this.setState({balance: balance.toNumber() / 1000});
			});			
		});

		setTimeout(() => {
			this.getBalance(LNKSToken);
		}, 2000);
	}

	render() {
		return (
			<div className="balance container">
				<div className="row">
					<div className="col-xs-12">
						<h4>Your balance: {this.state.balance} LNKS</h4>
					</div>
				</div>
			</div>
		);
	}
};


function mapStateToProps(state) {
  return {
    LNKSToken: state.LNKSToken,
    account: state.account
  }
}

export default connect(mapStateToProps)(Balance);
