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
			<div id="marketinfo" style={{textAlign: 'center'}} className="coin-stats">
				<h4>Market Info</h4>
				<h5>Tokens in Circulation: <span className="datum">{this.state.supply} LNKS</span></h5>
				<h5>Silver in Reserves: <span className="datum">{this.state.kilos} GRAMS</span></h5>
				<h5>Certificates: <span className="datum">???</span></h5>
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
