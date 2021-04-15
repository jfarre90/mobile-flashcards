import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, Text, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleAddDeck } from '../actions/decks';
import { globalStyles } from '../utils/styles';
import CustomButton from './CustomButton';

const AddDeck: FC<StackScreenProps<any>> = ({ navigation }) => {
    const [deckTitle, setDeckTitle] = useState('');

    const dispatch = useDispatch();
    const handleAddDeckPress = () => {
        if (deckTitle.length < 1) {
            Alert.alert('Title field empty', 'Please add a title.', [{ text: 'OK' }]);

            return;
        }

        dispatch(handleAddDeck(deckTitle));
        const chosenTitle: string = deckTitle;
        setDeckTitle('');
        navigation.navigate('Deck', { deckId: chosenTitle });
    };

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding">
                <Text style={globalStyles.titleText}>Add a deck:</Text>
                <TextInput
                    style={globalStyles.textInput}
                    placeholder="Add a title for your deck"
                    onChangeText={setDeckTitle}
                    value={deckTitle}
                />
                <CustomButton onPress={handleAddDeckPress} title="Create Deck" />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default AddDeck;
