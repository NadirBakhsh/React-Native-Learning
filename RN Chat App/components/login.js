import React from "react"
import { login, logIn } from "../config/firebase"
import { View, TextInput,StyleSheet, Button, Text, TouchableOpacity } from "react-native"

class Login extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    async login() {
        const { email, password } = this.state;
        try {
            await login(email, password)
            this.props.navigation.navigate("Home");
        } catch (e) {
            alert(e)
        }
    }


    render() {
        return (
            <View style={styles.container}>
            <View style={{width:"90%" , height: 250, borderWidth: 2 , padding: 20,  marginBottom: 10  }}>
                <Text>Email:</Text><TextInput type="email" onChangeText={(e) => this.setState({ email: e })} />
                <Text>Password:</Text><TextInput type="password" onChangeText={(e) => this.setState({ password: e })} />
                <Button title="Login" onPress={() => this.login()} />
              

<View style={{marginTop : 20}} >
                <Button onPress={() => {this.props.navigation.navigate("FirstScreen")
                }}  title={'ClicK here For Create Account'} />
                </View> 

            </View>

            </View>
        )
    }
}

export default Login

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: '#fff',
    },
  
  
  });
  