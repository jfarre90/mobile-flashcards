import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
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

const store: Store<IStoreState, ReduxAction> = createStore(reducer, middleware);

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeScreenNavigator: FC = () => {
    return (
        <Stack.Navigator initialRouteName="DeckList">
            <Stack.Screen name="DeckList" component={DeckList} options={{ title: 'Available Decks' }} />
            <Stack.Screen name="Deck" component={Deck} options={{ title: 'Deck view' }} />
            <Stack.Screen name="AddCard" component={AddCard} options={{ title: 'Add Card' }} />
            <Stack.Screen name="Quiz" component={Quiz} options={{ title: 'Deck Quiz' }} />
            <Stack.Screen name="QuizResult" component={QuizResult} options={{ title: 'Quiz Result' }} />
        </Stack.Navigator>
    );
};

const App: FC = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Home">
                    <Tab.Screen name="Home" component={HomeScreenNavigator} options={{ title: 'Available Decks' }} />
                    <Tab.Screen name="AddDeck" component={AddDeck} options={{ title: 'Add Deck' }} />
                    <StatusBar style="auto" />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f3f3f3',
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });
