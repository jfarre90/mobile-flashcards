import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'black'
    },
    buttonContainer: {
        margin: 15
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    subTitleText: {
        fontSize: 20,
        color: 'gray',
        textAlign: 'center'
    },
    textInput: {
        height: 40,
        margin: 12,
        padding: 7,
        borderWidth: 1
    },
});