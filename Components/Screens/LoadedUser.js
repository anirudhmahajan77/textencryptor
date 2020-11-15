import React from 'react';
import {View, Text, StyleSheet, AsyncStorage, SafeAreaView, ImageBackground, Picker, Clipboard} from 'react-native';
import {StatusBar} from  'expo-status-bar';
import Loading from './Loading';
import ShowUsers from './ShowUsers';

class LoadedUser extends React.Component{
    constructor(){
        super();
        this.styles = StyleSheet.create({
            head:{
                flex:1,
                width: '100%',
                height:'100%',
            },
            heading:{
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 24,
                top: 80,
            },
            headingHolder:{
                height: 80,
                backgroundColor: 'transparent',
            },
            background:{
                width: '100%',
                height: '100%',
            },
            form:{
                width: '100%',
                elevation: 30,
                flex: 1,
                alignContent: 'center',
                height: 669,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                top: 100,
                backgroundColor: '#fff',
                backgroundColor: '#fff',
                borderRadius: 4,
            },
            messageHelp:{
                marginTop: '14%',
                width: '84%',
                marginLeft: '6%',
            },
            keyInput: {
                width: '84%',
                marginLeft: '8%',
                textAlignVertical: "top",
                marginBottom: 0,
                borderColor: "#ccc",
            },
            messageInput:{
                width: '84%',
                marginTop: '2%',
                marginLeft: '8%',
                marginBottom: 25,
                borderColor: "#ccc",
            },
            screen:{
                width: '100%',
            },
            sendbtn:{
                marginBottom: 22,
                width: '86%',
                marginTop: 25,
                marginLeft: '8%',
                fontWeight: 'bold',
                textAlign:"center",
                textAlignVertical: 'center',
                fontSize: 22,
                height: 55,
                borderRadius: 4,
                elevation: 4,
                backgroundColor: '#3879ff',
                color: '#fff',
            },
            copyBtn:{
                width: '84%',
                padding: 10,
                marginLeft: '8%',
            },
            copyTxt:{
                marginLeft: '8%',
            },
        });
        this.state={
            users:[],
        }
    }

    async componentDidMount(){
        let JSONusers = await AsyncStorage.getItem("loggedUser");
        let fetchedUsers = JSON.parse(JSONusers);
        this.setState({users: fetchedUsers})
    }

    render(){
        return(
               <SafeAreaView keyboardShouldPersistTaps='always' style={this.styles.screen}><ImageBackground source={require('../Asset/log.png')} style={this.styles.background}>
                    <View style={this.styles.headingHolder}>
                        <Text style={this.styles.heading}>Registered Users</Text>
                    </View>
                    
                    <View style={this.styles.form}>
                     {
                         this.state.users == []?<Loading />:<ShowUsers users={this.state.users} />
                     }
                    </View>
                    <StatusBar style='light'/>
                </ImageBackground>
                </SafeAreaView>
        );
    }
}

export default LoadedUser;