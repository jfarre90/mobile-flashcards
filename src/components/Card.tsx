import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from '../utils/styles';

export interface ICardProps {
    question: string;
    answer: string;
    showAnswer: boolean;
    handleCardFlip: () => void;
}

const Card: FC<ICardProps> = ({ question, answer, showAnswer, handleCardFlip }) => {
    return showAnswer ? (
        <View>
            <Text style={styles.cardAnswer}>{answer}</Text>
            <TouchableOpacity onPress={handleCardFlip}>
                <Text style={styles.showText}>Show Question</Text>
            </TouchableOpacity>
        </View>
    ) : (
        <View>
            <Text style={styles.cardQuestion}>{question}</Text>
            <TouchableOpacity onPress={handleCardFlip}>
                <Text style={styles.showText}>Show Answer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardQuestion: {
        ...globalStyles.titleText,
        fontSize: 35,
        marginTop: 80,
        marginBottom: 20
    },
    cardAnswer: {
        ...globalStyles.titleText,
        marginTop: 80,
        marginBottom: 20
    },
    showText: {
        ...globalStyles.subTitleText,
        fontSize: 15,
        marginBottom: 15
    }
});

export default Card;
