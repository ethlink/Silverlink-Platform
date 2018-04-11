import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';
import * as actions from '../actions';

const Header = props => (
  <div className="row">
    <div id="header" className="col-xs-12">
      <Link href="/app" to="/app">
        <h2>SILVER LINK PLATFORM</h2>
      </Link>

      {props.auth.authenticated &&
        <Button onClick={props.signoutUser}>
          <Icon type="logout" />Logout
        </Button>}

      <hr />
    </div>
  </div>
);

export default connect(state => ({ auth: state.auth }), actions)(Header);
