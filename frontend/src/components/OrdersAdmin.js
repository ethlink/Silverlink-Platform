import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Divider, Form, Input, Button } from 'antd';

const { Column } = Table;


class OrdersAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = { redemptions: [], wait: false, inputs: {} };

    this.approve = this.approve.bind(this);
    this.decline = this.decline.bind(this);
    this.fetchOrders = this.fetchOrders.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchOrders();
    this.interval = setInterval(() => this.fetchOrders(), 30000);
  }

  handleChange(event, idx) {
    const { inputs } = this.state;
    inputs[idx] = event.target.value;

    this.setState({ inputs });
  }

  fetchOrders() {
    this.setState({ redemptions: [] });

    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.getOrdersLength({ from: this.props.account })
        .then((total) => {
          for (let i = 0; i < total.toNumber(); i += 1) {
            exchange.getOrder(i, { from: this.props.account })
              .then((res) => {
                const { redemptions } = this.state;
                redemptions.push({
                  key: i,
                  address: res[0],
                  amount: `${this.props.web3.web3.fromWei(res[1].toNumber())} ETH`,
                  time: moment.unix(res[2].toNumber()).fromNow(),
                });

                const { inputs } = this.state;
                inputs[i] = 0;

                this.setState({
                  redemptions,
                  inputs,
                });
              });
          }
        });
    });
  }

  approve(event, idx) {
    event.preventDefault();

    this.setState({ wait: true });

    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.approveOrder(idx, parseInt(this.state.inputs[idx], 10) * 1000, {
        from: this.props.account,
        gas: 200000,
      })
        .then(() => {
          clearInterval(this.interval);

          this.setState({ wait: false });
          this.fetchOrders();
          this.interval = setInterval(() => this.fetchOrders(), 30000);
        })
        .catch(() => {
          this.setState({ wait: false });
        });
    });
  }

  decline(idx) {
    this.setState({ wait: true });

    this.props.LNKSExchange.deployed().then((exchange) => {
      exchange.declineOrder(idx, {
        from: this.props.account,
        gas: 200000,
      })
        .then(() => {
          clearInterval(this.interval);

          this.setState({ wait: false });
          this.fetchOrders();
          this.interval = setInterval(() => this.fetchOrders(), 30000);
        })
        .catch(() => {
          this.setState({ wait: false });
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
                    <Button type="primary" htmlType="submit" style={{ marginTop: 15 }} disabled={this.state.wait ? 'true' : null}>Approve</Button>
                  </Form>

                  <Divider type="horizontal" />

                  <Button onClick={() => { this.decline(record.key); }} type="primary" disabled={this.state.wait ? 'true' : null}>Decline</Button>
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
