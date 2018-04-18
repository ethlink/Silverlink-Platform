import React from 'react';
import { Modal, Button, Icon } from 'antd';

const Instructions = props => (
  <Modal
    title="Instructions"
    width={720}
    footer={[
      <Button key="back" onClick={props.goBack}>
        <Icon type="left" />Go back
      </Button>,
      <Button key="faucet" style={{ margin: '0 15px' }} href="https://faucet.rinkeby.io/" target="_blank">
        Get Rinkeby Ether
      </Button>,
      <Button key="submit" type="primary" onClick={props.handleOk}>
        Let's start<Icon type="right" />
      </Button>,
    ]}
    visible={props.visible}
  >
    <h1>Performing an action:</h1>

    <p>1. For each time you perform an action inside Silverlink;
  a Metamask transaction will be created.
    </p>

    <p>2: Click <b>Submit</b> to send the transaction, then
  the order will reach the Curators board and it will be approved in the next 12 hours.
    </p>

    <p>3. After your order has been approved, your balance will automatically be
  reflected into your account for <b>-Direct Buy-</b> and in the case of
      <b>-Redeeming-</b> the amount of Tokens will be deducted from your balance
  accordingly.
    </p>
  </Modal>
);

export default Instructions;
