import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;


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
		const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.LNKSExchange.deployed().then(exchange => {
			exchange.redeem(
				this.state.amount*1000,
				`${this.state.street} | ${this.state.city} | ${this.state.state} | ${this.state.zip} | ${this.state.country}`, {
				from: this.props.account,
				gas: 300000
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
			<div id="redeem">
				<h4>Redeem Tokens</h4>

				<p style={{color: "green"}}>{this.state.success ? this.state.success : null}</p>
				<p style={{color: "red"}}>{this.state.failure ? this.state.failure : null}</p>

				<Form onSubmit={this.handleSubmit}>
					<FormItem>
			    	<Input type="number" onChange={this.handleChange} value={this.state.amount} name="amount" placeholder="Amount to redeem" />
						<Input type="text" onChange={this.handleChange} value={this.state.street} name="street" placeholder="Street" style={{marginTop: 10}} />
						<Input type="text" onChange={this.handleChange} value={this.state.city} name="city" placeholder="City" style={{marginTop: 10}} />
						<Input type="text" onChange={this.handleChange} value={this.state.state} name="state" placeholder="State" style={{marginTop: 10}} />
						<Input type="text" onChange={this.handleChange} value={this.state.zip} name="zip" placeholder="Zip" style={{marginTop: 10}} />
						<Input type="text" onChange={this.handleChange} value={this.state.country} name="country" placeholder="Country" style={{marginTop: 10}} />
					</FormItem>

					<Button type="primary" htmlType="submit">Redeem tokens</Button>
				</Form>
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
