import * as React from 'react';
import { View , TouchableOpacity,StyleSheet } from 'react-native';
import { List,Text, Button, } from 'react-native-paper';
import { ScrollView, } from 'react-native-gesture-handler';
import Friends from './Firends'

import { getAllUsers, createRoom  } from "../config/firebase";



class FriendList extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    arr: [{ key: 'Ali' }, { key: 'Ahmed' }, { key: 'Khan' }, { key: 'Usliman' }],
    con: false,
    users:[],
}
}



componentDidMount(){
  this.AllUsers()
}

async AllUsers() {
  try{
    const users = await getAllUsers()
    console.log(users)
    this.setState({
        users,
        con: true
    })
  }catch (e) {

  }

}



async startChat(e) {
  try {
      let chatRoom = await createRoom(e)
     // console.log('>>>>>>>>>>><<<<<<<<kkk',chatRoom._id)
      this.props.chatnav.navigate("Chat", chatRoom._id)
  } catch (e) {
      alert(e)
  }
}





render() {
  
  const {users} = this.state;
  
  return (
            <ScrollView>

          <View style={styles.chatListCss}>              
          <Text style={{fontSize:18}}>Frinds List For Chat</Text>
          </View>
          
         
          {users.map((items) => {
            return(
          <TouchableOpacity onPress={()=> this.startChat(items._id)} >            
            <Friends
            key={items._id} 
             height={50}
             width={50}  
             ImageUri={require('../assets/images/pic1.jpg')}
             name={items.data.username}
             status={'Online'}
                      />
        
          </TouchableOpacity>)
           })}
            

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    chatListCss:{height:30,width:'100%',
    display:'flex',
    alignItems:'center',
    top:5,
    bottom:10,
    left:10,
    }

});

export default FriendList;