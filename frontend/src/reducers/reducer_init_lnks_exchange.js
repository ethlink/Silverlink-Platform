export default (state = null, action) => {
  switch (action.type) {
    case 'INIT_LNKS_EXCHANGE':
      return action.payload;
    default:
      return state;
  }
};
