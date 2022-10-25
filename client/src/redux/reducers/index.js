import { combineReducers } from "redux";
import quoteReducer from "./quotesReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    quoteReducer: quoteReducer
});

export default rootReducer;