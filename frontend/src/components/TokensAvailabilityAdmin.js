import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';


class CertificatesAdmin extends Component {
  constructor() {
    super();
    this.state = {
      amount: null,
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

  handleSubmit() {
    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.setAvailableTokens(
        this.state.amount * 1000,
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
              value={this.state.amount}
              name="amount"
              placeholder="Tokens available for purhcase"
              style={{ marginTop: 10 }}
            />
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: 10, marginBottom: 30 }}
            >Set available tokens
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
    LNKSToken: state.LNKSToken,
    account: state.account,
  };
}

export default connect(mapStateToProps)(CertificatesAdmin);
