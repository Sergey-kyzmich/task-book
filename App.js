import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
// import * as storage from "./components/storage";

export default function App() {

  
  // storage.add("текст")
  // storage.init()
  // res = storage.tasks
  // console.log(res)
  return (
    <View style={styles.container}>
      <TextInput  placeholder='name'/>
      <Button title="Add Name"  />

      <Button title="Export Db"  />
      <Button title="Import Db"  />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    margin: 8
  }
});
