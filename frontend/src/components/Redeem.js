import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Form, Input, Button } from 'antd';
import config from '../config';

const FormItem = Form.Item;


class Redeem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: '',
      failure: '',
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      success: '',
      failure: '',
      loading: true,
    });

    this.hide = message.loading('Action in progress..', 0);

    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.redeem(
        this.state.amount * 1000,
        `${this.state.name} | ${this.state.street} | ${this.state.city} | ${this.state.state} | ${this.state.zip} | ${this.state.country}`, {
          gas: config.GAS_LIMIT,
          gasPrice: config.GWEI_PRICE,
        },
      ).then((receipt) => {
        // eslint-disable-next-line
        console.log('receipt', receipt);

        this.hide();
        this.setState({ success: `Success! Transaction hash - ${receipt.tx}`, loading: false });
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error);

        this.hide();
        this.setState({ failure: 'Oops, something went wrong. Try again later.', loading: false });
      });
    });
  }

  render() {
    return (
      <div id="redeem">
        <h4>Redeem Tokens</h4>

        <p style={{ color: 'green' }}>{this.state.success ? this.state.success : null}</p>
        <p style={{ color: 'red' }}>{this.state.failure ? this.state.failure : null}</p>

        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <Input
              type="number"
              onChange={this.handleChange}
              value={this.state.amount}
              name="amount"
              placeholder="Amount to redeem"
            />
            <Input
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
              name="name"
              placeholder="Name"
              style={{ marginTop: 10 }}
            />
            <Input
              type="text"
              onChange={this.handleChange}
              value={this.state.street}
              name="street"
              placeholder="Street"
              style={{ marginTop: 10 }}
            />
            <Input
              type="text"
              onChange={this.handleChange}
              value={this.state.city}
              name="city"
              placeholder="City"
              style={{ marginTop: 10 }}
            />
            <Input
              type="text"
              onChange={this.handleChange}
              value={this.state.state}
              name="state"
              placeholder="State"
              style={{ marginTop: 10 }}
            />
            <Input
              type="text"
              onChange={this.handleChange}
              value={this.state.zip}
              name="zip"
              placeholder="Zip"
              style={{ marginTop: 10 }}
            />
            <Input
              type="text"
              onChange={this.handleChange}
              value={this.state.country}
              name="country"
              placeholder="Country"
              style={{ marginTop: 10 }}
            />
          </FormItem>

          <Button
            type="primary"
            htmlType="submit"
            loading={this.state.loading}
          >
            Redeem tokens
          </Button>
        </Form>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    LNKSExchange: state.LNKSExchange,
    account: state.account,
    web3: state.web3,
  };
}

export default connect(mapStateToProps)(Redeem);
