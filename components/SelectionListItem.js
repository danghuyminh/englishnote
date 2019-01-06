import React, {PureComponent} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Left, ListItem, Right, Icon} from "native-base";

export default class SelectionListItem extends PureComponent {

    render() {

        const {data, selected, onPress} = this.props;

        return (
            <ListItem style={[selected ? styles.itemSelected : undefined, styles.listItem]} selected={selected} onPress={() => onPress(data)}>
                <Left>
                    <Text style={[styles.listItemLeft, selected ? styles.listItemLeftSelected : undefined]}>
                        {data.title}
                    </Text>
                </Left>
                <Right>
                    <Icon type="MaterialCommunityIcons" name={selected ? 'check-all' : 'chevron-right'} />
                </Right>
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    itemSelected: {
        color: '#333'
    },
    listItemLeft: {
        color: '#334'
    },
    listItemLeftSelected: {
        color: 'green'
    }
});