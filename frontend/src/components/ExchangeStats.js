import React, { Component } from 'react';
import { connect } from 'react-redux';


class ExchangeStats extends Component {
  constructor(props) {
    super(props);

    this.getExchangeStats = this.getExchangeStats.bind(this);
  }

  componentDidMount() {
    this.getExchangeStats();
  }

  getExchangeStats() {
    this.props.LNKSExchange.deployed().then((token) => {
      token.fee().then((fee) => {
        this.setState({
          fee: fee.toNumber() / 10,
        });
      });
    });
  }

  render() {
    return (
      <div id="exchange" className="exchange-stats col-xs-6 col-md-6">
        <h4><font color="#ccc" className="span2 clearfix">Exchange Info</font></h4>
        <h5><font color="#fff">Current Fee:</font><font color="#1890FF" ><font size="2"> {this.state.fee}% (Min Fee: 0.001 LNKS)</font></font></h5>
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

export default connect(mapStateToProps)(ExchangeStats);
