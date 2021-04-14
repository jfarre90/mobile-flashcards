import React, { FC, useState } from 'react';
import { Button, Text, View } from 'react-native';

export interface ICardProps {
    question: string;
    answer: string;
}

const Card: FC<ICardProps> = ({ question, answer }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    const handleCardFlip = () => {
        setShowAnswer(!showAnswer);
    };

    return showAnswer ? (
        <View>
            <Text>{answer}</Text>
            <Button title="Show Question" onPress={handleCardFlip} />
        </View>
    ) : (
        <View>
            <Text>{question}</Text>
            <Button title="Show Answer" onPress={handleCardFlip} />
        </View>
    );
};

export default Card;
