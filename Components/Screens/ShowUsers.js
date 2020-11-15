import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

class ShowUsers extends React.Component{
    constructor(){
        super();
        this.styles = StyleSheet.create({
            holder:{
                marginTop: '12%',
            },
            balance:{
                marginBottom: '24%',
            },
            card:{
                width: '90%',
                elevation: 5,
                marginBottom: '4%',
                marginLeft: '5%',
            }
        })
    }
    
    render(){
        return(
            <ScrollView style={this.styles.holder}>
                {
                    this.props.users.map((user)=>{
                        return(
                                <Card style={this.styles.card} key={user.email+'1'}>
                                <Card.Content>
                                    <Title>{user.firstName} {user.lastName}</Title>
                                    <Paragraph>Email: {user.email}</Paragraph>
                                    <Paragraph>Phone Number: {user.phoneNumber}</Paragraph>
                                    <Paragraph>Role: {user.role}</Paragraph>
                                    <Paragraph>Status: {user.status}</Paragraph>
                                </Card.Content>
                            </Card>
                        )
                    })
                }
                <View style={this.styles.balance}></View>
            </ScrollView>
        )
    }
}

export default ShowUsers;