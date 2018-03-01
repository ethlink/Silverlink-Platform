import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';


class SilverPriceMarkupAdmin extends Component {
  constructor() {
    super();
    this.state = {
      percentage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.setSilverPriceMarkup(
        this.state.percentage * 1000,
        {
          from: this.props.account,
          gas: 300000,
        },
      ).then((receipt) => {
        // eslint-disable-next-line
        console.log('Success: ', receipt);
      }).catch((error) => {
        // eslint-disable-next-line
        alert(error.message);
      });
    });
  }

  render() {
    return (
      <div className="tokens-availability-admin">
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Input
              type="number"
              onChange={this.handleChange}
              value={this.state.percentage}
              name="percentage"
              placeholder="Percentage over spot silver price"
              style={{ marginTop: 10 }}
            />
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: 10, marginBottom: 30 }}
            >Set percentage over spot silver price
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    web3: state.web3,
    LNKSExchange: state.LNKSExchange,
    account: state.account,
  };
}

export default connect(mapStateToProps)(SilverPriceMarkupAdmin);
