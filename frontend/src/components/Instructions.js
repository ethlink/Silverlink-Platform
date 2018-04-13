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
    <p>In order to use this application you need a Metamask account and being connected to Rinkeby Test Network instead of Main net.</p>

    <h3>How to Use Metamask:</h3>

    <p>1. Download and install <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Metamask</a> extension.</p>
    <p>2. Connect to Rinkeby Test Net by clicking the top right arrow and selecting Rinkeby Test Network.</p>

    <p>3. Now that you are connected into Rinkeby Test Network you need some Rinkeby Ether. Fortunately, you can get it for free just by completing a social network <a href="https://faucet.rinkeby.io/" target="_blank" rel="noopener noreferrer">challenge</a>. Now you are ready to use Link Platform.</p>

    <h3>Performing an action:</h3>

    <p>1. For each time you perform an action inside Link;
  a Metamask transaction will be created.
    </p>

    <p>2: Click <b>Submit</b> to send the transaction, then
  the order will reach the Curators board and they will need to approve it,
  this normally takes 12 hours after you have submitted it.
    </p>

    <p>3. After your order has been approved, your balance will automatically be
  reflected into your account in you used <b>-Direct Buy-</b> and in the case of
      <b>-Redeeming-</b> the amount of Tokens will be deducted from your balance
  accordingly.
    </p>
  </Modal>
);

export default Instructions;
