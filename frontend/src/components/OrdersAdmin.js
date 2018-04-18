import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { message, Table, Divider, Form, Input, Button } from 'antd';
import config from '../config';

const { Column } = Table;


class OrdersAdmin extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { orders: [], loading: false, inputs: {} };

    this.approve = this.approve.bind(this);
    this.decline = this.decline.bind(this);
    this.fetchOrders = this.fetchOrders.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchOrders();
    this.interval = setInterval(() => this.fetchOrders(), 10000);
  }

  handleChange(event, idx) {
    const { inputs } = this.state;
    inputs[idx] = event.target.value;

    this.setState({ inputs });
  }

  fetchOrders(cb) {
    let orders = [];
    const that = this;

    function addOrder(res, i, total) {
      orders.push({
        key: i,
        address: res[0],
        amount: `${that.props.web3.web3.fromWei(res[1].toNumber())} ETH`,
        time: moment.unix(res[2].toNumber()).fromNow(),
      });

      orders = _.orderBy(orders, ['key'], ['desc']);

      if (orders.length === total) {
        that.setState({ orders });

        if (cb) cb();
      }
    }

    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.getOrdersLength({ from: this.props.account })
        .then((total) => {
          if (total.toNumber() === 0) {
            this.setState({ orders });
          }

          for (let i = 0; i < total.toNumber(); i += 1) {
            exchange.getOrder(i, { from: this.props.account })
              .then((res) => {
                addOrder(res, i, total.toNumber());
              });
          }
        });
    });
  }

  approve(event, idx) {
    event.preventDefault();

    this.setState({ loading: true });

    this.hide = message.loading('Action in progress, do not close or reset this window..', 0);

    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.approveOrder(idx, parseInt(this.state.inputs[idx], 10) * 1000, {
        from: this.props.account,
        gas: config.GAS_LIMIT,
        gasPrice: config.GWEI_PRICE,
      })
        .then(() => {
          this.fetchOrders(() => {
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
      exchange.declineOrder(idx, {
        from: this.props.account,
        gas: config.GAS_LIMIT,
        gasPrice: config.GWEI_PRICE,
      })
        .then(() => {
          setTimeout(() => {
            this.setState({ loading: false });
            this.hide();
          }, 30000);
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
          <Table dataSource={this.state.orders}>
            <Column
              title="Address"
              dataIndex="address"
              key="address"
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
                  <Form onSubmit={e => this.approve(e, record.key)}>
                    <Input placeholder="1 LNKS" onChange={e => this.handleChange(e, record.key)} />

                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginTop: 15 }}
                      loading={this.state.loading}
                    >
                      Approve
                    </Button>
                  </Form>

                  <Divider type="horizontal" />

                  <Button
                    onClick={() => { this.decline(record.key); }}
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

export default connect(mapStateToProps)(OrdersAdmin);
