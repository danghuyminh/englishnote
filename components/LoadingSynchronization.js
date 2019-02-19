import React from "react";
import {connect} from "react-redux";
import {StyleSheet, View, Text, Modal} from "react-native";
import config from "../config";
import {Circle as Progress} from 'react-native-progress';
import {GlobalStyles} from "../helpers/Styles";

class LoadingSynchronization extends React.Component {

    state = {
        progress: 0,
        show: true
    };

    componentDidMount() {
        //this.animate();
    }

    hidePopup = () => {
        this.setState({
            show: false
        })
    };

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
        const {isSynchronizing, progress, done, total, canClose, syncType, type, userName, color, backgroundColor} = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={(isSynchronizing && syncType === type && this.state.show)}
                presentationStyle="overFullScreen"
                onRequestClose={() => {
                    if (canClose) {
                        this.hidePopup()
                    }
                }}
            >
                <View style={[styles.loading, {backgroundColor: backgroundColor ? backgroundColor : config.loadingOverlayColor}]}>
                    <Progress progress={progress} size={100} color={color ? color : config.themeColor} showsText={true} />
                    <Text style={{color: color ? color : config.themeColor}}>
                        {`${syncType === 'local' ? 'Synchronizing' : 'Synchronizing from ' + userName} ${done} / ${total}`}
                    </Text>
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
        justifyContent: 'center',
        alignItems: 'center'
    }
});

function mapStateToProps (state) {

    const {progress, done, total, syncType, isSynchronizing} = state.synchronizeNote;

    return {
        progress,
        done,
        total,
        syncType,
        isSynchronizing
    }
}

export default connect(
    mapStateToProps,
    null
)(LoadingSynchronization)