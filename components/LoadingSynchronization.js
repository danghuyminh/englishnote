import React from "react";
import {connect} from "react-redux";
import {StyleSheet, View, Text, Modal} from "react-native";
import config from "../config";
import {Circle as Progress} from 'react-native-progress';

class LoadingSynchronization extends React.Component {

    state = {
        progress: 0
    };

    componentDidMount() {
        //this.animate();
    }

    animate() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
            this.setState({ indeterminate: false });
            setInterval(() => {
                progress += Math.random() / 5;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({ progress });
            }, 500);
        }, 1500);
    }

    render() {
        const {visible, togglePopup, progress, done, total, canClose} = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                presentationStyle="overFullScreen"
                onRequestClose={() => {
                    if (canClose) {
                        togglePopup()
                    }
                }}
            >
                <View style={styles.loading}>
                    <Progress progress={progress} size={100} color={config.themeColor} showsText={true} />
                    <Text style={{color: config.themeColor}}>Synchronizing {done} / {total}</Text>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: config.loadingOverlayColor,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

function mapStateToProps (state) {

    const {progress, done, total} = state.synchronizeNote;

    return {
        progress,
        done,
        total
    }
}

export default connect(
    mapStateToProps,
    null
)(LoadingSynchronization)