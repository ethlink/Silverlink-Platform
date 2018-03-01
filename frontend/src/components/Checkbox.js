import React from 'react';
import '../css/_checkbox.scss';

const Checkbox = () => (
  <div id="box" style={{ overflow: 'hidden', 'background-color': '#fff' }}>
    <div className="row">
      <div className="col-xs-12 text-center" id="demoContainer">
        <form
          id="registrationForm"
          className="form-horizontal fv-form fv-form-bootstrap"
          noValidate="novalidate"
          style={{ marginTop: 15 }}
        >
          <button type="submit" className="fv-hidden-submit" style={{ display: 'none', width: '0px', height: '0px;' }} />

          <div className="form-group" style={{ 'background-color': '#fff' }}>
            <h3 className="col-xs-3 control-h3 " style={{ 'font-size': '16px;' }}>Welcome to Link!</h3>
            <div className="col-xs-9">
              <div style={{
                border: '1px solid #e5e5e5', height: '300px', overflow: 'auto', padding: '10px', 'background-color': '#fff',
                }}
              >
                <h3><b>Instructions:</b></h3>

                <br />

                <p>In order to use this application you need a Metamask
                  account and being connected to<br />
                  Rinkeby Test Network instead of Main net.<br />

                  <h4>Please Follow the Next Steps in Order to Use Metamask:</h4>
                </p>

                <br />

                <p><font size="3"><b>1: </b></font>
                  Download and install <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Metamask</a> extension.<br />
                </p>
                <p><font size="3"><b>2: </b></font>
                  Connect to Rinkeby Test Net by clicking the top right arrow and selecting
                  <b>Rinkeby Test Network.</b>
                </p>
                <p><font size="3"><b>3: </b></font>
                  Now that you are connected into Rinkeby Test Network you need some Rinkeby Ether fortunately, you can get it for free just by completing a social network <a href="https://faucet.rinkeby.io/" target="_blank" rel="noopener noreferrer">challenge</a>.
                  Now you are ready to use Link Platform.
                </p>

                <br />

                <label className="text-center control-label" style={{ marginBottom: 15 }}>
                  Performing an Action:
                </label><br />

                <p><font size="3"><b>1-</b></font>
                  For each time you perform an action inside Link;
                  a Metamask transaction will be created.
                </p>
                <p><font size="3"><b>2:</b></font>
                  Click <b>Submit</b> to send the transaction, then
                  the order will reach the Curators board and they will need to approve it,
                  this normally takes 12 hours after you have submitted it.
                </p>
                <p><font size="3"><b>3:</b></font>
                  After your order has been approved, your balance will automatically be
                  reflected into your account in you used <b>-Direct Buy-</b> and in the case of
                  <b>-Redeeming-</b> the amount of Tokens will be deducted from your balance
                  accordingly.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <br />

    <div className="form-group text-center">
      <div className="col-xs-9 col-xs-offset-3" style={{ marginBottom: 15 }}>
        <a
          href="/app"
          className=" btn btn-default btn-gray g-color-black btn-lg mt15 g-color-white--hover"
        >
          Go
        </a>
      </div>

      <br />

      <div className="col-xs-9 col-xs-offset-3" style={{ marginBottom: 30 }}>
        <a href="https://faucet.rinkeby.io/" target="_blank" rel="noopener noreferrer" className=" btn btn-default btn-gray g-color-black btn-lg mt15 g-color-white--hover" >Get Rinkeby Ether<span className="ion-android-arrow-down" /></a>
      </div>
    </div>

  </div>
);


export default Checkbox;
