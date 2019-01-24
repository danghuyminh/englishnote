import React from "react";
import {
    Container, Icon, Button, Fab, Text
} from "native-base";
import { connect } from 'react-redux'
import { fetchNotes, fetchMoreNotes, deleteNote, synchronizeLocalToRemote } from "../../redux/actions/NoteAction"
import InfiniteNoteList from './InfiniteNoteList';
import {StyleSheet} from "react-native";
import {Sqlite} from "../../services/DbService";
import HeaderDrawer from "../../components/HeaderDrawer";
import SearchForm from "./SearchForm";
import SyncService from "../../services/SyncService";
import LoadingSynchronization from "../../components/LoadingSynchronization";

class NoteList extends React.Component {

    state = {
        modalVisible: false,
        active: false,
        keyword: undefined
    };

    listRef = React.createRef();

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    componentDidUpdate(prevProps, prevState, snapshot) {

       if (prevProps.categoryId !== this.props.categoryId) {
           console.log('category changed---------------------------')
           this._scrollToTop();
           this.props.fetchNotes({isRefresh: true, keyword: prevState.keyword, categoryId: this.props.categoryId});
           this.setState({active: false})
       } else if (this.props.newItemModified) {
           this._scrollToTop();
       }
    }

    async componentWillMount() {
        console.log('NoteList Will Mount');
        await this.props.fetchNotes({isFirstLoading: true, keyword: ''});
    }

    componentWillUnmount() {
        console.log('NoteList Unmount');
        //this.props.resetNoteList();
    }

    reloadContent = () => {
        this.props.fetchNotes({isRefresh: true, keyword: this.state.keyword, categoryId: this.props.categoryId});
    };

    loadMoreContent = () => {
       const {offset} = this.props;
       this.props.fetchMoreNotes({limit: 10, offset: (10 + parseInt(offset)), keyword: this.state.keyword, categoryId: this.props.categoryId});
    };

    deleteNote = (id) => {
        try {
            this.props.deleteNote(id);
        } catch (error) {
            console.log(error);
            // throw error here
        }
    };

    editNote = (id) => {
        this.props.navigation.navigate('NoteUpdate',{
            noteId: id
        })
    };

    onSearchSubmit = (values) => {
        const {keyword} = values;
        this._scrollToTop();
        this.props.fetchNotes({isRefresh: true, keyword, categoryId: this.props.categoryId});
        this.setState({
            keyword
        })
    };

    syncLocalToHost = async () => {
        this.props.synchronize();
    };

    togglePopup = () => {
        this.setState({
            showLoading: !this.state.showLoading
        })
    };

    getNotes = async () => {
        const notes = await Sqlite.selectNotes({limit: 10, offset: 0});
        console.log('data---------------------------')
        console.log(notes)
    };

    _scrollToTop = () => {
        if (this.props.notes.length) {
            this.listRef.current.scrollToIndex({index: 0, animated: true});
        }
    };

    render() {
        console.log('render NoteList');
        const {notes, hasMore, offset, total, limit, isRefresh, isFetching, isLoadingMore, isFirstLoading, isSynchronizing, categoryId, categoryName, updatedItem} = this.props;

        return (
            <Container>
                <LoadingSynchronization visible={isSynchronizing} togglePopup={this.togglePopup}/>
                <HeaderDrawer title='Notes' navigation={this.props.navigation}/>
                <SearchForm onSubmit={this.onSearchSubmit} />
                {categoryId && (
                    <Button info block><Text>{categoryName}</Text></Button>
                )}
                <InfiniteNoteList notes={notes}
                                  listRef={this.listRef}
                                  updatedItem={updatedItem}
                                  category={categoryId}
                                  offset={offset}
                                  total={total}
                                  hasMore={hasMore}
                                  limit={limit}
                                  isRefresh={isRefresh}
                                  isFirstLoading={isFirstLoading}
                                  isFetching={isFetching}
                                  isLoadingMore={isLoadingMore}
                                  editNote={this.editNote}
                                  deleteNote={this.deleteNote}
                                  reloadContent={this.reloadContent}
                                  loadMoreContent={this.loadMoreContent}
                />
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon type="MaterialCommunityIcons" name={this.state.active ? 'reorder-vertical' : 'reorder-horizontal'} />
                    <Button style={{ backgroundColor: '#3B5998' }} onPress={() => this.props.navigation.navigate('NoteCategory')}>
                        <Icon type="FontAwesome" name="filter" />
                    </Button>
                    <Button style={{ backgroundColor: '#34A34F' }} onPress={() => this.props.navigation.navigate('NoteCreate')}>
                        <Icon name="add" />
                    </Button>
                    <Button onPress={this.syncLocalToHost} style={{ backgroundColor: '#DD5144' }}>
                        <Icon type="Ionicons" name="ios-reorder" />
                    </Button>
                </Fab>
            </Container>
        );
    }
}

function mapStateToProps (state) {
    const {notes, hasMore, offset, total, limit, isRefresh, isFetching, isLoadingMore, isFirstLoading, newItemModified} = state.sqliteGetNote;
    const {categoryId, categoryName} = state.sqliteGetNoteCategory;
    const {isSynchronizing} = state.synchronizeNote;

    return {
        notes,
        hasMore,
        limit,
        offset,
        total,
        isRefresh,
        isFetching,
        isLoadingMore,
        isFirstLoading,
        categoryId,
        isSynchronizing,
        categoryName,
        newItemModified
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchNotes: (params) => dispatch(fetchNotes(params)),
        fetchMoreNotes: (params) => dispatch(fetchMoreNotes(params)),
        deleteNote: (id) => dispatch(deleteNote(id)),
        synchronize: () => dispatch(synchronizeLocalToRemote()),
        //resetNoteList: () => dispatch(resetNoteList()),
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
    searchContainer: {
        paddingTop: 3,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});