import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const BuyRedeemButton = (props) => {
  const disabled = !props.auth.user || props.auth.user.residenceApproved !== 'approved' || props.auth.user.identityApproved !== 'approved';

  return (
    <Link
      href="/buy-redeem"
      to="/buy-redeem"
      id="buy-redeem-link"
      className={`ant-btn ant-btn-primary ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
    >
      Buy and Redeem
    </Link>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(BuyRedeemButton);
