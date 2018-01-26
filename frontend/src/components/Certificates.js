import React, { Component } from 'react';
import { connect } from 'react-redux';
import ipfsAPI from 'ipfs-api';
import { Button } from 'antd';


class Certficates extends Component {
  constructor () {
    super()
    this.state = {
      added_file_hash: null,
      file: null
    }
    this.ipfsApi = ipfsAPI('localhost', '5001')

    this.captureFile = this.captureFile.bind(this)
    this.saveToIpfs = this.saveToIpfs.bind(this)
    this.arrayBufferToString = this.arrayBufferToString.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  captureFile (event) {
    event.stopPropagation()
    event.preventDefault()

    const file = event.target.files[0]
    this.setState({file})
  }

  saveToIpfs (reader) {
    let ipfsId
    const buffer = Buffer.from(reader.result)

    this.ipfsApi.files.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        console.log(ipfsId)
        this.setState({added_file_hash: ipfsId})
      }).catch((err) => {
        console.error(err)
      })
  }

  arrayBufferToString (arrayBuffer) {
    return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer))
  }

  handleSubmit (event) {
    event.preventDefault()

    let reader = new window.FileReader()

    reader.onloadend = () => this.saveToIpfs(reader)
    reader.readAsArrayBuffer(this.state.file)
  }

  render() {
    return (
      <div className="certificates-admin">
        {this.state.added_file_hash &&
          <div>
            <p>File added to <a href={`https://ipfs.io/ipfs/${this.state.added_file_hash}`}>https://ipfs.io/ipfs/${this.state.added_file_hash}</a></p>
          </div>
        }

        <form id='captureMedia' onSubmit={this.handleSubmit}>
          <input type='file' onChange={this.captureFile} />
          <Button htmlType='submit' type="primary" style={{marginTop: 15}}>Upload file to IPFS</Button>
        </form>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    web3: state.web3,
    LNKSExchange: state.LNKSExchange,
    LNKSToken: state.LNKSToken,
    account: state.account
  }
}

export default connect(mapStateToProps)(Certficates);
