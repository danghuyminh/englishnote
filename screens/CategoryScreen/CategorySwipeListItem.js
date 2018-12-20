import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, ActivityIndicator} from 'react-native';
import Swipeable from 'react-native-swipeable';
import {Body, ListItem, Left, Right, Button} from "native-base";

export default class CategorySwipeListItem extends Component {

    state = {
        leftActionActivated: false,
        toggle: false,
        deleted: false,
    };

    deleteSwipe = () => {
        Alert.alert(
            'Delete confirmation',
            'Are you sure you want to delete this category?',
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
                leftActionActivationDistance={220}
                leftContent={(
                    <View style={[styles.leftSwipeItem, leftActionActivated ? styles.leftSwipeActivated : styles.leftSwipe]}>
                        {leftActionActivated ?
                            <Text>delete!</Text> :
                            <Text>pull to delete!</Text>}
                    </View>
                )}
                onLeftActionActivate={() => this.deleteSwipe()}
                onLeftActionComplete={() => this.setState({toggle: !toggle})}
                rightContent={(
                    <View style={[styles.leftSwipeItem, leftActionActivated ? styles.leftSwipeActivated : styles.leftSwipe]}>
                        {leftActionActivated ?
                            <Text>delete!</Text> :
                            <Text>pull to delete!</Text>}
                    </View>
                )}
                onRightActionActivate={() => this.deleteSwipe()}
                onRightActionComplete={() => this.setState({toggle: !toggle})}
            >
                <ListItem style={[toggle ? styles.itemBeforeDelete : undefined, styles.listItem]}>

                    <Body>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>

                            <Button danger style={styles.leftSign}/>

                            <Text style={toggle ? styles.itemTextBeforeDelete : undefined}>{data.title}</Text>

                    </View>
                    </Body>
                    <Right>
                        <Button info style={styles.leftSign}/>
                    </Right>
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
    leftColumn: {
      marginLeft: 5
    },
    leftSign : {
        width: 5
}   ,
    leftSwipeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        //paddingRight: 20,
    },
    rightSwipeItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //paddingLeft: 20,
        //paddingRight: 20
    },
    leftSwipe: {
        backgroundColor: 'steelblue'
    },
    leftSwipeActivated : {
        backgroundColor: 'lightgoldenrodyellow'
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
    }
});