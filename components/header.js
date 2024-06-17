import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert, Image, TouchableHighlight, Platform} from 'react-native';

export default function Head() {
return (
    <View style = {styles.headView}>
        <Text style = {styles.text}>Список дел</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    headView:{
        paddingTop: "11%",
        height: 100,
        backgroundColor: "silver"
    },
    text:{
        color:"#ba7575",
        fontSize: 30,
        textAlign: "center"
    }
})