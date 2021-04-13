import { ADD_CARD, DELETE_DECK, GET_DECKS } from '../actions/decks';
import { ReduxAction } from '../actions/shared';
import { IDeck } from '../utils/helpers';

export default function decks(state: { [deckId: string]: IDeck } = {}, action: ReduxAction): { [questionId: string]: IDeck } {
    switch (action.type) {
        case GET_DECKS:
            return {
                ...state,
                ...action.decks
            };

        case ADD_CARD:
            return {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                    questions: [
                        ...state[action.deckId].questions,
                        action.card
                    ]
                }
            }
        case DELETE_DECK:
            const { [action.deckId]: value, ...newState } = state;

            return newState;
        default:
            return state;
    }
}
