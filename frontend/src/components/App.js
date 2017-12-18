import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initWeb3, initLNKSTokenContract, initLNKSExchangeContract, fetchAccount } from '../actions';

import 'antd/dist/antd.css';

import Header from '../containers/Header';
import Address from './Address';
import Balance from './Balance';
import CoinStats from './CoinStats';
import ExchangeStats from './ExchangeStats';
import BuyDirect from './BuyDirect';
import Redeem from './Redeem';
import Status from './Status';
import RedeemTransactions from './RedeemTransactions';
import BuyDirectTransactions from './BuyDirectTransactions';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { initiated: false, deployed: true }
  }

  componentDidMount() {
    this.props.initWeb3();

		setInterval(() => {
			this.props.fetchAccount(this.props.web3);
		}, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.web3 !== nextProps.web3) {
      this.props.fetchAccount(this.props.web3);
      this.setState({initiated: true});

      if (nextProps.web3.web3Initiated) {
        this.props.initLNKSTokenContract(nextProps.web3);
        this.props.initLNKSExchangeContract(nextProps.web3);
      }
    }

    if (this.props.account !== nextProps.account && typeof nextProps.account === "string" ) {
			this.setState({initiated: true, account: nextProps.account});
		}

    if (this.props.LNKSToken !== nextProps.LNKSToken) {
      nextProps.LNKSToken.deployed()
        .then(exchange => {
          this.setState({deployed: true})
        })
        .catch(err => {
          this.setState({deployed: false})
        });
    }
  }

  render() {
    return (
      <div className="app container">
        <div className="row">
          <Status account={this.props.account} metamask={this.props.web3} initiated={this.state.initiated} deployed={this.state.deployed} />
          <Header />
        </div>

        {typeof this.props.LNKSToken  === "function" &&
         typeof this.props.LNKSExchange  === "function" &&
         this.state.deployed &&
         typeof this.props.account === "string" &&
          this.props.account !== 'empty' ?
          <div>
            <div className="row">
              <Address />
              <Balance />

              <CoinStats />
              <ExchangeStats />
            </div>

            <div className="row">
              <BuyDirect />
              <Redeem />
            </div>

            <div className="row">
              <BuyDirectTransactions />
              <RedeemTransactions />
            </div>
          </div> : null}
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initWeb3: initWeb3,
    initLNKSTokenContract: initLNKSTokenContract,
    initLNKSExchangeContract: initLNKSExchangeContract,
    fetchAccount: fetchAccount
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    web3: state.web3,
    LNKSExchange: state.LNKSExchange,
    LNKSToken: state.LNKSToken,
    account: state.account
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
