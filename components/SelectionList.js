import React, {PureComponent} from "react";
import {FlatList, StyleSheet} from "react-native";
import {List, Text, View} from "native-base";
import SelectionListItem from "./SelectionListItem";

export default class SelectionList extends PureComponent {

    state = {
        selected: this.props.selected
    };

    onItemSelect = (item) => {
        this.setState({
            selected: item.id
        }, () => {
            this.props.onItemSelect(item);
        })
    };

    render() {

        const {items, isFetching} = this.props;

        return (
            <List>
                <FlatList
                    data={items}
                    renderItem={this._renderItem}
                    onRefresh={this.onRefresh}
                    keyExtractor = {(item) => item.id.toString()}
                    refreshing={isFetching}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptyContentWrapper}>
                                <Text>No categories created. Let's create your first category!</Text>
                            </View>
                        )
                    }}
                />
            </List>
        )
    }

    _renderItem = (data) => {
        return (
            <SelectionListItem data={data.item} selected={this.state.selected === data.item.id} onPress={this.onItemSelect} />
        )
    }
}

const styles = StyleSheet.create({
    emptyContentWrapper: {
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 15
    },
});