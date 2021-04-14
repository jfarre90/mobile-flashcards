import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleAddDeck } from '../actions/decks';

const AddDeck: FC<StackScreenProps<any>> = ({ navigation }) => {
    const [deckTitle, setDeckTitle] = useState('');

    const dispatch = useDispatch();
    const handleAddDeckPress = () => {
        if (deckTitle.length < 1) {
            Alert.alert('Title field empty', 'Please add a title.', [{ text: 'OK' }]);

            return;
        }

        dispatch(handleAddDeck(deckTitle));
        navigation.goBack();
    };

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding">
                <Text>Add a deck:</Text>
                <TextInput placeholder="Add a title for your deck" onChangeText={setDeckTitle} value={deckTitle} />
                <View>
                    <Button onPress={handleAddDeckPress} title="Create Deck" />
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default AddDeck;
