import React, {Component} from "react";
import {View, Text, StyleSheet, AsyncStorage} from "react-native";
import AdminDashboard from '../Navigation/AdminDashboard';
import UserDashboard from '../Navigation/UserDashboard';

class Dashboard extends Component {
    constructor(){
        super();

        this.state={
            role: 'user',
        }
    }

    async componentDidMount(){
        let JSONloggedUser = await AsyncStorage.getItem('loadedUser')
        let loggedUser = JSON.parse(JSONloggedUser);
        this.setState({role: loggedUser.role})
    }

    render(){
        return( 
            this.state.role=='user'?<UserDashboard/>:<AdminDashboard/>
        );
    }
}

export default Dashboard;