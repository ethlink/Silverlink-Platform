import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import InitWeb3Reducer from './reducer_init_web3';
import InitLNKSTokenReducer from './reducer_init_lnks_token';
import InitLNKSExchangeReducer from './reducer_init_lnks_exchange';
import FetchAccountReducer from './reducer_fetch_account';

const rootReducer = combineReducers({
  web3: InitWeb3Reducer,
  LNKSToken: InitLNKSTokenReducer,
  LNKSExchange: InitLNKSExchangeReducer,
  account: FetchAccountReducer,
  form: formReducer,
});

export default rootReducer;
