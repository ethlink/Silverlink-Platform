import React, { Component } from 'react';
import { connect } from 'react-redux';


class Redeem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			amount: '',
			LNKSExchange: null,
			success: '',
			failure: ''
		}

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({amount: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.LNKSExchange.deployed().then(exchange => {
			console.log("Exchange address:", exchange.address);
			
			exchange.redeem(this.state.amount*1000, {
				from: this.props.account,
				gas: 150000
			}).then(receipt => {
				console.log('receipt', receipt);

				this.setState({success: `Success! Transaction hash - ${receipt.tx}`});
			}).catch(error => {
				this.setState({failure: error.message});
			});			
		});
	}

	render() {
		return (
			<div className="balance container">
				<div className="row">
					<div className="col-xs-12">
						<h2>Redeem tokens</h2>

						<p style={{color: "green"}}>{this.state.success ? this.state.success : null}</p>
						<p style={{color: "red"}}>{this.state.failure ? this.state.failure : null}</p>						

						<form onSubmit={this.handleSubmit}>
							<input type="number" onChange={this.handleChange} value={this.state.amount} placeholder="Amount to redeem" />
							<button type="submit">Redeem</button>
						</form>
					</div>
				</div>
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

export default connect(mapStateToProps)(Redeem);
