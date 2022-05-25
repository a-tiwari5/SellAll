export const LoginUser = currentUser => dispatch => {
    dispatch({
        type: 'LOGIN_USER',
        payload: currentUser
    })
}


export const LogOutUser = (currentUser) => (dispatch, setState) => {
    dispatch({
        type: 'LOGOUT_USER',
        payload: setState({
            currentUser: {}
        })
    })
}