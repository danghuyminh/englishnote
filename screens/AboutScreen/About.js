import React from "react";
import {StyleSheet, View, Image, Text} from "react-native";
import HeaderDrawer from "../../components/HeaderDrawer";
import Config from "../../config";

export default class About extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <HeaderDrawer title='About' navigation={this.props.navigation}/>
                <View style={styles.header}/>
                <Image style={styles.avatar} source={require('../../assets/images/about.png')}/>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>Minh Dang</Text>
                        <Text style={styles.info}>Web / Mobile developer</Text>
                        <Text style={styles.description}>yanghuyming@gmail.com</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: Config.themeColor,
        height:200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:180
    },
    body:{
        marginTop:40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
    },
    info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10
    },
    description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
    },
});