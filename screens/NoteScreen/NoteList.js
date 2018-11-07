import React from "react";
import {
    Container, Header, Title, Left, Icon, Right, Button, Body, List
} from "native-base";
import { connect } from 'react-redux'
import { fetchNotes, fetchMoreNotes } from "../../redux/actions/NoteAction"
import InfiniteNoteList from './InfiniteNoteList';
import {StyleSheet} from "react-native";


class NoteList extends React.Component {

    async componentWillMount() {
        console.log('NoteList Did Mount')
        this.props.fetchNotes({isFirstLoading: true});
    }

    componentWillUnmount() {
        console.log('NoteList Unmount')
    }

    reloadContent = () => {
        this.props.fetchNotes();
    };

    loadMoreContent = () => {
       const {offset} = this.props;
       this.props.fetchMoreNotes({limit: 10, offset: (10 + parseInt(offset))});
    };

    deleteNote = (id) => {
        console.log(id)
    };

    render() {

        const {notes, hasMore, offset, isRefresh, isFetching, isLoadingMore, isFirstLoading} = this.props;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>NoteScreen</Title>
                    </Body>
                    <Right />
                </Header>
                <Container style={styles.container}>

                    <InfiniteNoteList notes={notes}
                                      offset={offset}
                                      hasMore={hasMore}
                                      isRefresh={isRefresh}
                                      isFirstLoading={isFirstLoading}
                                      isFetching={isFetching}
                                      isLoadingMore={isLoadingMore}
                                      deleteNote={this.deleteNote}
                                      reloadContent={this.reloadContent}
                                      loadMoreContent={this.loadMoreContent}/>

                </Container>
            </Container>
        );
    }
}

function mapStateToProps (state) {
    const {notes, hasMore, offset, total, isRefresh, isFetching, isLoadingMore, isFirstLoading} = state.sqliteGetNote;

    return {
        notes,
        hasMore,
        offset,
        total,
        isRefresh,
        isFetching,
        isLoadingMore,
        isFirstLoading
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchNotes: (params) => dispatch(fetchNotes(params)),
        fetchMoreNotes: (params) => dispatch(fetchMoreNotes(params)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    indicator: {
        textAlign: 'center',
    },
});