//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {storyCard} from './FriendStory'
// create a component
class MyClass extends Component {
    render() {
        return (
            <View style={styles.container}>
                    <Text></Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default MyClass;
