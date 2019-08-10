import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet,View,Text } from 'react-native';

export default class BottomAppBar extends React.Component {
  render() {
    return (
      <Appbar style={styles.bottom}>
          <View style={styles.iconLable} >
        <Appbar.Action  icon="home" onPress={() => console.log('Pressed archive')} />
            <Text style={{position:'absolute'}}>Home</Text>
          </View>

          <View style={styles.iconLable} >
          <Appbar.Action icon="person" onPress={() => this.props.Login.navigate('Stories')} />
       
            <Text style={{position:'absolute'}}>Stories</Text>
          </View>

          <View style={styles.iconLable} >
          <Appbar.Action icon="exit-to-app" onPress={() => this.props.Login.navigate('Login')} />
            <Text style={{position:'absolute'}}></Text>
          </View>
          
      </Appbar>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    display:'flex',
    justifyContent:'space-around',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'lightgray',
  },
  iconLable:{display:'flex',flexDirection:'column-reverse', alignItems:'flex-end'},
});