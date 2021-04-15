import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, Text, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleAddCardToDeck } from '../actions/decks';
import { globalStyles } from '../utils/styles';
import CustomButton from './CustomButton';

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

        setQuestionTextChange('');
        setAnswerTextChange('');
        navigation.goBack();
    };

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding">
                <Text style={globalStyles.titleText}>Add a card to deck: {deckId}</Text>
                <TextInput
                    style={globalStyles.textInput}
                    placeholder="Add your question..."
                    onChangeText={setQuestionTextChange}
                    value={questionText}
                />
                <TextInput
                    style={globalStyles.textInput}
                    placeholder="Add an answer..."
                    onChangeText={setAnswerTextChange}
                    value={answerText}
                />
                <CustomButton onPress={handleAddCard} title="Submit" />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default AddCard;
