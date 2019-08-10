import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class Status extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 5
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate("Home")
        }, 4000);
        setInterval(() => {
            this.setState({
                count: this.state.count - 1
            })
        }, 1000);
    }

    render() {
        console.log(this.props.navigation.state.params)
        return (
            <View style={styles.container}>
                <Image style={{ width: "100%", height: 600, borderWidth: 1, borderColor: "black", borderRadius: 5 }} source={{ uri: this.props.navigation.state.params.story }} />
            </View>
        );
    }
}

export default Status

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});