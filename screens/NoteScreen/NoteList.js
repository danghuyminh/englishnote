import React from "react";
import {
    Container, Header, Title, Left, Icon, Right, Button, Body, Footer, FooterTab, Item, Input, Content, View, Fab
} from "native-base";
import { connect } from 'react-redux'
import { fetchNotes, fetchMoreNotes } from "../../redux/actions/NoteAction"
import InfiniteNoteList from './InfiniteNoteList';
import {StyleSheet, Modal, Text, TouchableHighlight, Alert} from "react-native";


class NoteList extends React.Component {

    state = {
        modalVisible: false,
        active: false
    };

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
       this.props.fetchMoreNotes({limit: 10, offset: (10 + parseInt(offset))});
    };

    deleteNote = (id) => {
        console.log(id)
    };
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {

        const {notes, hasMore, offset, total, limit, isRefresh, isFetching, isLoadingMore, isFirstLoading} = this.props;

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

                <Header style={styles.searchContainer}>
                    <Content>
                        <Item rounded>
                            <Icon active name='search' />
                            <Input placeholder='Rounded Textbox'/>
                        </Item>
                    </Content>
                </Header>
                <Container style={styles.container}>

                    <InfiniteNoteList notes={notes}
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
                                      loadMoreContent={this.loadMoreContent}/>

                </Container>


                <View style={{marginTop: 22}}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Model closed', 'Modal has been closed.');
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={{marginTop: 100}}>
                            <View>
                                <Text>Hello World2!</Text>

                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>

                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Text>Show Modal</Text>
                    </TouchableHighlight>
                </View>


                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="share" />
                        <Button style={{ backgroundColor: '#34A34F' }}>
                            <Icon name="logo-whatsapp" />
                        </Button>
                        <Button style={{ backgroundColor: '#3B5998' }}>
                            <Icon name="logo-facebook" />
                        </Button>
                        <Button disabled style={{ backgroundColor: '#DD5144' }}>
                            <Icon name="mail" />
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