import React, { Component } from 'react';
import { connect } from 'react-redux';


class CoinStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      supply: '...',
      grams: '...',
      certificates: '...',
      tokensAvailable: '...',
    };

    this.getCoinStats = this.getCoinStats.bind(this);
  }

  componentDidMount() {
    this.getCoinStats();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getCoinStats(LNKSToken) {
    this.props.LNKSToken.deployed().then((token) => {
      token.totalSupply().then((supply) => {
        this.setState({
          supply: supply.toNumber() / 1000,
        });
      });
    });

    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.getSilverReserves().then((silverReserves) => {
        this.setState({ grams: silverReserves.toNumber() / 1000 });
      });

      exchange.getCertificatesLength({ from: this.props.account })
        .then((length) => {
          this.setState({
            certificates: length.toNumber(),
          });
        });

      exchange.tokensSupplyAvailable().then((tokensAvailable) => {
        this.setState({ tokensAvailable: tokensAvailable.toNumber() / 1000 });
      });
    });

    this.timeout = setTimeout(() => {
      this.getCoinStats(LNKSToken);
    }, 2000);
  }

  render() {
    return (
      <div id="marketinfo" style={{ textAlign: 'center' }} className="coin-stats">
        <h4>Market Info</h4>
        <h5>Tokens in Circulation: <span className="datum">{this.state.supply} LNKS</span></h5>
        <h5>Silver in Reserves: <span className="datum">{this.state.grams} GRAMS</span></h5>
        <h5>Tokens available: <span className="datum">{this.state.tokensAvailable} LNKS</span></h5>
        <h5>Certificates: <span className="datum">{this.state.certificates}</span></h5>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    LNKSToken: state.LNKSToken,
    LNKSExchange: state.LNKSExchange,
    account: state.account,
  };
}

export default connect(mapStateToProps)(CoinStats);
