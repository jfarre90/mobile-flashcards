import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { IStoreState } from '../reducers';
import { IDeck } from '../utils/helpers';
import { globalStyles } from '../utils/styles';

const DeckList: FC<StackScreenProps<any>> = ({ navigation }) => {
    const decks: { [key: string]: IDeck } = useSelector((state: IStoreState) => state.decks);

    const loading = false;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(handleInitialData());
    }, [decks.length]);

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
                const deck = decks[deckId];
                return (
                    <Pressable
                        style={globalStyles.mainContainer}
                        android_ripple={{ color: 'gray' }}
                        key={deckId}
                        onPress={() => handleDeckPress(deckId)}
                    >
                        <View style={styles.deckContainer}>
                            <Text style={globalStyles.titleText}>{deckId}</Text>
                            <Text style={globalStyles.subTitleText}>{deck.questions.length} cards</Text>
                        </View>
                    </Pressable>
                );
            })}
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

export default DeckList;
