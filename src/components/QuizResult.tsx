import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';

const QuizResult: FC<StackScreenProps<any>> = ({ navigation, route }) => {
    const { deckId, score, totalQuestions } = route.params!;

    const handleQuizRestart = () => {
        navigation.push('Quiz', { deckId });
    };

    const handleReturnToDeck = () => {
        navigation.navigate('Deck', { deckId });
    };

    return (
        <ScrollView>
            <Text>Your result for the {deckId} deck quiz</Text>

            <View>
                <Text>You answered {(score / totalQuestions) * 100}% of the questions correctly! </Text>
            </View>

            <View>
                <Button title="Restart Quiz" onPress={handleQuizRestart} />
                <Button title="Back to Deck" onPress={handleReturnToDeck} />
            </View>
        </ScrollView>
    );
};

export default QuizResult;
