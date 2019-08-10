
//import liraries
import React, { Component } from 'react';
import { View, Button ,TextInput,
  TouchableOpacity, Text, StyleSheet,KeyboardAvoidingView } from 'react-native';

import { register } from "../config/firebase"

// create a component
class FirstScreen extends Component {

constructor(props) {
  super(props);

  this.state = {
    email : '',
    username : '',
    password:''
  }

}


async register() {
  const { email, password, username } = this.state;
  console.log(email, password, username)
  try {
      const reg = await register(email, password, username)
      console.log(reg)
      this.props.navigation.navigate("Login");
  }
  catch (e) {
      alert(e.message)
  }
}



  render() {
   
    return (
      <View style={styles.container}>
        
        <View style={{width:"90%" , height: 300, borderWidth: 2 , padding: 20,  marginBottom: 20  }}>
                <Text>Email:</Text><TextInput onChangeText={text => this.setState({ email: text })} />
                <Text>Username:</Text><TextInput  onChangeText={(e) => this.setState({ username: e })} />
                <Text>Password:</Text><TextInput  onChangeText={(e) => this.setState({ password: e })} />
                <Button title="Register" onPress={() => {this.register()}} />
            
              
              <View style={{marginTop : 20}} >
                <Button onPress={() => {this.props.navigation.navigate("Login")
                }}  title={' If you have Account ClicK here For Login'} />
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
    alignSelf: 'center',
    backgroundColor: '#fff',
  },


});


export default FirstScreen;
