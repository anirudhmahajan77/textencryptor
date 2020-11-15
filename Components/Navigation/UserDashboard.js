import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Encryptor from '../Screens/Encryptor';
import Decryptor from '../Screens/Decryptor';
import PasswordGen from '../Screens/PasswordGen';
import AboutDev from '../Screens/AboutDev';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



class UserDashboard extends React.Component {
    constructor(){
        super();
        this.styles = StyleSheet.create({
            tab:{
                backgroundColor: '#000',
                color: '#5238a4',
            }
        })
    }

    render(){
        const Tab = createBottomTabNavigator();
        return (
            <NavigationContainer independent={true}>
              <Tab.Navigator tabBarOptions={
                  {
                    adaptive:true,
                    tabStyle:{
                        paddingTop: 15,
                    }
                  }
              }>
                <Tab.Screen name="Encryptor" 
                            component={Encryptor}
                            options={{
                                tabBarLabel: '',
                                tabBarColor: '#ccc',
                                tabBarIcon: ({focused }) => (
                                  <Feather name="lock" color={focused? '#5238a4': '#bbb'} size={30} />
                                ),
                                
                              }} 
                />
                <Tab.Screen name="Decryptor" 
                            component={Decryptor}
                            
                            options={{
                                tabBarLabel: '',
                                tabBarColor: '#333',
                                tabBarIcon: ({focused}) => (
                                  <Feather name="unlock" color={focused? '#5238a4': '#bbb'} size={30} />
                                ),
                              }} 
                              
                />
                <Tab.Screen name="PasswordGen" 
                            component={PasswordGen}
                            options={{
                                tabBarLabel: '',
                                tabBarColor: '#5238a4',
                                tabBarIcon: ({ focused }) => (
                                  <MaterialCommunityIcons name="textbox-password" color={focused? '#5238a4': '#bbb'} size={30} />
                                ),
                              }}
                />
                <Tab.Screen name="About" 
                            component={AboutDev}
                            options={{
                                tabBarLabel: '',
                                tabBarColor: '#333',
                                tabBarIcon: ({focused}) => (
                                  <Feather name="info" color={focused? '#5238a4': '#bbb'} size={30} />
                                ),
                              }}
                            
                              
                />
              </Tab.Navigator>
            </NavigationContainer>
          );
    }
  
}

export default UserDashboard;