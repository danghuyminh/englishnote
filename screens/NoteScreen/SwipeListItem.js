import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, Alert, ActivityIndicator} from 'react-native';
import Swipeable from 'react-native-swipeable';
import {Body, ListItem, Right, Button} from "native-base";
import Moment from 'moment';

export default class SwipeListItem extends PureComponent {

    state = {
        leftActionActivated: false,
        toggle: false,
        deleted: false,
    };

    deleteSwipe = () => {
        Alert.alert(
            'Delete confirmation',
            'Are you sure you want to delete this note?',
            [
                {text: 'Cancel', onPress: () => this.deleteCancel(), style: 'cancel'},
                {text: 'OK', onPress: () => this.delete()},
            ],
            { cancelable: false }
        );

        this.setState({leftActionActivated: true})
    };

    delete = async () => {
        const {data, deleteNote} = this.props;
        try {
            await deleteNote(data.id);
            this.setState({
                deleted: true
            })
        } catch (error) {

        }
    };

    deleteCancel = () => {
        this.setState({
            leftActionActivated: false,
            toggle: false
        })
    };

    render() {
        const {leftActionActivated, toggle, deleted} = this.state;

        if (deleted) {
            return null;
        }

        const {data} = this.props;

        return (
            <Swipeable
                leftActionActivationDistance={120}
                leftContent={(
                    <View style={[styles.leftSwipeItem, leftActionActivated ? styles.leftSwipeActivated : styles.leftSwipe]}>
                        {leftActionActivated ?
                            <Text>release!</Text> :
                            <Text>keep pulling!</Text>}
                    </View>
                )}
                onLeftActionActivate={() => this.deleteSwipe()}
                onLeftActionComplete={() => this.setState({toggle: !toggle})}
                rightButtons={[
                    <Button info style={styles.rightSwipeItem}><Text>Edit</Text></Button>
                ]}
            >
                <ListItem style={[toggle ? styles.itemBeforeDelete : undefined, styles.listItem]}>
                    <Body>
                        <Text style={toggle ? styles.itemTextBeforeDelete : undefined}>{data.title}</Text>
                        <Text style={toggle ? styles.itemTextBeforeDelete : styles.itemTextExplanation} numberOfLines={2} note>{data.explanation}</Text>
                        <Text style={styles.itemDate}>
                            {new Moment(data.created_at).format("dddd, DD MMM YYYY")}
                        </Text>
                        <Text>{data.cat_id}</Text>

                    </Body>
                    {toggle && (
                        <Right>
                            <ActivityIndicator size="small" />
                        </Right>
                    )}
                </ListItem>
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftSwipeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20,
    },
    rightSwipeItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    leftSwipe: {
        backgroundColor: '#ff3300'
    },
    leftSwipeActivated : {
        backgroundColor: '#e62e00'
    },
    itemTextExplanation : {
        color: '#8e9199',
    },
    itemTextBeforeDelete : {
        color: '#bbb',
    },
    itemBeforeDelete : {
        borderBottomColor: 'red',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    itemDate: {
        marginTop: 5,
        color: '#cdb0f4'
    }
});