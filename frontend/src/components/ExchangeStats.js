import React, { Component } from 'react';
import { connect } from 'react-redux';


class ExchangeStats extends Component {
	constructor(props) {
		super(props);

		this.state = {
			supply: '...',
			kilos: '...'
		}

		this.getExchangeStats = this.getExchangeStats.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.LNKSExchange !== nextProps.LNKSExchange) {
			this.getExchangeStats(nextProps.LNKSExchange);
		}
	}

	getExchangeStats(LNKSExchange) {
		LNKSExchange.deployed().then(token => {
			token.fee().then(fee => {
				this.setState({
					fee: fee.toNumber() / 10
				});
			});
		});

		setTimeout(() => {
			this.getExchangeStats(LNKSExchange);
		}, 2000);
	}

	render() {
		return (
			<div className="exchange-stats col-xs-6 col-md-6">
				<h2>Exchange Info</h2>
				<h4>Fee: {this.state.fee}% (at least 0.001 LNKS)</h4>
			</div>
		);
	}
};


function mapStateToProps(state) {
  return {
    LNKSExchange: state.LNKSExchange,
    account: state.account,
    web3: state.web3
  }
}

export default connect(mapStateToProps)(ExchangeStats);
