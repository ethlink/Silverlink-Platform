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

	componentDidMount() {
		this.getExchangeStats();
	}

	getExchangeStats() {
		this.props.LNKSExchange.deployed().then(token => {
			token.fee().then(fee => {
				this.setState({
					fee: fee.toNumber() / 10
				});
			});
		});
	}

	render() {
		return (
			<div id="exchange" className="exchange-stats col-xs-6 col-md-6">
				<h4><font color="#AAABAD" className="span2 clearfix">Exchange Info</font></h4>
				<h4><font color="#AAABAD">Fee:</font><font color="black" ><font size="3"> {this.state.fee}% (at least 0.001 LNKS)</font></font></h4>
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
