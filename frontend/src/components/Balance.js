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

	componentDidMount() {
		this.getBalance();
	}

	getBalance() {
		this.props.LNKSToken.deployed().then(token => {
			token.balanceOf(this.props.account).then(balance => {
				this.setState({balance: balance.toNumber() / 1000});
			});
		});

		setTimeout(() => {
			this.getBalance();
		}, 2000);
	}

	render() {
		return (
			<div id="balance" className="row text-center col-sm-6 ">
				<h4><font color="#AAABAD" className="span2 clearfix">Your Balance</font> <font color="black"><font size="6">{this.state.balance}</font><font size="2"> LNKS</font></font></h4>
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
