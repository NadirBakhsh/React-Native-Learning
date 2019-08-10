//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

// create a component
class FriendStory extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 100, width: 100 }}>

                    <View style={{ flex: 2 }}>
                        <Image source={this.props.ImageUri}
                            style={{
                                resizeMode: 'cover', height: this.props.height, width: this.props.width,
                                borderTopLeftRadius: 50,
                                borderTopRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                borderBottomRightRadius: 50,
                            }}
                        />
                    </View>

                    <View style={{ flex: 1, paddingLeft: 10, marginBottom: -8 }}>
                        <Text style={{left:4}}>{this.props.name}</Text>
                    </View>

                </View>
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
export default FriendStory;
