import contract from 'truffle-contract';
import LNKSTokenArtifact from '../contracts/LNKSToken.json';
import LNKSExchangeArtifact from '../contracts/LNKSExchange.json';

export function initWeb3() {
  const { web3 } = window;
  const { Web3 } = window;

  if (typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
    const provider = web3.currentProvider;
    const web3Initiated = new Web3(provider);

    return {
      type: 'INIT_WEB3',
      payload: {
        web3Initiated,
        web3,
        provider,
      },
    };
  }

  return {
    type: 'INIT_WEB3',
    payload: {
      web3Initiated: null,
      web3InitiatedLocal: null,
      web3: null,
      provider: null,
    },
  };
}

export function initLNKSTokenContract(payload) {
  const instance = contract(LNKSTokenArtifact);

  if (payload.provider) {
    instance.setProvider(payload.provider);
  }

  return {
    type: 'INIT_LNKS_TOKEN',
    payload: instance,
  };
}

export function initLNKSExchangeContract(payload) {
  const instance = contract(LNKSExchangeArtifact);

  if (payload.provider) {
    instance.setProvider(payload.provider);
  }

  return {
    type: 'INIT_LNKS_EXCHANGE',
    payload: instance,
  };
}

export function initLNKSExchangeContractLocal(payload) {
  const instance = contract(LNKSExchangeArtifact);

  if (payload.provider) {
    instance.setProvider(payload.provider);
  }

  return {
    type: 'INIT_LNKS_EXCHANGE_LOCAL',
    payload: instance,
  };
}

export function fetchAccount(payload) {
  return (dispatch) => {
    if (payload.web3) {
      payload.web3.eth.getCoinbase((err, account) => {
        if (err === null) {
          dispatch({
            type: 'FETCH_ACCOUNT',
            payload: (account != null ? account : 'empty'),
          });
        } else {
          dispatch({
            type: 'FETCH_ACCOUNT',
            payload: null,
          });
        }
      });
    } else {
      dispatch({
        type: 'FETCH_ACCOUNT',
        payload: null,
      });
    }
  };
}
