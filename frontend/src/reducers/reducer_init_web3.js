export default (state = [], action) => {
	switch(action.type) {
	case 'INIT_WEB3':
		return action.payload
	default:
		return state
	}
}