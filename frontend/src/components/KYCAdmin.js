import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import KYCStatusChanger from './KYCStatusChanger';

const columns = [
  {
    title: 'Full Name', width: 200, dataIndex: 'name', key: 'name',
  },
  {
    title: 'Address', width: 200, dataIndex: 'address', key: 'address',
  },
  {
    title: 'Postal code', width: 150, dataIndex: 'postalcode', key: 'postalcode',
  },
  {
    title: 'Country', width: 150, dataIndex: 'country', key: 'country',
  },
  {
    title: 'City', width: 150, dataIndex: 'city', key: 'city',
  },
  {
    title: 'State', width: 150, dataIndex: 'state', key: 'state',
  },
  {
    title: 'Proof of residence',
    width: 250,
    dataIndex: 'residence',
    key: 'residence',
    fixed: 'right',
    render: props => <KYCStatusChanger {...props} />,
  },
  {
    title: 'Identity document',
    width: 250,
    dataIndex: 'identity',
    key: 'identity',
    fixed: 'right',
    render: props => <KYCStatusChanger {...props} />,
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
      residence: {
        filename: user.residence, status: user.residenceApproved, email: user.email, type: 'residence',
      },
      identity: {
        filename: user.identity, status: user.identityApproved, email: user.email, type: 'identity',
      },
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
