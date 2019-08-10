//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Appbar from './Appbar'
import { ScrollView, } from 'react-native-gesture-handler';
import FriendList from './FriendsList'
import * as ImagePicker from 'expo-image-picker';
import { getStory, addStory, getMyUid, getAllUsers, logout } from '../config/firebase'



import BottomAppBar from './BottomAppBar'
// create a component
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storyArr: [],
            con: false,
            storyCon: false,
            flag: 0,
        }
    }

    componentDidMount() {
        this.getusers()
        this.getAllStory()
        this.getUid()

    }

    async getUid() {
        const uid = await getMyUid()
        this.setState({
            uid: uid.uid,
            name: uid.username
        })
    }

    async getusers() {
        const users = await getAllUsers()
        this.setState({
            users,
            con: true
        })

        console.log(users, "uuuuuuuuuuuuuuuuuuuuuuuuuuuu")

    }

    async getAllStory() {
        const allStr = await getStory()
        this.setState({
            storyArr: allStr,
            storyCon: true
        })
    }


    async addMyStory() {
        try {
            await this.pickImage()
        } catch (e) {
            alert(e)
        }
    }


    async pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,

        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
            try {
                let resp = await addStory(result.uri, this.state.name)
                alert(resp.message)
                this.getAllStory()
            } catch (e) {
                alert(e.message)
            }
        }
    };

    changeFlag() {
        this.setState({ flag: this.state.flag + 1 });
    }

    showStatus(e) {
        console.log(e, "eeeeeeeeeeeeeeeeee")
        this.props.navigation.navigate("Status", e)

    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar />
                {console.log(this.state.storyArr, "all Stories render")}
                {/* scroll horizantal Start */}

                <View style={{ marginBottom: 10, marginTop: 80 }}>
                    <Text style={{ padding: 10, backgroundColor: 'lightgray' }}>Your's Friend Stories</Text>
                    <View style={{ margin: 10, borderBottomWidth: 1, }}>

                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >

                            {this.state.storyArr.length === 0 &&
                                <View style={{ flexDirection: 'row', width: 60, alignItems: "center" }}>
                                    <TouchableOpacity onPress={() => this.addMyStory()}>
                                        <View style={{ width: 55, height: 55 }}>
                                            <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={require('../assets/images/p1.png')} />
                                            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                                                Add story
                        </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            {this.state.storyArr.map((e) => {
                                if (e.uid === this.state.uid && this.state.flag === 0) {
                                    this.changeFlag()
                                }
                                if (e.uid.indexOf(this.state.uid) !== -1) {
                                    return <View style={{ flexDirection: 'row', width: 60, alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => this.showStatus(e)}>
                                            <View style={{ width: 55, height: 55 }}>
                                                <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={{ uri: e.story }} />
                                                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                                                    {e.username}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
                                {
                                    this.state.flag > 0 && <View style={{ flexDirection: 'row', width: 60, alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => this.addMyStory()}>
                                            <View style={{ width: 55, height: 55 }}>
                                                <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={require('../assets/images/p1.png')} />
                                                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                                                    Add story
                                    </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
                            })}
                            {this.state.storyArr && this.state.storyArr.map((e) => {
                                if (e.uid !== this.state.uid) {
                                    return <View style={{ flexDirection: 'row', width: 60, alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => this.showStatus(e)}>
                                            <View style={{ width: 55, height: 55 }}>
                                                <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={{ uri: e.story }} />
                                                <Text style={{ textAlign: "center" }}>
                                                    {e.username}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
                            })}



                        </ScrollView>

                    </View>
                </View>

                {/* scroll horizantal End */}


                <FriendList chatnav={this.props.navigation} />

                <BottomAppBar Logout={logout} Login={this.props.navigation} />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    textFontstyle: {
        fontSize: 16, fontWeight: '500', paddingHorizontal: 20
    },

});

//make this component available to the app
export default Home;
