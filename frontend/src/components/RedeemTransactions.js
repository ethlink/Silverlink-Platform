import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';


class BuyDirectTransactions extends Component {
  constructor(props) {
    super(props);

    this.state = { transactions: [] };
    this.buyDirectEventHandler = null;

    this.fetchTransactions = this.fetchTransactions.bind(this);
  }

  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.RedeemEvent({}, {
        fromBlock: 0,
        toBlock: 'latest',
      })
        .watch((error, event) => {
          if (error) {
            console.log(error);
          } else if (_.findIndex(this.state.transactions, { 'hash': event.transactionHash }) === -1) {
              let updatedTransactions = this.state.transactions.slice();
              updatedTransactions.push({
                hash: event.transactionHash,
                amount: event.args._amount.toNumber() / 1000,
                time: moment.unix(event.args._timestamp.toNumber()).fromNow()
              })

              this.setState({
                transactions: updatedTransactions
              });
            }
        });
    });
  }

  render() {
    const transactions = this.state.transactions.map((transaction) => <tr key={transaction.hash}>
        <td>{transaction.hash}</td>
        <td>{transaction.amount} LNKS</td>
        <td>{transaction.time}</td>
      </tr>);

    return (<div className="col-xs-12" style={{paddingBottom: 30}}>
      <h2>Redeem Transactions</h2>

      <table style={{width: "100%"}}>
        <thead>
          <tr>
            <th>Tx Hash</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {transactions}
        </tbody>
      </table>
    </div>);
  }
}


function mapStateToProps(state) {
  return {
    LNKSExchange: state.LNKSExchange,
    web3: state.web3,
  };
}

export default connect(mapStateToProps)(BuyDirectTransactions);
