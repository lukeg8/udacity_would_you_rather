import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import users from "./users";
import authUser from "./authUser";
import questions from "./questions";
import comments from "./comments";

export default combineReducers({
    authUser,
    users,
    questions,
    comments,
    loadingBar: loadingBarReducer
});
