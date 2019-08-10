import React from 'react';
import { StyleSheet, Text, View ,KeyboardAvoidingView} from 'react-native';
import MainNavigation from './config/Navigations'



export default function App() {
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
      <MainNavigation />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
