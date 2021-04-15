import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { ReduxAction } from './src/actions/shared';
import AddCard from './src/components/AddCard';
import AddDeck from './src/components/AddDeck';
import Deck from './src/components/Deck';
import DeckList from './src/components/DeckList';
import Quiz from './src/components/Quiz';
import QuizResult from './src/components/QuizResult';
import middleware from './src/middleware';
import reducer, { IStoreState } from './src/reducers';
import * as Notifications from 'expo-notifications';

const store: Store<IStoreState, ReduxAction> = createStore(reducer, middleware);

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false
    })
});

const HomeScreenNavigator: FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="DeckList"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: 'add-circle' | 'add-circle-outline' | 'list' | 'list-outline' | undefined;

                    if (route.name === 'DeckList') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'AddDeck') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen name="DeckList" component={DeckList} options={{ title: 'Available Decks' }} />
            <Tab.Screen name="AddDeck" component={AddDeck} options={{ title: 'Add Deck' }} />
        </Tab.Navigator>
    );
};

const App: FC = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreenNavigator} options={{ title: '' }} />
                    <Stack.Screen name="DeckList" component={DeckList} options={{ title: 'Available Decks' }} />
                    <Stack.Screen name="Deck" component={Deck} options={{ title: 'Deck view' }} />
                    <Stack.Screen name="AddCard" component={AddCard} options={{ title: 'Add Card' }} />
                    <Stack.Screen name="Quiz" component={Quiz} options={{ title: 'Deck Quiz' }} />
                    <Stack.Screen name="QuizResult" component={QuizResult} options={{ title: 'Quiz Result' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
