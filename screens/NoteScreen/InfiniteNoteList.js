import React from "react";
import {
    FlatList,
    RefreshControl,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import {
    View, Text
} from "native-base";
import SwipeListItem from './SwipeListItem';

export default class InfiniteNoteList extends React.Component {

    state = {
        notes: [],
        offset: -1
    };

    componentWillUnmount() {
        console.log('Infinite Unmount')
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('getDerivedStateFromProps');
        let notes = [];
        if (nextProps.notes.length) {
            if (nextProps.isRefresh) {
                return {
                    notes: nextProps.notes,
                    offset: nextProps.offset
                };
            } else if (nextProps.offset !== prevState.offset) {
                notes = prevState.notes;
                Array.prototype.push.apply(notes, nextProps.notes);
                return {
                    notes,
                    offset: nextProps.offset,
                    isLoadingMoreDone: true,
                };
            }
        }

        return null;
    }

    loadMoreContent = () => {
        if (this.state.isLoadingMoreDone) {
            this.setState({
                isLoadingMoreDone: false
            }, () => {
                console.log('loading more....');
                this.props.loadMoreContent();
            });
        }
    };

    render() {
        const {isFirstLoading, isFetching, isLoadingMore, hasMore, listRef} = this.props;
        return (
            <React.Fragment>
            { isFirstLoading ? (
                <View>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <FlatList
                    ref={listRef}
                    initialNumToRender={10}
                    data={this.state.notes}
                    renderItem={this._renderRow}
                    refreshing={isFetching}
                    onRefresh={this.props.reloadContent}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => {
                        console.log('isLoadingMore2');
                        console.log(isLoadingMore);
                        console.log(hasMore);
                            (!isLoadingMore && hasMore) && this.loadMoreContent()
                        }
                    }
                    ListFooterComponent={() => {
                        return (
                            isLoadingMore &&
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <ActivityIndicator size="large" />
                                <Text>Loading More Notes...</Text>
                            </View>
                        );
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptyContentWrapper}>
                                <Text>No notes created. Let's create your first note!</Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => `note-item-${index}`}
                />
            )}
            </React.Fragment>
        );
    }

    _renderRow = (data) => {
        return (
            <SwipeListItem data={data.item}
                           deleteNote={this.props.deleteNote} />
        )
    };
}

const styles = StyleSheet.create({
    emptyContentWrapper: {
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 15
    },
});