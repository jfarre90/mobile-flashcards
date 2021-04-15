import React, { FC } from 'react';
import { Button, View } from 'react-native';
import { globalStyles } from '../utils/styles';

interface ICustomButtonProps {
    onPress: () => void;
    title?: string;
    color?: string;
}

const CustomButton: FC<ICustomButtonProps> = ({ onPress, title, color }) => {
    return (
        <View style={globalStyles.buttonContainer}>
            <Button onPress={onPress} title={title || ''} color={color || ''} />
        </View>
    );
};

export default CustomButton;
