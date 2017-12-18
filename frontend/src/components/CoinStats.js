import React, { Component } from 'react';
import { connect } from 'react-redux';


class CoinStats extends Component {
	constructor(props) {
		super(props);

		this.state = {
			supply: '...',
			kilos: '...'
		}

		this.getCoinStats = this.getCoinStats.bind(this);
	}

	componentDidMount() {
		this.getCoinStats();
	}

	getCoinStats(LNKSToken) {
		this.props.LNKSToken.deployed().then(token => {
			token.totalSupply().then(supply => {
				this.setState({
					supply: supply.toNumber() / 1000,
					kilos: supply.toNumber() / 1000
				});
			});
		});

		setTimeout(() => {
			this.getCoinStats(LNKSToken);
		}, 2000);
	}

	render() {
		return (
			<div className="coin-stats col-xs-12 col-sm-6">
				<h2>Market Info</h2>
				<h4>Tokens in Circulation: {this.state.supply} LNKS</h4>
				<h4>Silver in Reserves: {this.state.kilos} GRAMS</h4>
				<h4>Certificates: ???</h4>
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

export default connect(mapStateToProps)(CoinStats);
