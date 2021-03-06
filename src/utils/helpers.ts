import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

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

export const askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        return false;
    }
    return true;
};

export const clearLocalNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
};

export const scheduleNotification = async () => {
    const isPermissionGranted = await askPermissions();
    if (isPermissionGranted) {

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Remember your quiz!',
                body: 'You have not taken a quiz in the last day! Do not lose your momentum',
                data: {}
            },
            trigger: {
                repeats: false,
                date: tomorrow
                //* Used for testing
                // seconds: 5
            }
        });
    }
};

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

export async function _deleteDeck(deckId: string): Promise<void> {
    try {
        const decks: { [key: string]: IDeck } | void = await getDecks();
        if (decks) {
            const { [deckId]: value, ...otherDecks } = decks;
            await AsyncStorage.setItem(DECKS_DATA_KEY, JSON.stringify(otherDecks))
        }
    } catch (e) {
        console.error(`#### Error while removing deck :${deckId}: :`, e);
    }
}
