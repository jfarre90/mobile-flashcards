import { Dispatch } from "redux";
import { IDeck, IQuestionCard, _addCardToDeck } from "../utils/helpers";

export const GET_DECKS = 'GET_DECKS';
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

interface IDeleteDeckAction {
    type: typeof DELETE_DECK;
    deckId: string;
}

export type DeckActionTypes = IGetDecksAction | IAddCardToDeckAction | IDeleteDeckAction;

export function receiveDecks(decks: { [key: string]: IDeck }): DeckActionTypes {
    return {
        type: GET_DECKS,
        decks
    };
}

export function handleAddCardToDeck(deckId: string, card: IQuestionCard): (dispatch: Dispatch) => Promise<any> {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(addCardToDeck(deckId, card));

        try {
            _addCardToDeck(deckId, card);
        } catch (err) {
            //TODO - add reverting the addition of the card
            // dispatch(removeCardFromDeck(deckId, card));
            // alert('There was an error submitting your answer. Try again!');
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

export function deleteDeck(deckId: string): DeckActionTypes {
    return {
        type: DELETE_DECK,
        deckId
    };
}
