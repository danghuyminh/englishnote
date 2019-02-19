import React from "react";
import {Button, Icon, Text, Card, CardItem, Left, Body} from 'native-base';
import {View, ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux'
import { viewRemoteNote } from "../../redux/actions/UserAction"
import HeaderGoBack from "../../components/HeaderGoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import {GlobalStyles} from "../../helpers/Styles";
import Config from "../../config";
import KeyboardAccessory from "react-native-sticky-keyboard-accessory";

class CommunityNoteView extends React.Component {

    state = {
        items: undefined,
        isKeyboardOpened: false,
    };

    static navigationOptions = ({ navigation }) => ({header: <HeaderGoBack navigation={navigation} title='View Note' />});

    componentWillMount() {
        const {id} = this.props.navigation.state.params;
        try {
            this.props.viewRemoteNote(id);
        } catch (error) {
            // throw error here
        }
    }

    onDoneClick = () => {
        this.props.navigation.goBack();
    };

    render() {
        const {isFetching, data} = this.props;
        return (
            <View style={GlobalStyles.noteFormContainer} >
                <LoadingSpinner visible={isFetching} title='Retrieving note...' />
                <ScrollView>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Icon type="MaterialCommunityIcons" size={64} name="message-bulleted" style={styles.textThemeColor} />
                                <Body>
                                    <Text>{data.title}</Text>
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
                                    <Text style={styles.textCategory}>{data.cat_title ? data.cat_title : 'Uncategorized'}</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                </ScrollView>
                <KeyboardAccessory>
                    <View style={GlobalStyles.stickyButtonWrapper}>
                        <Button light full onPress={this.onDoneClick} style={GlobalStyles.stickyButtonFull}>
                            <Text>Back</Text>
                        </Button>
                    </View>
                </KeyboardAccessory>
            </View>
        );
    }
}

function mapStateToProps (state) {
    const {data}        = state.firebaseViewNote;
    const {isFetching}  = state.AsyncReducer;

    return {
        data,
        isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        viewRemoteNote:        (id)         => dispatch(viewRemoteNote(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommunityNoteView)

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