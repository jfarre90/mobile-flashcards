import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { IStoreState } from '../reducers';
import { IDeck, IQuestionCard } from '../utils/helpers';
import Card from './Card';

const Quiz: FC<StackScreenProps<any>> = ({ navigation, route }) => {
    const { deckId } = route.params!;

    const deck: IDeck | undefined = useSelector((state: IStoreState) => state.decks[deckId]);
    const cards: IQuestionCard[] | undefined = useSelector((state: IStoreState) => state.decks[deckId].questions);

    if (cards === undefined || cards.length === 0) {
        return (
            <View>
                <Text>The Deck {deckId} has no cards...</Text>
            </View>
        );
    }

    const [questionsPosition, setQuestionsPosition] = useState(0);
    const [score, setScore] = useState(1);

    const handleQuizAnswer = (isCorrect: boolean) => {
        // TODO - set local notification reset here

        if (isCorrect) {
            setScore(score + 1);
        }

        if (questionsPosition === cards.length - 1) {
            navigation.navigate('QuizResult', { deckId, score, totalQuestions: cards.length });
        } else {
            setQuestionsPosition(questionsPosition + 1);
        }
    };

    const currentCard: IQuestionCard = cards[questionsPosition];

    return currentCard ? (
        <ScrollView>
            <Text>Quiz for {deck.title} deck</Text>
            <Text>
                Question: {questionsPosition + 1} of {cards.length}
            </Text>
            <View>
                <Card question={currentCard.question} answer={currentCard.answer} />
            </View>
            <View>
                <Button
                    title="Correct"
                    onPress={() => {
                        handleQuizAnswer(true);
                    }}
                />
                <Button
                    title="Incorrect"
                    onPress={() => {
                        handleQuizAnswer(false);
                    }}
                />
            </View>
        </ScrollView>
    ) : (
        <View>
            <Text>Reached the end...</Text>
        </View>
    );
};

export default Quiz;
