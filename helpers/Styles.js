import {StyleSheet} from "react-native";

export const FormStyles = StyleSheet.create({
    fieldWrapper: {
        marginTop: 30
    },
});

export const GlobalStyles = StyleSheet.create({
    noteFormContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 15
    },
    stickyButtonWrapper: {
        flexDirection: 'row',
        height: 46,
        width: '100%',
        justifyContent: 'space-between'
    },
    stickyButton: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});