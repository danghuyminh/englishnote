import React from "react";
import {
    Container, Header, Title, Left, Icon, Right, Button, Body, Item, Input, Content, View, Fab
} from "native-base";
import { connect } from 'react-redux'
import { fetchNotes, fetchMoreNotes } from "../../redux/actions/NoteAction"
import InfiniteNoteList from './InfiniteNoteList';
import {StyleSheet} from "react-native";
import {Sqlite} from "../../services/DbService";
import HeaderDrawer from "../../components/HeaderDrawer";
import SearchForm from "./SearchForm";

class NoteList extends React.Component {

    state = {
        modalVisible: false,
        active: false,
        keyword: undefined,
        category: undefined
    };

    listRef = React.createRef();

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    async componentWillMount() {
        console.log('NoteList Did Mount')
        this.props.fetchNotes({isFirstLoading: true});
    }

    componentWillUnmount() {
        console.log('NoteList Unmount')
    }

    reloadContent = () => {
        this.props.fetchNotes({isRefresh: true});
    };

    loadMoreContent = () => {
       const {offset} = this.props;
       this.props.fetchMoreNotes({limit: 10, offset: (10 + parseInt(offset)), keyword: this.state.keyword});
    };

    deleteNote = (id) => {
        console.log(id)
    };

    onSearchSubmit = (values) => {
        const {keyword} = values;
        this.listRef.current.scrollToIndex({index: 0, animated: true});
        this.props.fetchNotes({isRefresh: true, limit: 10, offset: 0, keyword: keyword ? keyword : undefined});
        this.setState({
            keyword
        })
    };

    getNotes = async () => {
        const notes = await Sqlite.selectNotes({limit: 10, offset: 0});
        console.log('data---------------------------')
        console.log(notes)
    };

    render() {

        const {notes, hasMore, offset, total, limit, isRefresh, isFetching, isLoadingMore, isFirstLoading} = this.props;

        return (
            <Container>
                <HeaderDrawer title='Notes' navigation={this.props.navigation}/>
                <SearchForm onSubmit={this.onSearchSubmit} />
                <Container style={styles.container}>
                    <InfiniteNoteList notes={notes}
                                      listRef={this.listRef}
                                      offset={offset}
                                      total={total}
                                      hasMore={hasMore}
                                      limit={limit}
                                      isRefresh={isRefresh}
                                      isFirstLoading={isFirstLoading}
                                      isFetching={isFetching}
                                      isLoadingMore={isLoadingMore}
                                      deleteNote={this.deleteNote}
                                      reloadContent={this.reloadContent}
                                      loadMoreContent={this.loadMoreContent}
                    />
                </Container>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon type="MaterialCommunityIcons" name={this.state.active ? 'reorder-vertical' : 'reorder-horizontal'} />
                    <Button style={{ backgroundColor: '#34A34F' }} onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon name="add" />
                    </Button>
                    <Button style={{ backgroundColor: '#3B5998' }} onPress={() => this.props.navigation.navigate('NoteCategory')}>
                        <Icon type="FontAwesome" name="filter" />
                    </Button>
                    <Button disabled style={{ backgroundColor: '#DD5144' }}>
                        <Icon type="Ionicons" name="ios-reorder" />
                    </Button>
                </Fab>
            </Container>
        );
    }
}

function mapStateToProps (state) {
    const {notes, hasMore, offset, total, limit, isRefresh, isFetching, isLoadingMore, isFirstLoading} = state.sqliteGetNote;
    return {
        notes,
        hasMore,
        limit,
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
    searchContainer: {
        paddingTop: 3,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});