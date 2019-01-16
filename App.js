import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import { Provider } from 'react-redux';
import {store} from './redux/configureStore'
import * as firebase from 'firebase';
import 'firebase/firestore';
import InitScreen from "./screens/LoadingScreen";
import {Root} from 'native-base';
import {Sqlite} from "./services/DbService";
import sample30 from "./screens/NoteScreen/sample30";
import sampleCat from "./screens/NoteScreen/sampleCat";
import "./helpers/IgnoreTimerWarning";

export default class App extends React.Component {
    state = {
        isLoadingComplete: false
    };

    componentDidMount() {
        const config = {
            apiKey: "AIzaSyDEoIIjVchgf7a7pr5FYnNKVCb-gZ73a4E",
            authDomain: "englishnote-219616.firebaseapp.com",
            databaseURL: "https://englishnote.firebaseio.com",
            projectId: "englishnote-219616",
            storageBucket: "englishnote-219616.appspot.com",
            messagingSenderId: "81512437678",
        };

        firebase.initializeApp(config);
        global['fire'] = firebase;
        global['auth'] = firebase.auth();
        const firestore = firebase.firestore();
        const settings = {
            timestampsInSnapshots: true
        };
        firestore.settings(settings);

        //console.log(Expo.FileSystem.documentDirectory);

        //Sqlite.createSampleNotes(sample30, sampleCat);
        //Sqlite.resetRefId();
        //Sqlite.setUpdateTest();
    }

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        }

        return (
            <Provider store={store}>
                <Root>
                    <View
                        style={styles.statusBar}
                    />
                    <StatusBar barStyle='light-content' />
                    <InitScreen/>
                </Root>
            </Provider>
        );
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                //...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
            Font.loadAsync({
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
                MaterialCommunityIcons: require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf'),
                FontAwesome: require("@expo/vector-icons/fonts/FontAwesome.ttf"),
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        backgroundColor: '#40c4a5'
    },
});