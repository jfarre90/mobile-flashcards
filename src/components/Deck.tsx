import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { handleDeleteDeck } from '../actions/decks';
import { IStoreState } from '../reducers';
import { IDeck } from '../utils/helpers';
import { globalStyles } from '../utils/styles';
import CustomButton from './CustomButton';
import Separator from './Separator';

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

    const handleDeleteDeckPress = () => {
        dispatch(handleDeleteDeck(deckId));
        navigation.goBack();
    };

    return deck === undefined ? (
        <View style={globalStyles.mainContainer}>
            <Text>There was an internal issue...</Text>
        </View>
    ) : (
        <ScrollView>
            <View style={styles.deckContainer}>
                <Text style={globalStyles.titleText}>{deck.title}</Text>
                <Text style={globalStyles.subTitleText}>- {deck.questions.length} cards -</Text>
            </View>
            <View>
                <CustomButton title="Add Card" color="gray" onPress={handleAddCardNavigate} />
                <Separator />
                <CustomButton title="Start Quiz" color="gray" onPress={handleStartQuizNavigate} />
                <Separator />
                <CustomButton title="Delete Deck" color="gray" onPress={handleDeleteDeckPress} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    deckContainer: {
        padding: 20,
        margin: 5,
        width: '100%'
    }
});

export default Deck;
