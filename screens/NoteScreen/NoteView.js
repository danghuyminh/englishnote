import React from "react";
import {Button, Icon, Text, Card, CardItem, Left, Thumbnail, Body} from 'native-base';
import {View, ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux'
import { getNoteFull } from "../../redux/actions/NoteAction"
import HeaderGoBack from "../../components/HeaderGoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import {GlobalStyles} from "../../helpers/Styles";
import Config from "../../config";
import KeyboardAccessory from "react-native-sticky-keyboard-accessory";

class NoteView extends React.Component {

    state = {
        items: undefined,
        isKeyboardOpened: false,
    };

    static navigationOptions = ({ navigation }) => ({header: <HeaderGoBack navigation={navigation} title='View Note' />});

    componentWillMount() {
        const {noteId} = this.props.navigation.state.params;
        try {
            this.props.getNote(noteId);
        } catch (error) {
            // throw error here
        }
    }

    onCreateClick = () => {
        this.props.navigation.navigate("NoteCreate")
    };

    onDoneClick = () => {
        this.props.navigation.navigate("NoteList")
    };

    render() {
        const {isFetching, data} = this.props;
        return (
            <View style={GlobalStyles.noteFormContainer} >

                <ScrollView>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Icon type="MaterialCommunityIcons" size={64} name="message-bulleted" style={styles.textThemeColor} />
                                <Body>
                                <Text>{data.title}</Text>
                                <Text note style={{fontSize: 10}}>{data.created_at}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text style={[styles.textThemeColor, styles.textExplanation]}>
                                {data.explanation}
                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon type="MaterialCommunityIcons" size={24} name="filter-outline" style={styles.textCategory} />
                                    <Text style={styles.textCategory}>{data.cat_title}</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                </ScrollView>
                <KeyboardAccessory>
                    <View style={GlobalStyles.stickyButtonWrapper}>
                        <Button info onPress={this.onCreateClick} style={GlobalStyles.stickyButton}>
                            <Text>Create Note</Text>
                        </Button>
                        <Button success onPress={this.onDoneClick} style={GlobalStyles.stickyButton}>
                            <Text>Done</Text>
                        </Button>
                    </View>
                </KeyboardAccessory>
            </View>
        );
    }
}

function mapStateToProps (state) {
    const {data}        = state.sqliteGetSingleNote;
    const {isFetching}  = state.AsyncReducer;

    return {
        data,
        isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getNote:        (id)         => dispatch(getNoteFull(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteView)

const styles = StyleSheet.create({
    textThemeColor: {
        color: Config.themeColor
    },
    textCategory: {
        color: '#0d5942'
    },
    textExplanation: {
        fontSize: 18,
        textAlign: 'justify',
        lineHeight: 25,
    }
});