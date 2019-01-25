import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, Alert, ActivityIndicator, Animated} from 'react-native';
import Swipeable from 'react-native-swipeable';
import {Body, ListItem, Right, Button} from "native-base";
import Moment from 'moment';

export default class SwipeListItem extends PureComponent {

    state = {
        leftActionActivated: false,
        toggle: false,
        deleted: false
    };
    swipeable   = null;
    springValue = new Animated.Value(1);
    borderColor = new Animated.Value(0);

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

    componentDidUpdate() {
        const {updatedItem, data} = this.props;
        if (updatedItem && updatedItem.id === data.id) {
            this.swipeable.recenter();
            this.handleAnimation();
        }
    }


    handleAnimation = () => {
        this.borderColor.setValue(0);
        this.springValue.setValue(1);

        Animated.sequence([
            Animated.timing(
                this.borderColor,
                {
                    toValue: 5,
                    duration: 1000,

                }
            ),
            Animated.spring(
                this.springValue,
                {
                    toValue: 1.5,
                    friction: 4
                }
            ),
            Animated.timing(
                this.springValue,
                {
                    toValue: 1,
                    duration: 500
                }
            )
        ]).start();
    };

    handleItemClick = (id) => {
        this.springValue.setValue(1);
        Animated.sequence([
            Animated.spring(
                this.springValue,
                {
                    toValue: 2,
                    tension : 60,
                }
            ),
        ]).start(() => this.props.viewNote(id));
        setTimeout(() => {
            Animated.timing(
                this.springValue,
                {
                    toValue: 1,
                    duration: 500
                }
            ).start();
        }, 2000);
    };

    render() {
        const {leftActionActivated, toggle, deleted} = this.state;

        if (deleted) {
            return null;
        }

        const {data, editNote} = this.props;

        return (
            <Swipeable
                onRef={ref => this.swipeable = ref}
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
                    <Button info style={styles.rightSwipeItem} onPress={() => editNote(data.id)}><Text>Edit</Text></Button>
                ]}
            >
                <Animated.View style={{
                    transform: [{scale: this.springValue}],
                    borderColor: this.borderColor.interpolate({
                        inputRange: [0, 1, 3, 4, 5],
                        outputRange: ['red', 'blue', 'green', 'violet', 'white']
                    }),
                    borderWidth: this.borderColor.interpolate({
                        inputRange: [0, 1, 3, 4, 5],
                        outputRange: [0, 2, 2, 2, 0]
                    }) }}>
                    <ListItem onPress={() => this.handleItemClick(data.id)} style={[toggle ? styles.itemBeforeDelete : undefined, styles.listItem]}>
                        <Body>
                            <Text style={toggle ? styles.itemTextBeforeDelete : undefined}>{data.title}</Text>
                            <Text style={toggle ? styles.itemTextBeforeDelete : styles.itemTextExplanation} numberOfLines={2} note>{data.explanation}</Text>
                            <Text style={styles.itemDate}>
                                {new Moment(data.created_at).format("dddd, DD MMM YYYY")}
                            </Text>
                            <Text style={styles.itemCat}>{data.cat_title ?? 'Uncategorized'}</Text>
                        </Body>
                        {toggle && (
                            <Right>
                                <ActivityIndicator size="small" />
                            </Right>
                        )}
                    </ListItem>
                </Animated.View>
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
        color: '#0e7c62',
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
        color: '#8ea5a1',
        fontSize: 10
    },
    itemCat: {
        marginTop: 5,
        color: '#276858',
        fontSize: 10
    }
});