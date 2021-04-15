import { Dispatch } from "redux";
import { clearLocalNotification, IDeck, IQuestionCard, scheduleNotification, _addCardToDeck, _deleteDeck, _saveDeckTitle } from "../utils/helpers";

export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_DECK = 'DELETE_DECK';

interface IGetDecksAction {
    type: typeof GET_DECKS;
    decks: { [key: string]: IDeck };
}

interface IAddCardToDeckAction {
    type: typeof ADD_CARD;
    deckId: string;
    card: IQuestionCard
}

interface IAddDeckAction {
    type: typeof ADD_DECK;
    deckId: string;
}

interface IDeleteDeckAction {
    type: typeof DELETE_DECK;
    deckId: string;
}

export type DeckActionTypes = IGetDecksAction | IAddCardToDeckAction | IDeleteDeckAction | IAddDeckAction;

export function receiveDecks(decks: { [key: string]: IDeck }): DeckActionTypes {
    return {
        type: GET_DECKS,
        decks
    };
}

export function handleAddDeck(deckId: string): (dispatch: Dispatch) => Promise<any> {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(addDeck(deckId));

        try {
            _saveDeckTitle(deckId);
        } catch (err) {
        }
    };
}

function addDeck(deckId: string): DeckActionTypes {
    return {
        type: ADD_DECK,
        deckId
    };
}

export function handleAddCardToDeck(deckId: string, card: IQuestionCard): (dispatch: Dispatch) => Promise<any> {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(addCardToDeck(deckId, card));

        try {
            _addCardToDeck(deckId, card);
        } catch (err) {
        }
    };
}


function addCardToDeck(deckId: string, card: IQuestionCard): DeckActionTypes {
    return {
        type: ADD_CARD,
        deckId,
        card
    };
}

export function handleNotificationSchedule(): (dispatch: Dispatch) => Promise<any> {
    return async (): Promise<any> => {

        try {
            clearLocalNotification();
            scheduleNotification();
        } catch (err) {

        }
    };
}



export function handleDeleteDeck(deckId: string): (dispatch: Dispatch) => Promise<any> {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(deleteDeck(deckId));

        try {
            _deleteDeck(deckId);
        } catch (err) {
        }
    };
}


function deleteDeck(deckId: string): DeckActionTypes {
    return {
        type: DELETE_DECK,
        deckId
    };
}
