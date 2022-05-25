

const intialState = {
    currentUser: {},
}

export default function (state = intialState, action) {
    switch (action.type) {
        case 'LOGIN_USER': {
            return {
                ...state,
                currentUser: action.payload
            }
        }
        case 'LOGOUT_USER': {
            return {
                ...state,
                currentUser: intialState
            }
        }

        default:
            return state;
    }
}