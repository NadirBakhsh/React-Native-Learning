import React from 'react';
import { Text, View, TouchableOpacity,Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  async capture() {
    const photo = await this.camera.takePictureAsync();
         const options = { mode: FaceDetector.Constants.Mode.fast };
          const getingFace = await FaceDetector.detectFacesAsync(photo.uri, options);
          this.setState({ photo : getingFace.faces.length  })
          console.log('photosssss *********', getingFace.faces);
          this.camerasOff()
 }


async camerasOff(){
  const { photo } = this.state;
  if(photo > 0 ){
    try{
      await this.props.hideCamera()
    }catch (e){

    }
  }else{
    alert('Face Not Decteced');
  }
 }

  render() {
    const { hasCameraPermission} = this.state;
       if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
           ref={ref => {
            this.camera = ref;
          }}
          style={{ flex: 1, }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
               style={{
                flex:1,
                alignContent:'flex-end',
                alignItems: 'flex-end',
                flexDirection:'column-reverse',
              }}
              onPress={() => {this.capture()}}
              >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Image </Text>
              </TouchableOpacity>
            </View>
          </Camera>

        </View>
      );
    }
  }
}