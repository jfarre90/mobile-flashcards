import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { IStoreState } from '../reducers';
import { IDeck, IQuestionCard } from '../utils/helpers';
import { globalStyles } from '../utils/styles';
import Card from './Card';
import CustomButton from './CustomButton';
import Separator from './Separator';

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
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleQuizAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        if (questionsPosition === cards.length - 1) {
            navigation.navigate('QuizResult', {
                deckId,
                score: isCorrect ? score + 1 : score,
                totalQuestions: cards.length
            });
        } else {
            setShowAnswer(false);
            setQuestionsPosition(questionsPosition + 1);
        }
    };

    const handleCardFlip = () => {
        setShowAnswer(!showAnswer);
    };

    const currentCard: IQuestionCard = cards[questionsPosition];

    return currentCard ? (
        <ScrollView>
            <Text style={globalStyles.titleText}>Quiz for {deck.title} deck</Text>
            <Text style={globalStyles.subTitleText}>
                Question {questionsPosition + 1} of {cards.length}
            </Text>
            <View>
                <Card
                    question={currentCard.question}
                    answer={currentCard.answer}
                    showAnswer={showAnswer}
                    handleCardFlip={handleCardFlip}
                />
            </View>
            <View>
                <CustomButton
                    title="Correct"
                    color="lightgreen"
                    onPress={() => {
                        handleQuizAnswer(true);
                    }}
                />
                <Separator />
                <CustomButton
                    title="Incorrect"
                    color="orangered"
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
