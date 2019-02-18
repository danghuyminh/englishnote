import React from "react";
import {
    Body, Container, ListItem, Text, Footer, FooterTab, Button
} from "native-base";
import { connect } from 'react-redux'
import HeaderGoBack from "../../components/HeaderGoBack";
import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import {getRemoteNotes} from "../../redux/actions/UserAction";
import {GlobalStyles} from "../../helpers/Styles";

class CommunityView extends React.Component {

    state = {
        items: undefined,
        isKeyboardOpened: false,
    };

    moreEnabled = false;

    static navigationOptions = ({ navigation }) => ({header: <HeaderGoBack navigation={navigation} title='Community' />});

    componentWillMount() {
        const {uid} = this.props.navigation.state.params;
        this.props.getRemoteNotes(uid);
    }

    componentDidUpdate() {
        this.moreEnabled = false;
    }

    loadMoreContent = (next) => {
        console.log('LOADING MORE <-----------------------');
        const {uid} = this.props.navigation.state.params;
        this.props.getRemoteNotes(uid, next);
    };

    onRefresh = () => {
        const {uid} = this.props.navigation.state.params;
        this.props.getRemoteNotes(uid);
    };

    render() {
        const {uid} = this.props.navigation.state.params;
        const {notes, next, isFetching, isLoadMore} = this.props;
        //console.log('next<----------------');
        //console.log(next);
        return (
            <Container>
                <Text>Community view content</Text>
                <Text>{uid}</Text>
                { isFetching && !isLoadMore ? (
                    <View style={GlobalStyles.centerScreen}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <FlatList
                        data={notes}
                        renderItem={this._renderItem}
                        onRefresh={this.onRefresh}
                        refreshing={isFetching}
                        keyExtractor = {(item) => item.id.toString()}
                        ListEmptyComponent={() => {
                            return (
                                <View>
                                    <Text>No notes found!</Text>
                                </View>
                            )
                        }}
                        ListFooterComponent={() => {
                            return (
                                (isFetching && isLoadMore) &&
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <ActivityIndicator size="large" />
                                    <Text>Loading More Notes...</Text>
                                </View>
                            );
                        }}
                        onScrollBeginDrag={() =>  {this.moreEnabled = true}}
                        onEndReachedThreshold={0.1}
                        onEndReached={
                            () => {
                                console.log(
                                    'on end reached'
                                )
                                console.log(this.moreEnabled)
                                if (this.moreEnabled && !isFetching && next)
                                    this.loadMoreContent(next)
                            }
                        }
                    />

                )}
                { !isFetching && (
                    <Footer>
                        <FooterTab style={styles.footerTab}>
                            <Button light onPress={() => this.props.navigation.goBack()}>
                                <Text>Back</Text>
                            </Button>
                            <Button success quare style={{opacity: notes.length ? 100 : 0}}>
                                <Text style={styles.retrieveButton}>Retrieve</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                )}
            </Container>
        );
    }

    _renderItem = (data) => {
        return (
            <ListItem onPress={() => this.onItemClick(data.item.id)}>
                <Body>
                    <Text>{data.item.title}</Text>
                    <Text note numberOfLines={2}>{data.item.explanation}</Text>
                    <Text style={styles.itemCat}>{data.item.cat_title ?? 'Uncategorized'}</Text>
                </Body>
            </ListItem>
        )
    }
}

function mapStateToProps (state) {
    const {notes, next, isLoadMore} = state.firebaseGetNotes;
    const {isFetching} = state.AsyncReducer;
    console.log('mapStateToProps <------------');
    console.log(notes)
    return {
        notes,
        next,
        isLoadMore,
        isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getRemoteNotes: (uid, next) => dispatch(getRemoteNotes(uid, next))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommunityView)

const styles = StyleSheet.create({
    itemCat: {
        marginTop: 5,
        color: '#276858',
        fontSize: 10
    },
    footerTab: {
        backgroundColor: 'white'
    },
    retrieveButton: {
        color: '#fff'
    }
});