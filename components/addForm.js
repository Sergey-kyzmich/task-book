import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View,TextInput, SafeAreaView, Button, Alert, Image, TouchableHighlight, Platform} from 'react-native';

export default function Form({addHandler}) {
    const [text, settext] = useState("")
    const changeText = (text)=>{settext(text)};
    return (
        <View style = {styles.mainView}>
            <TextInput style = {styles.input}  onChangeText={changeText} placeholder='Напиши задачу'/>
            <Button title = "Добавить эллемент" color="#ba7575" onPress={()=> addHandler(text)}/>
        </View>
    );
    }

const styles = StyleSheet.create({
    mainView:{
        paddingTop: "11%",
        height: 100
    },
    input:{
        borderWidth:1,
        padding: 10
    }
})