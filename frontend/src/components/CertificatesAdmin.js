import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Divider, Form, Input, Button } from 'antd';
const { Column } = Table;


class CertificatesAdmin extends Component {
  constructor () {
    super()
    this.state = {
      certificates: [],
      url: '',
      amount: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchCertificates = this.fetchCertificates.bind(this);
    this.deleteCertificate = this.deleteCertificate.bind(this);
  }

  componentDidMount() {
    this.fetchCertificates();
    this.interval = setInterval(() => this.fetchCertificates(), 30000);
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.LNKSExchange.deployed().then(exchange => {
			exchange.addCertificate(
        this.state.url,
        this.state.amount,
        {
  				from: this.props.account,
  				gas: 300000
  			}).then(receipt => {
          setTimeout(() => {
            this.fetchCertificates();
          }, 1000);

          this.setState({
            url: '',
            amount: null
          })
  			}).catch(error => {
          alert(error.message);
  			});
		});
  }

  handleChange(event) {
		const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
	}

  fetchCertificates() {
    this.setState({certificates: []});

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
                  amount: res[1].toNumber()
                });

                this.setState({
                  certificates: certificates
                })
              });
          }
				});
		});
  }

  deleteCertificate(key) {
    this.props.LNKSExchange.deployed().then(exchange => {
			exchange.deleteCertificate(
        key,
        {
  				from: this.props.account,
  				gas: 300000
  			}).then(receipt => {
          setTimeout(() => {
            this.fetchCertificates();
          }, 1000);
  			}).catch(error => {
          alert(error.message);
  			});
		});
  }

  render() {
    return (
      <div className="redeems-admin">
        <div>
          <Form onSubmit={this.handleSubmit}>
			    	<Input type="text" onChange={this.handleChange} value={this.state.url} name="url" placeholder="Certificate URL" />
						<Input type="number" onChange={this.handleChange} value={this.state.amount} name="amount" placeholder="Amount it represents" style={{marginTop: 10}} />

  					<Button type="primary" htmlType="submit" style={{marginTop: 10, marginBottom: 30}}>Add certificate</Button>
  				</Form>

          <Table dataSource={this.state.certificates}>
            <Column
              title="URL"
              dataIndex="url"
              key="url"
            />
            <Column
              title="Amount"
              dataIndex="amount"
              key="amount"
            />
            <Column
              title="Delete?"
              key="action"
              render={(text, record) => (
                <span>
                  <Button onClick={this.deleteCertificate.bind(null, record.key)} type="primary" disabled={this.state.wait ? "true" : null}>
                    Delete
                  </Button>
                </span>
              )}
            />
          </Table>
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
    account: state.account
  }
}

export default connect(mapStateToProps)(CertificatesAdmin);
