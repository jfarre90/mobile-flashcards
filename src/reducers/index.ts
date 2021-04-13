import { DefaultRootState } from "react-redux";
import { combineReducers } from "redux";
import { IDeck } from "../utils/helpers";
import decks from './decks';

export interface IStoreState extends DefaultRootState {
    decks: { [key: string]: IDeck };
}

export default combineReducers({
    decks
});
