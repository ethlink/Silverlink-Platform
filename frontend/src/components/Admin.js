import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrdersAdmin from './OrdersAdmin';
import RedeemsAdmin from './RedeemsAdmin';
import TokensAvailabilityAdmin from './TokensAvailabilityAdmin';
import SilverPriceMarkupAdmin from './SilverPriceMarkupAdmin';
import CertificatesAdmin from './CertificatesAdmin';
import KYCAdmin from './KYCAdmin';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { isOwner: null };
  }

  componentDidMount() {
    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.validate(this.props.account)
        .then((res) => {
          this.setState({ isOwner: res });
        });
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.state.isOwner ?
            <div>
              <div className="col-xs-12">
                <h3 style={{ marginTop: 30 }}>Orders</h3>
                <OrdersAdmin />
              </div>

              <div className="col-xs-12">
                <h3 style={{ marginTop: 30 }}>Redeems</h3>
                <RedeemsAdmin />
              </div>

              <div className="col-xs-12">
                <h3 style={{ marginTop: 30 }}>Tokens availability</h3>
                <TokensAvailabilityAdmin />
              </div>

              <div className="col-xs-12">
                <h3 style={{ marginTop: 30 }}>Silver price markup</h3>
                <SilverPriceMarkupAdmin />
              </div>

              <div className="col-xs-12">
                <h3 style={{ marginTop: 30 }}>Certificates</h3>
                <CertificatesAdmin />
              </div>

              <div className="col-xs-12">
                <h3 style={{ marginTop: 30 }}>KYC</h3>
                <KYCAdmin />
              </div>
            </div> :
            <div className="col-xs-12"><h2>This area is admin only</h2></div>
            }
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

export default connect(mapStateToProps)(Admin);
