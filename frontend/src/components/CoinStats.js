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
			<div id="marketinfo" style={{textAlign: 'center', fontSize: '2'}} className="coin-stats col-xs-12 col-sm-6">
				<h4><font color="#aaabad"><center>Market Info</center></font></h4>
				<h5><font color="#767779"><font size="2">Tokens in Circulation:</font></font></h5><h4><font color="black"> {this.state.supply} LNKS</font></h4>
				<h5><font color="#767779"><font size="2">Silver in Reserves:</font></font></h5><h4> <font color="black">{this.state.kilos} GRAMS</font></h4>
				<h5><font color="#767779"><font size="2">Certificates:</font></font></h5><h4><font color="black"> ???</font></h4>
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
