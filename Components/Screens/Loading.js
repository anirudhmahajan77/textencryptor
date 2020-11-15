import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Loading extends React.Component{
    constructor(){
        super();
        this.styles = StyleSheet.create({
            message:{
                marginTop: '50%',
                width:'84%',
                marginLeft: '13%',
            },
            text:{
                fontSize:22,
                opacity: 0.6,
            }
        })
    }
    render(){
        return (
            <View style={this.styles.message}>
                <Text style={this.styles.text}>Loading Data, Please Wait...</Text>
            </View>
        )
    }
}

export default Loading;