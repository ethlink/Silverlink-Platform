export default (state = [], action) => {
	switch(action.type) {
	case 'INIT_LNKS_TOKEN':
		return action.payload
	default:
		return state
	}
}