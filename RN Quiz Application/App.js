import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Cam from './Components/Camra';
import Quiz from './Components/Quiz'

export default class App extends React.Component {
  state = {
    cameraView: false, 
    camraBtn: true, ///true karna hoga
    QuizStart: false, //false karna hoga 
  }

  showCamera() {
    this.setState({ cameraView: true, camraBtn: false });
  }


  hideCamera() {
    this.setState({ cameraView: false , QuizStart: true});
  } 

 render() {
    const { cameraView, camraBtn,QuizStart } = this.state;

    return (
      <View style={styles.container}>

        {cameraView && <View style={{ height: 400,width:'90%' }}>
          <Cam hideCamera={() => this.hideCamera()}/>  
        </View>}

     {camraBtn && 
      <View>
     <Button onPress={() => this.showCamera()}
          title="Camra"
          color="#841584"
        />
        </View>
        }
         
        {QuizStart && <Quiz />}

      </View>
      
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
