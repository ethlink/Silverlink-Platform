import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="row">
    <div id="header" className="col-xs-12">
      <Link href="/app" to="/app">
        <h2>SILVER LINK PLATFORM</h2>
      </Link>
    </div>
  </div>
);

export default Header;
