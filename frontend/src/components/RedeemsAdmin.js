import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { message, Table, Divider, Button } from 'antd';
import _ from 'lodash';
import config from '../config';

const { Column } = Table;


class RedeemsAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = { redemptions: [], loading: false };

    this.approve = this.approve.bind(this);
    this.decline = this.decline.bind(this);
    this.fetchRedemptions = this.fetchRedemptions.bind(this);
  }

  componentDidMount() {
    this.fetchRedemptions();
    this.interval = setInterval(() => this.fetchRedemptions(), 10000);
  }

  fetchRedemptions(cb) {
    let redemptions = [];
    const that = this;

    function addRedemption(res, i, total) {
      redemptions.push({
        key: i,
        address: res[0],
        location: res[2],
        amount: `${res[1].toNumber() / 1000} LNKS`,
        time: moment.unix(res[3].toNumber()).fromNow(),
      });

      redemptions = _.orderBy(redemptions, ['key'], ['desc']);

      if (redemptions.length === total) {
        that.setState({ redemptions });

        if (cb) cb();
      }
    }

    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.getRedemptionsLength({ from: this.props.account })
        .then((total) => {
          if (total.toNumber() === 0) {
            this.setState({ redemptions });
          }

          for (let i = 0; i < total.toNumber(); i += 1) {
            exchange.getRedemption(i, { from: this.props.account })
              .then((res) => {
                addRedemption(res, i, total.toNumber());
              });
          }
        });
    });
  }

  approve(idx) {
    this.setState({ loading: true });

    this.hide = message.loading('Action in progress, do not close or reset this window..', 0);

    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.approveRedemption(idx, {
        from: this.props.account,
        gas: config.GAS_LIMIT,
        gasPrice: config.GWEI_PRICE,
      })
        .then(() => {
          this.fetchRedemptions(() => {
            setTimeout(() => {
              this.setState({ loading: false });
              this.hide();
            }, 30000);
          });
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    });
  }

  decline(idx) {
    this.setState({ loading: true });

    this.hide = message.loading('Action in progress, do not close or reset this window..', 0);

    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.declineRedemption(idx, {
        from: this.props.account,
        gas: config.GAS_LIMIT,
        gasPrice: config.GWEI_PRICE,
      })
        .then(() => {
          this.fetchRedemptions(() => {
            setTimeout(() => {
              this.setState({ loading: false });
              this.hide();
            }, 30000);
          });
        })
        .catch(() => {
          this.setState({ loading: false });
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
                  <Button
                    onClick={() => this.approve(record.key)}
                    type="primary"
                    loading={this.state.loading}
                  >
                    Approve
                  </Button>

                  <Divider type="horizontal" />

                  <Button
                    onClick={() => this.decline(record.key)}
                    type="primary"
                    loading={this.state.loading}
                  >
                    Decline
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
    account: state.account,
  };
}

export default connect(mapStateToProps)(RedeemsAdmin);
