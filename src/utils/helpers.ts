import AsyncStorage from '@react-native-async-storage/async-storage';

const STUDY_REMINDER_KEY = 'MobileFlashcards:studyReminder';
const DECKS_DATA_KEY = 'MobileFlashcards:decksData';

export interface IQuestionCard {
    question: string;
    answer: string;
}
export interface IDeck {
    title: string;
    questions: IQuestionCard[]
}

export async function soreReminderData(data: { [key: string]: any }): Promise<void> {
    try {
        await AsyncStorage.setItem(STUDY_REMINDER_KEY, JSON.stringify(data))
    } catch (e) {
        console.error('#### Error while storing reminder:', e);
    }
}


const placeholderDecks: { [key: string]: IDeck } = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}


export async function getDecks(): Promise<{ [key: string]: IDeck } | void> {
    try {
        const stringifiedData: string | null = await AsyncStorage.getItem(DECKS_DATA_KEY);

        //* If user has never stored anything, we use the initial placeholder data
        return stringifiedData !== null ? JSON.parse(stringifiedData) : placeholderDecks;
    } catch (e) {
        console.error('#### Error while getting decks:', e);
    }
}

export async function getDeck(deckId: string): Promise<IDeck | void> {
    try {
        const decks: { [key: string]: IDeck } | void = await getDecks();

        return decks !== undefined ? decks[deckId] : undefined;

    } catch (e) {
        console.error(`#### Error while getting deck wiht id :${deckId}: :`, e);
    }
}

export async function _saveDeckTitle(deckTitle: string): Promise<void> {
    try {
        const decks: { [key: string]: IDeck } | void = await getDecks();

        await AsyncStorage.setItem(DECKS_DATA_KEY, JSON.stringify({
            ...decks,
            [deckTitle]: {
                title: deckTitle,
                questions: []
            }
        }))
    } catch (e) {
        console.error(`#### Error while saving deck title :${deckTitle}: :`, e);
    }
}

export async function _addCardToDeck(deckId: string, card: IQuestionCard): Promise<void> {
    try {
        const decks: { [key: string]: IDeck } | void = await getDecks();
        if (decks) {
            await AsyncStorage.setItem(DECKS_DATA_KEY, JSON.stringify({
                ...decks,
                [deckId]: {
                    ...decks[deckId],
                    questions: [
                        ...decks[deckId].questions,
                        card
                    ]
                }
            }))
        }
    } catch (e) {
        console.error(`#### Error while adding card to deck :${deckId}: :`, e);
    }
}

export async function deleteDeck(deckId: string): Promise<void> {
    try {
        // TODO- write delete function for the AsyncStorage
    } catch (e) {
        console.error(`#### Error while removing deck :${deckId}: :`, e);
    }
}
