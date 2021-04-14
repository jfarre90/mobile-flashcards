import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDeck } from '../actions/decks';
import { IStoreState } from '../reducers';
import { IDeck } from '../utils/helpers';

const Deck: FC<StackScreenProps<any>> = ({ navigation, route }) => {
    const { deckId } = route.params!;
    const deck: IDeck | undefined = useSelector((state: IStoreState) => state.decks[deckId]);

    const dispatch = useDispatch();

    const handleAddCardNavigate = () => {
        navigation.navigate('AddCard', { deckId });
    };

    const handleStartQuizNavigate = () => {
        navigation.navigate('Quiz', { deckId });
    };

    const handleDeleteDeck = () => {
        dispatch(deleteDeck(deckId));
        navigation.goBack();
    };

    return deck === undefined ? (
        <View>
            <Text>There was an internal issue...</Text>
        </View>
    ) : (
        <ScrollView>
            <View>
                <Text>{deck.title}</Text>
                <Text>- {deck.questions.length} cards -</Text>
            </View>
            <View>
                <Button title="Add Card" color="gray" onPress={handleAddCardNavigate} />
                <Button title="Start Quiz" color="gray" onPress={handleStartQuizNavigate} />
                <Button title="Delete Deck" color="gray" onPress={handleDeleteDeck} />
            </View>
        </ScrollView>
    );
};

export default Deck;
