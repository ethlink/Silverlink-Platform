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

	componentWillReceiveProps(nextProps) {
		if (this.props.LNKSToken !== nextProps.LNKSToken) {
			this.getCoinStats(nextProps.LNKSToken);
		}
	}

	getCoinStats(LNKSToken) {
		LNKSToken.deployed().then(token => {
			token.totalSupply().then(supply => {
				this.setState({
					supply: supply.toNumber(),
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
			<div className="CoinStats container">
				<div className="row">
					<div className="col-xs-12">
						<h2>Market Info</h2>
						<h4>Tokens in Circulation: {this.state.supply} LNKS</h4>
						<h4>Silver in Reserves: {this.state.kilos} KG</h4>
						<h4>Certificates: ???</h4>
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

export default connect(mapStateToProps)(CoinStats);
