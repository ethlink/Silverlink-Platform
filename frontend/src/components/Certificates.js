import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


class Certificates extends Component {
  constructor(props) {
    super(props);
    this.state = { certificates: [] };
    this.fetchCertificates = this.fetchCertificates.bind(this);
  }

  componentDidMount() {
    this.fetchCertificates();
  }

  fetchCertificates() {
    this.setState({redemptions: []});

    this.props.LNKSExchange.deployed().then(exchange => {
			exchange.getCertificatesLength({from: this.props.account})
				.then(total => {
          for (let i = 0; i < total.toNumber(); i++) {
            exchange.getCertificate(i, {from: this.props.account})
              .then(res => {
                let certificates = this.state.certificates;

                certificates.push({
                  key: i,
                  url: res[0],
                  amount: res[1].toNumber() / 1000,
                  timestamp: res[2].toNumber()
                });

                this.setState({
                  certificates: certificates
                })
              });
          }
				});
		});
  }

  render() {
    let certificates = this.state.certificates.map(certificate => {
      return <tr key={certificate.timestamp}>
        <td><font color="white"><a href={certificate.url} style={{color:'white'}} target="_blank">{certificate.url}</a></font></td>
        <td><font color="white">{certificate.amount} grams</font></td>
        <td><font color="white">{moment.unix(certificate.timestamp).fromNow()}</font></td>
      </tr>;
    });

    return <div id="certificates" className="col-xs-12" style={{marginBottom: 15, marginTop: 30}}>
      <h4 style={{marginTop: 0}}>Certificates</h4>

      {certificates.length ?
        <table style={{width: '100%', fontWeight: 300, marginTop: 30}}>
          <thead>
            <tr style={{fontWeight: 300}}>
              <th>URL</th>
              <th>Amount</th>
              <th>Time added</th>
            </tr>
          </thead>

          <tbody>
            {certificates}
          </tbody>
        </table>
        :
        <div style={{textAlign: 'center'}}>
          <h5 style={{marginTop: '25px'}}>No certificates added</h5>
        </div>
      }
    </div>;
  }
}


function mapStateToProps(state) {
  return {
    web3: state.web3,
    LNKSExchange: state.LNKSExchange,
    LNKSToken: state.LNKSToken,
    account: state.account
  }
}

export default connect(mapStateToProps)(Certificates);
