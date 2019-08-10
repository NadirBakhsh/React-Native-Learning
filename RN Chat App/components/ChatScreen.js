import React from 'react'
import { View, Image, Text, } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { IconButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { sendMessageToDb, u_id } from '../config/firebase'
import * as firebase from 'firebase';
import 'firebase/firestore'

import { ImagePicker, Permissions, Constants } from 'expo';


const db = firebase.firestore();


export default class ChatScreen extends React.Component {

  constructor(props) {
    super(props);
    state = {
      image: null,
      messages: [],

    }

  }



  componentDidMount() {
    this.getMessages();
    this.getPermissionAsync();
  }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }



  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,

    });

    console.log(result);

    if (!result.cancelled) {

      this.setState({
        messages: [
          {
            _id: '48KmlE1R6SgcmEEtN0NAxEEMxiJ3',
            text: '',
            createdAt: new Date(),
            user: {
              _id: 'tLWJzrvvxQgxaKCGkFh174uGtgN2',
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
            image: result.uri
          },
        ],
      });

      this.onSend(this.state.messages)
    }
  };





  //this.props.navigation.


  componentWillMount() {
    // console.log(">>>>>>>>>>>>>>>>>>nav",this.props.navigation())
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  //     .orderBy("timestamp")
  // .orderBy("createdAt")

  getMessages() {
    var message = [];
    const roomId = this.props.navigation.state.params
    db.collection("chatrooms").doc(roomId).collection("messages")
      .onSnapshot(snapshot => {
        message = [];
        snapshot.forEach(elem => {
          message.push(elem.data().message[0])
          //console.log(elem.data().message[0],"<<<<<elem")
        })
        this.setState({ messages: message })
      })
  }

  async onSend(messages) {
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }));
    await sendMessageToDb(messages, this.props.navigation.state.params)
  }

  render() {
    return (
      <View style={{ flex: 2 }}>

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: u_id,
          }}
          alwaysShowSend={true}
        >

          <IconButton
            icon='send'
            size={30}
          />
        </GiftedChat>

        <View style={{
          borderTopWidth: 1, borderTopColor: 'lightgray', height: 45, padding: 5,
          flexDirection: 'row', justifyContent: 'space-evenly', display: 'flex', bottom: 5
        }}>
          <TouchableOpacity>
            <IconButton
              icon='insert-emoticon'
              size={30}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <IconButton
              icon='place'
              size={30}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this._pickImage()}>
            <IconButton
              icon='attach-file'
              size={30}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cam')}>
            <IconButton
              icon='camera-alt'
              size={30}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <IconButton
              icon='mic'
              size={30}
            />
          </TouchableOpacity>
        </View>

      </View>

    )
  }




}



