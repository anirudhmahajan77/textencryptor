import React, {Component} from "react";
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, AsyncStorage} from "react-native";
import { Feather } from '@expo/vector-icons';
import {TextInput, HelperText} from 'react-native-paper';

class Signup extends Component {
    constructor(){
        super();
        this.styles = StyleSheet.create({
            background:{
                width:'100%',
                height:'100%',
            },
            nav:{
                top: 44,
                left: 25,
            },
            container: {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            },
            heading: {
                color: '#fff',
                fontSize: 38,
            },
            title: {
                color: '#fff',
                opacity: 0.8,
                paddingBottom: 20,
            },
            formContainer: {
                width: '85%',
                height: 500,
                backgroundColor: '#f9f9f9',
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
            },
            input: {
                width: '85%',
                marginBottom: 15,
                borderColor: "#ccc",
            },
            signupBtn: {
                width: 352,
                fontWeight: "bold",
                borderRadius: 4,
                textAlign:"center",
                textAlignVertical: 'center',
                color: '#fff',
                marginTop: 50,
                height: 50,
                backgroundColor: 'slateblue',
            },
            oldUser: {
                opacity: 0.8,
            },
            oldUserLink: {
                color: 'dodgerblue',
                textDecorationStyle: 'solid',
                textDecorationLine: 'underline',
                textDecorationColor: 'dodgerblue',
            },
            firstNamehelper:{
                marginLeft: -80,
                marginTop: '-5%',
                marginBottom: -8,
            },
            lastNameHelper:{
                marginLeft: -80,
                marginBottom: -8,
                marginTop: -12,
            },
            emailHelper:{
                marginLeft: -70,
                marginBottom: -8,
                marginTop: -12,
            },
            emailExistHelper:{
                marginLeft: -95,
                marginBottom: -8,
                marginTop: -16,
            },
            phoneNumberHelper:{
                marginLeft: -55,
                marginBottom: -8,
                marginTop: -12,
            },
            passwordHelper:{
                marginLeft: -80,
                marginBottom: -8,
                marginTop: -12,
            },
        });
        this.state= {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            role: 'user',
            status: 'active',
            firstNameHelper: false,
            lastNameHelper: false,
            emailHelper: false,
            emailExistHelper: false,
            phoneNumberHelper: false,
            passwordHelper: false,
        }
    }

    signUpSubmit = async(navigation) => {
        try{
            if(this.state.firstName == ''){
                throw 1;
            }
            if(this.state.lastName == ''){
                throw 2;
            }
            if(this.state.email == ''){
                throw 3;
            }
            if(this.state.phoneNumber == ''){
                throw 4;
            }
            if(this.state.password == ''){
                throw 5;
            }
            let jsonUsers = await AsyncStorage.getItem("loggedUser")
            let users = JSON.parse(jsonUsers);
            for (let i=0 ; i < users.length ; i++){
                if ((users[i].email === this.state.email)) {
                    throw 6;
                }
            }
            let user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                password: this.state.password,
                role: 'user',
                status: 'active',
            }
            users.push(user);
            await AsyncStorage.setItem('loadedUser',JSON.stringify(user));
            await AsyncStorage.setItem('loggedUser', JSON.stringify(users));
            navigation.navigate('Dashboard');
        }
        catch(err) {
            if(parseInt(err) == 1){
                this.setState({firstNameHelper: true});
            }
            if(parseInt(err) == 2){
                this.setState({lastNameHelper: true,
                                firstNameHelper:false
                            });
            }
            if(parseInt(err) == 3){
                this.setState({emailHelper:true,
                                lastNameHelper: false,
                            });
            }
            if(parseInt(err) == 4){
                this.setState({phoneNumberHelper:true,
                                emailHelper:false,
                            });
            }
            if(parseInt(err) == 5){
                this.setState({passwordHelper:true,
                                phoneNumberHelper:false,
                            });
            }
            if(parseInt(err) == 6){
                this.setState({emailExistHelper:true,
                                passwordHelper:false,
                                phoneNumberHelper:false,
                                emailHelper:false,
                                lastNameHelper: false,
                                lastNameHelper:false
                            });
            }
        }
    }

    render(){
        return(
            <SafeAreaView> 
            <ImageBackground source={require('../Asset/log.png')} style={this.styles.background}>
                <Feather name="arrow-left" onPress={()=>{this.props.navigation.pop()}} size={30} color="white" style={this.styles.nav} />
                <View style={this.styles.container}>
                    <Text style={this.styles.heading}>Welcome</Text>
                    <Text style={this.styles.title}>Create Your New Account</Text>
                    <View style={this.styles.formContainer}>
                        <HelperText style={this.styles.firstNamehelper} type="error" visible={this.state.firstNameHelper}>
                            Error: First Name Cannot Be Empty!
                        </HelperText>
                        <TextInput 
                            label="First Name"
                            mode='outlined'
                            onChangeText={(newFirst)=> {this.setState({firstName:newFirst})}}
                            style={this.styles.input}
                        />
                        <HelperText style={this.styles.lastNameHelper} type="error" visible={this.state.lastNameHelper}>
                            Error: Last Name Cannot Be Empty!
                        </HelperText>
                        <TextInput 
                            label="Last Name"
                            mode='outlined'
                            onChangeText={(newLast)=> {this.setState({lastName:newLast})}}
                            style={this.styles.input}
                        />
                        <HelperText style={this.styles.emailHelper} type="error" visible={this.state.emailHelper}>
                            Error: Email Name Cannot Be Empty!
                        </HelperText>
                        <HelperText style={this.styles.emailExistHelper} type="error" visible={this.state.emailExistHelper}>
                            Error: Email Already Registered!
                        </HelperText>
                        <TextInput 
                            label="Email"
                            mode='outlined'
                            keyboardType="email-address"
                            onChangeText={(newMail)=> {this.setState({email:newMail.toLowerCase()})}}
                            style={this.styles.input}
                        />
                        <HelperText style={this.styles.phoneNumberHelper} type="error" visible={this.state.phoneNumberHelper}>
                            Error: Phone Number Cannot Be Empty!
                        </HelperText>
                        <TextInput 
                            label="Phone Number"
                            mode='outlined'
                            maxLength={13}
                            keyboardType="phone-pad"
                            onChangeText={(newNumber)=> {this.setState({phoneNumber:newNumber})}}
                            style={this.styles.input}
                        />
                        <HelperText style={this.styles.passwordHelper} type="error" visible={this.state.passwordHelper}>
                            Error: Password Cannot Be Empty!
                        </HelperText>
                        <TextInput 
                            label="Password"
                            mode='outlined'
                            secureTextEntry={true}
                            onChangeText={(newPass)=> {this.setState({password:newPass})}}
                            style={this.styles.input}
                        />
                        <Text style={this.styles.oldUser}>Already Have an account? <Text onPress={() =>{this.props.navigation.navigate('Login')}} style={this.styles.oldUserLink}>Sign In!</Text></Text>
                    </View>
                    <Text style={this.styles.signupBtn} onPress={()=>{this.signUpSubmit(this.props.navigation)}}>Sign Up</Text>
                </View>
            </ImageBackground></SafeAreaView>
        );
    }
}

export default Signup;