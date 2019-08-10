//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// create a component
class Friends extends Component {


    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 100, width: "100%", display: 'flex', flexDirection: 'row',left:10,top:3}}>

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

                    <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                        <View style={{ marginLeft: 65, top: 7, bottom: 0 }}>
                            <Text style={{ fontSize: 18, fontWeight: '100' }} >{this.props.name}</Text>    
                            <Text style={{ fontSize: 10, color: 'blue' }} >{this.props.status}</Text>
                
                         

                            
                        </View>
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
        alignItems: 'flex-start',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default Friends;
