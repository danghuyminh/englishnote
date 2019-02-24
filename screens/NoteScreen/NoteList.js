import React from "react";
import {
    Container, Icon, Button, Fab, Text
} from "native-base";
import { connect } from 'react-redux'
import { fetchNotes, fetchMoreNotes, deleteNote, synchronizeLocalToRemote, synchronizeRemoteToLocal } from "../../redux/actions/NoteAction"
import InfiniteNoteList from './InfiniteNoteList';
import {StyleSheet} from "react-native";
import {Sqlite} from "../../services/DbService";
import HeaderDrawer from "../../components/HeaderDrawer";
import SearchForm from "./SearchForm";
import LoadingSynchronization from "../../components/LoadingSynchronization";
import Config from "../../config";
import {SettingService} from "../../services/SettingService";

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
           this._scrollToTop();
           this.props.fetchNotes({isRefresh: true, keyword: prevState.keyword, categoryId: this.props.categoryId});
           this.setState({active: false})
       } else if (this.props.newItemModified) {
           console.log('scroll top after did update');
           this._scrollToTop();
       } else if (this.props.forceReload) {
           console.log('run into force reload <--------------------');
           this.props.fetchNotes({isRefresh: true, keyword: undefined, categoryId: undefined});
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
        this.props.navigation.navigate('NoteUpdate', {
            noteId: id
        })
    };

    viewNote = (id) => {
        this.props.navigation.navigate('NoteView', {
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
        this.props.synchronizeLocalToRemote();
    };

    getNotes = async () => {
        const notes = await Sqlite.selectNotes({limit: 2, offset: 0});
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
        //this.getNotes();
        //SettingService.updateSetting('auto_sync');
        const {
            notes, hasMore, offset, total, limit, isRefresh,
            isFetching, isLoadingMore, isFirstLoading,
            categoryId, categoryName, updatedItem
        } = this.props;

        return (
            <Container>
                <LoadingSynchronization type='local'/>
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
                                  viewNote={this.viewNote}
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
                    <Button onPress={this.syncLocalToHost} style={{ backgroundColor: Config.themeColor }}>
                        <Icon type="Ionicons" name="sync" />
                    </Button>
                </Fab>
            </Container>
        );
    }
}

function mapStateToProps (state) {
    const {notes, hasMore, offset, total, limit, isRefresh, isFetching, isLoadingMore, isFirstLoading, newItemModified, updatedItem, forceReload} = state.sqliteGetNote;
    const {categoryId, categoryName} = state.sqliteGetNoteCategory;

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
        categoryName,
        newItemModified,
        updatedItem,
        forceReload
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchNotes: (params) => dispatch(fetchNotes(params)),
        fetchMoreNotes: (params) => dispatch(fetchMoreNotes(params)),
        deleteNote: (id) => dispatch(deleteNote(id)),
        synchronizeLocalToRemote: () => dispatch(synchronizeLocalToRemote()),
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