import * as Routes from '../components/index';
import * as React from 'react';
import { View, } from 'react-native';
import FriendPic from '../components/Firends'
import TopAppbar from '../components/Appbar'
import { createAppContainer, createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import { IconButton } from 'react-native-paper';

const AppStackNavigator = createStackNavigator({
  Login:{
    screen : Routes.Login,
    navigationOptions: () => ({
      title: `Lgoin Form`,
      headerStyle: { backgroundColor: '#000099', Color: '#FFF', },
      headerTintColor: '#FFF',
    }),   
  },

  FirstScreen: {
    screen: Routes.FirstScreen,
    navigationOptions: () => ({
      title: `Sign Up Form`,
      headerStyle: { backgroundColor: '#000099', Color: '#FFF', },
      headerTintColor: '#FFF',
    }),   
  },

})



const switchAppNav = createSwitchNavigator({

  // user:{
  //   screen : AppStackNavigator,

  // },
 
      Home : {     
        screen : createStackNavigator({
          screen : Routes.Home,
                            
          Cam:{
            screen: Routes.Cam,
          },
        
             
  Chat: {
    screen: Routes.Chat,
    navigationOptions: () => ({
      headerTitle: (
        <View>
          <FriendPic
            height={50}
            width={50}
            ImageUri={require('../assets/images/pic1.jpg')}
            name={'Sana'}
            status={'Online'}
          />
          <View style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-start' }}>
            <IconButton icon="info"
              size={30}
            />
            <IconButton icon="phone"
              size={30}
            />
            <IconButton icon="videocam"
              size={30}
            />
          </View>
  
        </View>
      ),
      headerStyle: { backgroundColor: '#fff', Color: '#FFF', },
      headerTintColor: '#000',
    }),
  
  },
  
        }),

     

      },

      Status: {
        screen : Routes.Status
      },

      

 
})

export default createAppContainer(switchAppNav);


// static navigationOptions = {
//   // headerTitle instead of title
//   headerTitle: <LogoTitle />,
// }




// Chat: {
//   screen: Routes.Chat,
//   navigationOptions: () => ({
//     headerTitle: (
//       <View>
//         <FriendPic
//           height={50}
//           width={50}
//           ImageUri={require('../assets/images/pic1.jpg')}
//           name={'Nadir'}
//           status={'Online'}
//         />
//         <View style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-start' }}>
//           <IconButton icon="info"
//             size={30}
//           />
//           <IconButton icon="phone"
//             size={30}
//           />
//           <IconButton icon="videocam"
//             size={30}
//           />
//         </View>

//       </View>
//     ),
//     headerStyle: { backgroundColor: '#fff', Color: '#FFF', },
//     headerTintColor: '#FFF',
//   }),

// }