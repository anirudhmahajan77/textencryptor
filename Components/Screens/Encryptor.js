import React from 'react';
import {View, Text, StyleSheet, AsyncStorage, ScrollView, SafeAreaView, ImageBackground,Picker, Clipboard} from 'react-native';
import {TextInput, Snackbar, Button, Subheading, HelperText} from 'react-native-paper';
import {StatusBar} from  'expo-status-bar';
//import {Picker} from '@react-native-community/picker';
import CryptoJS  from 'crypto-js';

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
                height: 740,
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
            helpKey:{
                width: '84%',
                marginLeft: '6%',
                marginTop: '-6%',
                marginBottom: '1%',
            },
            helpAlgo:{
                width: '84%',
                marginLeft: '6%',
                marginBottom: '-5%',
            },
            messageInput:{
                width: '84%',
                marginTop: '2%',
                marginLeft: '8%',
                marginBottom: 25,
                borderColor: "#ccc",
            },
            datepicker:{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: '#000',
            },
            dateElement:{
                width: '84%',
                marginLeft: '8%',
                marginTop: 25,
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
            pickerStyle:{
                backgroundColor: '#e7e7e7',
                height: 60,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                borderBottomColor: '#acacac',
                borderStyle: 'solid',
                borderBottomWidth: 1,
                color: '#767676',
                width:'84%',
                marginTop: 25,
                marginLeft: '8%',               
            },
        });

        this.state= {
            message: '',
            key: '',
            algo: 0,
            encryptedMessage:'Your Encrypted Message',
            snackVisible: false,
            messageHelper: false,
            securityHelper: false,
            algoHelper: false,
        }
    }

    onOpenSnackBar = () => {
        Clipboard.setString(this.state.encryptedMessage);
        this.setState({snackVisible: true})
    }

    onDismissSnackBar = () => {
        this.setState({snackVisible:false})
    }

    encryptCodes=(content,passcode)=>{
        var result = []; var passLen = passcode.length ;
        for(var i = 0  ; i < content.length ; i++) {
            var passOffset = i%passLen ;
            var calAscii = (content.charCodeAt(i)+passcode.charCodeAt(passOffset));
            result.push(calAscii);
        }
        return JSON.stringify(result) ;
    }

    password_generator = ()=>{
        len = this.state.leng;
        var length = (len)?(len):(10);
        var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
        var numeric = '0123456789';
        var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
        var password = "";
        var character = "";
        while( password.length<length ) {
            entity1 = Math.ceil(string.length * Math.random()*Math.random());
            entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
            entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
            hold = string.charAt( entity1 );
            hold = (password.length%2==0)?(hold.toUpperCase()):(hold);
            character += hold;
            character += numeric.charAt( entity2 );
            character += punctuation.charAt( entity3 );
            password = character;
        }
        password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
        let pass = password.substr(0,len);
        this.state({password:pass});
    }

    onEncrypt= async()=>{
        try{
            if(this.state.message==''){
                throw 1;
            }
            if(this.state.key==''){
                throw 2;
            }
            if(this.state.algo==0){
                throw 3;
            }
            if(this.state.algo==1){
                // EDC
                const enc = this.encryptCodes(this.state.message,this.state.key)
                this.setState({encryptedMessage:enc});
            }
            if(this.state.algo==2){
                // tripledes
                var encc = CryptoJS.TripleDES.encrypt(this.state.message, this.state.key).toString();
                this.setState({encryptedMessage:encc});
            }
            if(this.state.algo==3){
                // AEs
                var encc = await CryptoJS.AES.encrypt(this.state.message, this.state.key).toString();
                this.setState({encryptedMessage:encc});
            }
            if(this.state.algo==4){
                // RC4
                var encc = CryptoJS.RC4.encrypt(this.state.message, this.state.key).toString();
                this.setState({encryptedMessage:encc});
            }
            if(this.state.algo==5){
                // Rabbit
                var encc = CryptoJS.Rabbit.encrypt(this.state.message, this.state.key).toString();
                this.setState({encryptedMessage:encc});
            }
        }
        catch(err){
            if( parseInt(err) == 1){
                this.setState({messageHelper: true})
            }
            if(err == 2){
                this.setState({securityHelper: true})
            }
            if(err == 3){
                this.setState({algoHelper: true})
            }
        }
        
    }

    render(){
        return(
               <ScrollView keyboardShouldPersistTaps='always' style={this.styles.screen}><ImageBackground source={require('../Asset/log.png')} style={this.styles.background}>
                    <View style={this.styles.headingHolder}>
                        <Text style={this.styles.heading}>Text Encryptor</Text>
                    </View>
                    
                    <SafeAreaView style={this.styles.form}>
                    <HelperText style={this.styles.messageHelp} type="error" visible={this.state.messageHelper}>
                        Error: Message Cannot Be Empty!
                    </HelperText>
                    <TextInput 
                            label="Your Message"
                            mode='flat'
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(newMessage)=> {this.setState({message:newMessage})}}
                            style={this.styles.messageInput}
                        />
                        <HelperText style={this.styles.helpKey} type="error" visible={this.state.securityHelper}>
                            Error: Security Key Cannot Be Empty!
                        </HelperText>
                        <TextInput 
                            label="Security Key"
                            mode='flat'
                            secureTextEntry={true}
                            onChangeText={(newKey)=> {this.setState({key:newKey})}}
                            style={this.styles.keyInput}
                        />
                        <HelperText style={this.styles.helpAlgo} type="error" visible={this.state.algoHelper}>
                            Error: Please Choose an Encryption Algorithm!
                        </HelperText>
                            <Picker style={this.styles.pickerStyle}  
                                selectedValue={this.state.algo}  
                                onValueChange={(itemValue, itemPosition) =>  
                                    this.setState({algo: itemValue})}  
                            >  
                                <Picker.Item label="Select Algorithm" value="0" /> 
                                <Picker.Item label="EDC" value="1" />  
                                <Picker.Item label="TripleDES" value="2" /> 
                                <Picker.Item label="AES" value="3" /> 
                                <Picker.Item label="RC4" value="4" /> 
                                <Picker.Item label="Rabbit" value="5" /> 
                            </Picker> 
                            <Text onPress={this.onEncrypt} style={this.styles.sendbtn}>Encrypt</Text>
                            {this.state.encryptedMessage=='Your Encrypted Message'?
                                        null:
                                        <View onPress={this.onOpenSnackBar}>
                                            <Subheading style={this.styles.copyTxt}>Your Encrypted Text is:</Subheading>
                                            <Button icon="note" uppercase={false} style={this.styles.copyBtn} color={'#5238a4'} mode="outlined" onPress={() => this.onOpenSnackBar()}>
                                                {this.state.encryptedMessage}
                                            </Button>
                                            <Snackbar
                                                visible={this.state.snackVisible}
                                                style={{
                                                    backgroundColor:'#5238a4',
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
                                                Text Copied To Clipboard!
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