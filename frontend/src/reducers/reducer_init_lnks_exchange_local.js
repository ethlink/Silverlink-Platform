export default (state = [], action) => {
	switch(action.type) {
	case 'INIT_LNKS_EXCHANGE_LOCAL':
		return action.payload
	default:
		return state
	}
}
