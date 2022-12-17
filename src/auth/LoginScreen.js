import {    View,
            ScrollView,
            TextInput,
            ToastAndroid,
            TouchableOpacity,
            StyleSheet, 
            Text } from 'react-native';
import React,{useState} from 'react';
import Snackbar from 'react-native-snackbar';

/* Importing the logo used on the login screen */
import Logo from '../assets/images/login_icon.svg';

/* Yup resolver for form validation */
import * as yup from 'yup';

/* Importing the colors that'll be used. */
import {colorGlobal} from '../globals/utils';

const LoginScreen = ({navigation}) => {

    /* Yup for validating the user entered details. */
    let formValidation = yup.object().shape({
        user_name: yup.string().required(),
        password: yup.string().required(),
    });

    /* States used to store the username and passwords values entered by the user. */
    const[userName,setUserName]=useState(``);
    const[password,setPassword]=useState(``);
    /* State to keep count of number of wrong password entered. */
    const[wrongInput,setWrongInput]=useState(0);

  return (
    <ScrollView style={styles.container}>

        <View style={styles.header}> 
            <Text style={styles.loginText}>Login</Text>
            <Logo width={120} height={120} />
        </View>

        <TextInput
            placeholderTextColor={colorGlobal.loginBlueText}
            style={styles.input}
            onChangeText={(text)=>{
                setUserName(text);
            }}
            value={userName}
            placeholder="User Name"/>

        <TextInput
            secureTextEntry={true}
            placeholderTextColor={colorGlobal.loginBlueText}
            style={styles.input}
            onChangeText={(text)=>{
                setPassword(text);
            }}
            value={password}
            placeholder="Password"/>

        <TouchableOpacity 
            onPress={()=>{
                if(wrongInput >= 3){
                    Snackbar.show({
                        text: 'You are blocked from the app',
                        duration: Snackbar.LENGTH_LONG,
                      });
                }
                else{
                /* Using yup and checking if credentials are correct. */
                formValidation
                    .isValid({
                        user_name: userName,
                        password: password,
                    })
                    .then(function (valid) {
                        if(valid && password === `123456`){
                            navigation.navigate(`Notification`,{
                                user_name: userName,
                                password: password,
                            });
                        }
                        else if(valid && password !== `123456`){
                            setWrongInput(wrongInput+1);
                            ToastAndroid.show(`Incorrect Password !`,ToastAndroid.SHORT);
                        }
                        else{
                            ToastAndroid.show(`Invalid or Empty Details !`,ToastAndroid.SHORT);
                        }
                    });  
                }  
            }}
            style={{...styles.loginButton,backgroundColor: wrongInput >= 3 ? `#bdbdbd` : colorGlobal.yellowColor,}}>
            <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>            

    </ScrollView>
  )
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        alignItems: `center`,
        justifyContent: `space-between`,
        backgroundColor: colorGlobal.blueColor,
        paddingHorizontal: 35,
        paddingVertical:  35,
        marginBottom: 45,
        flexDirection: `row`,
    },
    loginText:{
        fontSize: 45,
        color: colorGlobal.whiteColor, 
    },
    input: {
        fontWeight: `500`,
        fontSize: 16,
        borderRadius: 5,
        color: colorGlobal.loginBlueText,
        borderColor: colorGlobal.loginBlueText,
        marginVertical: 20,
        marginHorizontal: 35,
        margin: 12,
        borderWidth: 1.5,
        paddingVertical: 15,    /* We could've also used height property, but not a good idea. */
        paddingHorizontal: 30,
    },
    loginButton:{
        marginTop: 45,
        alignItems: `center`,
        paddingVertical: 20,    /* We could've also used height property, but not a good idea. */
        borderRadius: 5,
        marginHorizontal: 35,
        justifyContent: `center`,
    },
    loginButtonText:{
        fontWeight: `bold`,
        fontSize: 16,
        color: colorGlobal.whiteColor,
    }
});

export default LoginScreen;