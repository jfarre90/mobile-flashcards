import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleNotificationSchedule } from '../actions/decks';
import { globalStyles } from '../utils/styles';
import CustomButton from './CustomButton';
import Separator from './Separator';

const QuizResult: FC<StackScreenProps<any>> = ({ navigation, route }) => {
    const { deckId, score, totalQuestions } = route.params!;

    const handleQuizRestart = () => {
        navigation.push('Quiz', { deckId });
    };

    const handleReturnToDeck = () => {
        navigation.navigate('Deck', { deckId });
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(handleNotificationSchedule());
    }, []);

    return (
        <ScrollView>
            <Text style={globalStyles.titleText}>Your result for the {deckId} deck quiz</Text>

            <View>
                <Text style={globalStyles.subTitleText}>
                    You answered {Math.round((score / totalQuestions) * 10000) / 100}% of the questions correctly!{' '}
                </Text>
            </View>

            <View>
                <Separator />
                <CustomButton title="Restart Quiz" onPress={handleQuizRestart} />
                <Separator />
                <CustomButton title="Back to Deck" onPress={handleReturnToDeck} />
            </View>
        </ScrollView>
    );
};

export default QuizResult;
