import * as React from 'react';
import { Appbar , Searchbar, Colors ,} from 'react-native-paper';
import { StyleSheet, Text,theme } from 'react-native';
export default class MyComponent extends React.Component {

    state = {
        firstQuery: '',
      };
    

  render() {

    const { firstQuery } = this.state;

    return (
      <Appbar style={styles.top}>
     
     <Appbar.Action icon="mode-edit" onPress={() => console.log('Pressed archive')} />
     <Appbar.Action icon="photo-camera" onPress={() => console.log('Pressed archive')} />
       
        <Searchbar
        style={{backgroundColor:'#000099'}}
        placeholder="Search"
        onChangeText={query => { this.setState({ firstQuery: query }); }}
        value={firstQuery} 
        placeholderTextColor={'white'}
        iconColor={'white'}
        theme={{ colors: { text: 'white' } }}
        />
        
      </Appbar>
    );
  }
}



const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 24,
    backgroundColor: '#000099',
  },
  
});

