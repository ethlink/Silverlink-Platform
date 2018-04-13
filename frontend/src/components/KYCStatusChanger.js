import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Select } from 'antd';

const { Option } = Select;

class KYCStatusChanger extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.status, status: this.props.status, loading: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(status) {
    this.setState({ value: status });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });

    axios
      .put(`/api/users/${this.props.type}`, {
        status: this.state.value,
        email: this.props.email,
      }).then(() => {
        this.setState({ status: this.state.value, loading: false });
      }).catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <p style={{ fontWeight: 500, color: 'rgba(0, 0, 0, 0.85)' }}>Status: <b>{this.state.status.toUpperCase()}</b></p>
        <Button style={{ width: '100%' }} icon="cloud" href={`/api/users/${this.props.type}/${this.props.filename}`}>
          Download
        </Button>

        <Form style={{ marginTop: 15 }} onSubmit={this.handleSubmit}>
          <Select
            style={{ marginBottom: 15 }}
            onChange={this.handleChange}
            value={this.state.value}
          >
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>

          <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={this.state.loading}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default KYCStatusChanger;
