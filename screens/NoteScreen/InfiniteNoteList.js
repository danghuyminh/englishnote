import React, {PureComponent} from "react";
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

export default class InfiniteNoteList extends PureComponent {

    state = {
        notes: [],
        offset: -1
    };

    componentWillUnmount() {
        console.log('Infinite Unmount')
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('getDerivedStateFromProps');
        console.log(nextProps.notes.length)
        let notes = [];
        if (nextProps.notes.length) {
            if (nextProps.isRefresh) {
                return {
                    notes: nextProps.notes,
                    offset: nextProps.offset,
                    isLoadingMoreDone: true
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
        } else {
            console.log('When notes is empty');
            console.log(nextProps.isRefresh)
            if (nextProps.isRefresh) {
                return {
                    notes: nextProps.notes,
                    offset: 0,
                    isLoadingMoreDone: true
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
        console.log('render list*******');
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
                    data={this.state.notes}
                    renderItem={this._renderRow}
                    refreshing={isFetching}
                    onRefresh={this.props.reloadContent}
                    onEndReachedThreshold={0.01}
                    onEndReached={
                        () => {
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