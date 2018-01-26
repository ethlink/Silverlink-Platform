import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import 'antd/dist/antd.css';

import Header from '../containers/Header';
import Status from './Status';

import Home from './Home';
import Admin from './Admin';
import BuyRedeem from './BuyRedeem';
import Checkbox from './Checkbox';


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
        <BrowserRouter>
          <div>
            <Status account={this.props.account} metamask={this.props.web3} initiated={this.state.initiated} deployed={this.state.deployed} {...this.props} />
            <Header />

            <Route exact path="/" component={Checkbox} />

            {typeof this.props.LNKSToken  === "function" &&
             typeof this.props.LNKSExchange  === "function" &&
             this.state.deployed &&
             typeof this.props.account === "string" &&
              this.props.account !== 'empty' ?
              <div>
                <Route exact path="/app" component={Home} />
                <Route exact path="/buy-redeem" component={BuyRedeem} />
                <Route exact path="/admin" component={Admin} />
              </div> : null}
          </div>
        </BrowserRouter>
      </div>
    );
  }
};


function mapStateToProps(state) {
  return {
    web3: state.web3,
    LNKSExchange: state.LNKSExchange,
    LNKSToken: state.LNKSToken,
    account: state.account
  }
}

export default connect(mapStateToProps, actions)(App);
