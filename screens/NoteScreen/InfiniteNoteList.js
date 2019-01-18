import React, {PureComponent, Component} from "react";
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
import _ from "lodash";

export default class InfiniteNoteList extends PureComponent {

    state = {
        notes: [],
        offset: -1,
    };

    moreEnabled = false;

    componentWillUnmount() {
        console.log('Infinite Unmount')
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('getDerivedStateFromProps');
        console.log(nextProps.notes.length)
        console.log(nextProps.isRefresh)
        console.log(nextProps.offset + ' vx ' + prevState.offset);
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

    componentDidUpdate() {
        this.moreEnabled = false;
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
        console.log('render list********');
        console.log(this.props.isFirstLoading)
        const {isFirstLoading, isFetching, isLoadingMore, hasMore, listRef, category} = this.props;

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
                    onScrollBeginDrag={() =>  {this.moreEnabled = true}}
                    onEndReachedThreshold={0.3}
                    onEndReached={
                        () => {
                            if (this.moreEnabled) {
                                if (!isLoadingMore && hasMore)
                                    this.loadMoreContent()
                            }
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
                                {category ? (
                                    <Text>No notes found in the selected category!</Text>
                                ) : (
                                    <Text>No notes created. Let's create your first note!</Text>
                                )}
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