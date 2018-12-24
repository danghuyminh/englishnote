import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Swipeable from 'react-native-swipeable';
import {Body, ListItem, Right, Button} from "native-base";

export default class CategorySwipeListItem extends Component {

    state = {
        leftActionActivated: false,
        rightActionActivated: false,
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
        const {data, onDeleteCategory} = this.props;
        try {
            await onDeleteCategory(data.id);
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

    editSwipe = (id) => {
        const {onEditButtonClick} = this.props;
        this.setState({rightActionActivated: true});
        onEditButtonClick(id)
    };

    render() {
        const {leftActionActivated, rightActionActivated, toggle, deleted} = this.state;

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
                rightActionActivationDistance={160}
                rightContent={(
                    <View style={[styles.rightSwipeItem, rightActionActivated ? styles.rightSwipeActivated : styles.rightSwipe]}>
                        {rightActionActivated ?
                            <Text>edit</Text> :
                            <Text>pull to edit!</Text>}
                    </View>
                )}
                onRightActionActivate={() => this.editSwipe(data.id)}
                onRightActionComplete={() => this.setState({toggle: false})}
                onRightActionDeactivate={() => this.setState({rightActionActivated: !rightActionActivated})}
            >
                <ListItem style={[toggle ? styles.itemBeforeDelete : undefined, styles.listItem]}>
                    <Body>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <Button danger style={styles.leftRightSignButton}/>
                            <Text style={[toggle ? styles.itemTextBeforeDelete : undefined, styles.categoryTitle]}>{data.title}</Text>
                        </View>
                    </Body>
                    <Right>
                        <Button info style={styles.leftRightSignButton}/>
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
    categoryTitle: {
      marginLeft: 20
    },
    leftRightSignButton : {
        width: 2,
        marginLeft: -10,
        marginRight: -10
}   ,
    leftSwipeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20,
    },
    rightSwipeItem: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    leftSwipe: {
        backgroundColor: '#ff3300'
    },
    leftSwipeActivated : {
        backgroundColor: '#e62e00'
    },
    rightSwipe: {
        backgroundColor: '#66ccff'
    },
    rightSwipeActivated : {
        backgroundColor: '#0077b3'
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