import React from 'react';
import { AsyncStorage } from "react-native";
import GettingStarted from  './Components/Navigation/GettingStarted';
import Dashboard from './Components/Screens/Dashboard';

class Application extends React.Component {
    constructor(){
        super();
        this.state= {
            isLogged: false,
            defaultUser:[
            {
                key:1,
                firstName: 'Anirudh',
                lastName: 'Mahajan',
                phoneNumber: '7006204432',
                email: 'admin@enc.com',
                password: 'admin',
                role: 'admin',
                status: 'active',
            },
            {
                key:2,
                firstName: 'Anirudh',
                lastName: 'Mahajan',
                phoneNumber: '7006204432',
                email: 'user@enc.com',
                password: 'user',
                role: 'user',
                status: 'active',
            }]
        }
    }

    logout = () => {
        this.setState({isLogged: false});
    }    

    async componentDidMount(){
        try{
            let JSONloggedUsers = await AsyncStorage.getItem("loggedUser");
            if(JSONloggedUsers == null ){
                await AsyncStorage.setItem("loggedUser", JSON.stringify(this.state.defaultUser))
            }
        }
        catch(err){
            alert(err);
        }
    }
  

    render(){
        return (
            this.state.isLogged? <Dashboard /> : <GettingStarted />
        )
    }
}

export default Application;