import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert, Image, TouchableHighlight,TouchableOpacity, Platform, FlatList} from 'react-native';


export default function Listitem({el, deleteHandler}) {
return (
    <TouchableOpacity onPress={() => deleteHandler(el.key)}>
      <Text style={styles.text}>{el.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    text:{
      placeholder:"Задача",
      padding: "1%",
      textAlign:"center",
      fontSize:24,
      backgroundColor:"silver",
      borderColor:"black",
      borderWidth: 2,
      borderRadius:5,
      marginTop:"2%",
      marginLeft:"20%",
      width:"60%"
    }
})