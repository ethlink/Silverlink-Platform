import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const columns = [
  {
    title: 'Full Name', width: 100, dataIndex: 'name', key: 'name',
  },
  {
    title: 'Address', width: 100, dataIndex: 'address', key: 'address',
  },
  {
    title: 'Postal code', width: 100, dataIndex: 'postalcode', key: 'postalcode',
  },
  {
    title: 'Country', width: 100, dataIndex: 'country', key: 'country',
  },
  {
    title: 'City', width: 100, dataIndex: 'city', key: 'city',
  },
  {
    title: 'State', width: 100, dataIndex: 'state', key: 'state',
  },
  {
    title: 'Proof of residence',
    width: 100,
    dataIndex: 'residence',
    key: 'residence',
    render: () => <a href="/api/users/identity/asd">action</a>,
  },
  {
    title: 'Identity document', width: 100, dataIndex: 'identity', key: 'identity',
  },
];

class KYCAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    axios.get('/api/users/unverified')
      .then((response) => {
        this.setState({ users: response.data.users });
      });

    axios.get('/api/users/identity/asd')
      .then((response) => {
        console.log(response);
      });
  }

  renderUsers() {
    const data = this.state.users.map(user => ({
      key: user.email,
      name: `${user.firstName} ${(user.middleName !== 'undefined' ? user.middleName : '')} ${user.surname}`,
      address: user.address,
      postalcode: user.postalcode,
      country: user.country,
      city: user.city,
      state: user.state,
      residence: user.residence,
      identity: user.identity,
    }));

    return <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 1000 }} />;
  }

  render() {
    return (
      <div className="kyc-admin" style={{ marginBottom: 30 }}>
        <div>
          {this.renderUsers()}
        </div>
      </div>
    );
  }
}

export default KYCAdmin;
