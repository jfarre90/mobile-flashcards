import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { ReduxAction } from './src/actions/shared';
import AddCard from './src/components/AddCard';
import Deck from './src/components/Deck';
import DeckList from './src/components/DeckList';
import middleware from './src/middleware';
import reducer, { IStoreState } from './src/reducers';

const store: Store<IStoreState, ReduxAction> = createStore(reducer, middleware);

const Stack = createStackNavigator();

const App: FC = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="DeckList">
                    <Stack.Screen name="DeckList" component={DeckList} options={{ title: 'Available Decks' }} />
                    <Stack.Screen name="Deck" component={Deck} options={{ title: 'Deck view' }} />
                    <Stack.Screen name="AddCard" component={AddCard} options={{ title: 'Add Card' }} />
                </Stack.Navigator>
                <StatusBar style="auto" />
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
