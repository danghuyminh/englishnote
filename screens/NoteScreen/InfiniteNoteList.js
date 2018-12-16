import React from "react";
import {
    ListView,
    RefreshControl,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import {
    View
} from "native-base";
import SwipeListItem from './SwipeListItem';

export default class InfiniteNoteList extends React.Component {

    state = {
        notes: [],
        offset: -1,
        dataSource: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        })
    };

    componentWillUnmount() {
        console.log('Infinite Unmount')
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('getDerivedStateFromProps');
        let notes = [];
        if (nextProps.notes.length) {
            if (nextProps.isRefresh) {
                notes = nextProps.notes;
                return {
                    notes,
                    dataSource: prevState.dataSource.cloneWithRows(notes),
                    offset: nextProps.offset
                };
            } else if (nextProps.offset !== prevState.offset) {
                notes = prevState.notes;
                Array.prototype.push.apply(notes, nextProps.notes);
                return {
                    notes,
                    dataSource: prevState.dataSource.cloneWithRows(notes),
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
        const {isFirstLoading, isLoadingMore, hasMore} = this.props;

        return (
            <React.Fragment>
            { isFirstLoading ? (
                <View>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <ListView
                    initialListSize={10}
                    pageSize={10}
                    dataSource={this.state.dataSource}
                    scrollRenderAheadDistance={5000}
                    stickyHeaderIndices={[]}
                    renderRow={this._renderRow}
                    refreshControl={this._renderRefreshControl()}
                    onEndReachedThreshold={0.01}
                    renderScrollComponent={undefined}
                    onEndReached={() =>
                        (!isLoadingMore && hasMore) && this.loadMoreContent()
                    }
                    renderFooter={() => {
                        return (
                            isLoadingMore &&
                            <View style={{ flex: 1 }}>
                                <ActivityIndicator size="small" />
                            </View>
                        );
                    }}
                />
            )}
            </React.Fragment>
        );
    }

    _renderRow = (data) => {

        return (
            <SwipeListItem data={data}
                           deleteNote={this.props.deleteNote} />
        )
    };

    _renderRefreshControl = (data) => {
        return (
            <RefreshControl
                refreshing={this.props.isFetching}
                onRefresh={this.props.reloadContent}
            />
        )
    };
}