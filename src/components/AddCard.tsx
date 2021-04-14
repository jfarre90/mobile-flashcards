import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleAddCardToDeck } from '../actions/decks';

const AddCard: FC<StackScreenProps<any>> = ({ navigation, route }) => {
    const { deckId } = route.params!;

    const [questionText, setQuestionTextChange] = useState('');
    const [answerText, setAnswerTextChange] = useState('');

    const dispatch = useDispatch();
    const handleAddCard = () => {
        if (questionText.length < 1) {
            Alert.alert('Question field empty', 'Please add a question.', [{ text: 'OK' }]);

            return;
        } else if (answerText.length < 1) {
            Alert.alert('Answer field empty', 'Please add an answer.', [{ text: 'OK' }]);

            return;
        }

        dispatch(handleAddCardToDeck(deckId, { question: questionText, answer: answerText }));
        navigation.goBack();
    };

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding">
                <Text>Add a card to deck: {deckId}</Text>
                <TextInput
                    placeholder="Add your question..."
                    onChangeText={setQuestionTextChange}
                    value={questionText}
                />
                <TextInput placeholder="Add an answer..." onChangeText={setAnswerTextChange} value={answerText} />
                <View>
                    <Button onPress={handleAddCard} title="Submit" />
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default AddCard;
