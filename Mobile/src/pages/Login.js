import React, { useState } from 'react'
import {View, Text, Image, StatusBar, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, navigation} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import bcrypt from 'bcrypt';

import api from '../service/api';
import logo from '../../assets/logo.png';


export default function Login({ navigation }) {

  const [ra, setRa] = useState("2019073842");
  const [pwd, setPwd] = useState("123");
  
  async function formSubmit(){
    //RA e a senha para mandar pro backend
    const response = await api.post('/user/validation', {ra,pwd})

    if(response.status == 200){

      await AsyncStorage.setItem('@user', JSON.stringify(response.data));
      navigation.navigate('Index')

    }else{
      let msgError = response.data;
      console.log(msgError.mensagem);
    }
  }

    return (
      <SafeAreaView style= {style.container}>
        <Image source= {logo}></Image>

      <View style ={style.form}>
        <Text style= {style.label}>Acesso Restrito</Text>
      <TextInput
      style ={style.input}
        placeholder ="Informe seu RA"
        placeholderTextColor = "#888"
        keyboardType = "numeric"
        maxLength = {10}
        value = {ra}
        onChangeText = {setRa}
      />

        <TextInput
        style ={style.input}
        placeholder ="Informe sua senha"
        placeholderTextColor = "#888"
        secureTextEntry = {true}
        maxLength = {20}
        value = {pwd}
        onChangeText = {setPwd} // guarda informação dentro do pwd

        />
        <TouchableOpacity onPress={formSubmit} style ={style.button}>
          <Text style ={style.TextButton}>Logar</Text>
        </TouchableOpacity>
      </View> 

      </SafeAreaView>
    );
  }

  const style = StyleSheet.create({
    container :{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    form: {
      alignSelf : 'stretch',
      paddingLeft: 105,
      marginRight: 90,
      marginTop: 10
    },
    input: {

      borderWidth: 1,
      borderColor: "#000",
      paddingHorizontal: 20,
      borderRadius: 6,
      height: 40,
      fontSize: 15,
      marginBottom: 30

    },
    label :{
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 15,
      color: "#555"
    },
    button: {
      backgroundColor: "#05509b",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 10
      
    },
    TextButton: {
      color: '#fff',
      fontSize: 20,
      textAlign: "center"
    }

  });