import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Divider, Button } from 'antd';
const { Column } = Table;


class RedeemsAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = { redemptions: [], wait: false };

    this.approve = this.approve.bind(this);
    this.decline = this.decline.bind(this);
    this.fetchRedemptions = this.fetchRedemptions.bind(this);
  }

  componentDidMount() {
    this.fetchRedemptions();
    this.interval = setInterval(() => this.fetchRedemptions(), 30000);
  }

  fetchRedemptions() {
    this.setState({redemptions: []});

    this.props.LNKSExchange.deployed().then(exchange => {
			exchange.getRedemptionsLength({from: this.props.account})
				.then(total => {
          for (let i = 0; i < total.toNumber(); i++) {
            exchange.getRedemption(i, {from: this.props.account})
              .then(res => {
                console.log(res);

                let redemptions = this.state.redemptions;
                redemptions.push({
                  key: i,
                  address: res[0],
                  location: res[2],
                  amount: res[1].toNumber() / 1000 + ' LNKS',
                  time: moment.unix(res[3].toNumber()).fromNow()
                });

                this.setState({
                  redemptions: redemptions
                })
              });
          }
				});
		});
  }

  approve(idx) {
    this.setState({wait: true});

    console.log("APPROVE", idx);

    this.props.LNKSExchange.deployed().then(exchange => {
      exchange.approveRedemption(idx, {
        from: this.props.account,
				gas: 250000
      })
      .then(res => {
        console.log("RES", res);

        setTimeout(() => {
          clearInterval(this.interval);

          console.log("RES", res);

          this.setState({wait: false});
          this.fetchRedemptions();
          this.interval = setInterval(() => this.fetchRedemptions(), 30000);
        }, 5000);
      })
      .catch(err => {
        this.setState({wait: false});
      });
    });
  }

  decline(idx) {
    this.setState({wait: true});

    this.props.LNKSExchange.deployed().then(exchange => {
      exchange.declineRedemption(idx, {
        from: this.props.account,
        gas: 250000
      })
      .then(res => {
        clearInterval(this.interval);

        setTimeout(() => {
          this.setState({wait: false});
          this.fetchRedemptions();
          this.interval = setInterval(() => this.fetchRedemptions(), 30000);
        }, 5000);
      })
      .catch(err => {
        this.setState({wait: false});
      });
    });
  }

  render() {
    return (
      <div className="redeems-admin">
        <div>
          <Table dataSource={this.state.redemptions}>
            <Column
              title="Address"
              dataIndex="address"
              key="address"
            />
            <Column
              title="Location"
              dataIndex="location"
              key="location"
            />
            <Column
              title="Amount"
              dataIndex="amount"
              key="amount"
            />
            <Column
              title="Time"
              dataIndex="time"
              key="time"
            />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <span>
                  <Button onClick={this.approve.bind(null, record.key)} type="primary" disabled={this.state.wait ? "true" : null}>Approve</Button>
                  <Divider type="horizontal" />
                  <Button onClick={this.decline.bind(null, record.key)} type="primary" disabled={this.state.wait ? "true" : null}>Decline</Button>
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

export default connect(mapStateToProps)(RedeemsAdmin);
