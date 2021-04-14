import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { IStoreState } from '../reducers';
import { IDeck } from '../utils/helpers';

const DeckList: FC<StackScreenProps<any>> = ({ navigation }) => {
    const decks: { [key: string]: IDeck } = useSelector((state: IStoreState) => state.decks);

    const loading = false;

    //TODO - fix this reload to avoid running continuously
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(handleInitialData());
    });

    const handleDeckPress = (deckId: string) => {
        navigation.navigate('Deck', { deckId });
    };

    return loading ? (
        <View>
            <Text>Loading...</Text>
        </View>
    ) : (
        <ScrollView>
            {Object.keys(decks).map((deckId) => {
                return (
                    <Pressable key={deckId} onPress={() => handleDeckPress(deckId)}>
                        <Text>{deckId} -- This is my deck</Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
};

export default DeckList;
