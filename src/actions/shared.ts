import { Dispatch } from "redux";
import { getDecks } from "../utils/helpers";
import { DeckActionTypes, receiveDecks } from "./decks";

export type ReduxAction = DeckActionTypes;

export function handleInitialData() {
    return async (dispatch: Dispatch): Promise<any> => {
        return getDecks().then((decks) => {
            if (decks) {
                dispatch(receiveDecks(decks));
            }
        });
    };
}
