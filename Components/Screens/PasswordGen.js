import React from 'react';
import {View, Text, StyleSheet, AsyncStorage, ScrollView, SafeAreaView, ImageBackground, Picker, Clipboard} from 'react-native';
import {TextInput, Snackbar, Button, Subheading, HelperText} from 'react-native-paper';
import {StatusBar} from  'expo-status-bar';

class Encryptor extends React.Component {
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

        this.state= {
            len: 0,
            password:'Your Password Is',
            snackVisible: false,
            passwordHelper: false,
        }
    }

    onOpenSnackBar = () => {
        Clipboard.setString(this.state.password);
        this.setState({snackVisible: true})
    }

    onDismissSnackBar = () => {
        this.setState({snackVisible:false})
    }

    generatePassword=()=>{
        var length = this.state.len,
            charset = "AbCdEfGhIjKlMnOpQrStUvWxYz"
                            +"aBcDeFgHiJkLmNoPqRsTuVwXyZ"
                            +"0123456789"
                            +"!@#$%^&*()_+~}{[]\:;?><,./-=",
            password = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    }

    onPass= async()=>{
        try{
            if(this.state.len==0){
                throw 1;
            }else{
                let pass = this.generatePassword();
                this.setState({password: pass});
            }
        }
        catch(err){
            if( parseInt(err) == 1){
                this.setState({passwordHelper: true})
            }
        }
        
    }

    render(){
        return(
               <ScrollView keyboardShouldPersistTaps='always' style={this.styles.screen}><ImageBackground source={require('../Asset/log.png')} style={this.styles.background}>
                    <View style={this.styles.headingHolder}>
                        <Text style={this.styles.heading}>Password Generator</Text>
                    </View>
                    
                    <SafeAreaView style={this.styles.form}>
                    <HelperText style={this.styles.messageHelp} type="error" visible={this.state.passwordHelper}>
                        Error: Password Length Cannot Be Zero
                    </HelperText>
                    <TextInput 
                            label="Password Length"
                            mode='flat'
                            keyboardType='decimal-pad'
                            onChangeText={(newLen)=> {this.setState({len:newLen})}}
                            style={this.styles.messageInput}
                        />
                            <Text onPress={this.onPass} style={this.styles.sendbtn}>Generate Password</Text>
                            {this.state.password=='Your Password Is'?
                                        null:
                                        <View onPress={this.onOpenSnackBar}>
                                            <Subheading style={this.styles.copyTxt}>Your Password is:</Subheading>
                                            <Button icon="note" uppercase={false} style={this.styles.copyBtn} color={'#5238a4'} mode="outlined" onPress={() => this.onOpenSnackBar()}>
                                                {this.state.password}
                                            </Button>
                                            <Snackbar
                                                visible={this.state.snackVisible}
                                                style={{
                                                    backgroundColor:'#5238a4',
                                                    bottom:-180,
                                                }}
                                                duration={4000}
                                                onDismiss={this.onDismissSnackBar}
                                                action={{
                                                    label: 'Ok',
                                                    onPress: () => {
                                                      this.onDismissSnackBar()
                                                    },
                                                  }}
                                            >
                                                Password Copied To Clipboard!
                                            </Snackbar>
                                        </View>
                            }
                    </SafeAreaView>
                    <StatusBar style='light'/>
                </ImageBackground>
                </ScrollView>
        );
    }
}

export default Encryptor;