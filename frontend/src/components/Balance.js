import React, { Component } from 'react';
import { connect } from 'react-redux';


class Balance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: '...',
    };

    this.getBalance = this.getBalance.bind(this);
  }

  componentDidMount() {
    this.getBalance();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getBalance() {
    this.props.LNKSToken.deployed().then((token) => {
      token.balanceOf(this.props.account).then((balance) => {
        this.setState({ balance: balance.toNumber() / 1000 });
      });
    });

    this.timeout = setTimeout(() => {
      this.getBalance();
    }, 2000);
  }

  render() {
    return (
      <div id="balance" className="text-center">
        <h4>Your Balance</h4>
        <h5><span className="datum">{this.state.balance} LNKS</span></h5>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    LNKSToken: state.LNKSToken,
    account: state.account,
  };
}

export default connect(mapStateToProps)(Balance);
