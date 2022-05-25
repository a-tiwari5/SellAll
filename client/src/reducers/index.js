import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import mainReducer from "./mainReducer";

export default combineReducers({
    form: formReducer,
    currentUser: mainReducer
})

