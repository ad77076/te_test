import {    View,
            ScrollView,
            FlatList,
            ActivityIndicator,
            StyleSheet,
            Text } from 'react-native';
import React,{useState,useEffect} from 'react';

/* Importing svgs used on the notification screen */
import Back from '../assets/images/back_button.svg';
import Profile from '../assets/images/profile_icon.svg';

/* Importing the colors that'll be used. */
import {colorGlobal} from '../globals/utils';


/* UI or JSX of individual list item. */  
const Item = ({ title,date }) => (
    <View style={styles.item}>
        <Profile width={40} height={40} />
        <View style={styles.itemText}>
            <Text style={styles.title}>{title.slice(0,12)}</Text>
            <Text style={styles.dateText}>{date.slice(0,7)}</Text>
        </View>    
    </View>
);


const NotificationScreen = ({route,navigation}) => {

    /* Function to get the api data and store them in the listData state.
       Could've also used axios. */
    const getRandomData = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                setListData(data);
            } );
    }

    /* Making api call on component mount. */
    useEffect(() => {
      getRandomData();
    }, [])
    

    /* State to store the api data. */
    const[listData,setListData]=useState([]);

    /* The item to render the flat list */
    const renderItem = ({ item }) => (
        <Item title={item.body} date={item.title} />
    );

    /* Object destructuring to get the states/datafrom previous component. */
    const { user_name,password } = route.params;

  return (
    <ScrollView style={styles.container}>
        
        <View style={styles.notificationHeader}>
                <Back 
                    onPress={()=>{
                        navigation.goBack();
                    }}
                    width={30} 
                    height={30} />
                <Text style={styles.notificationText}>Notification</Text>
        </View>

        <View style={styles.subHeader}>
            <Text style={styles.subHeaderText}>Welcome {user_name} !</Text>
        </View>    

        { /* Conditional rendering if data is not present */
            listData.length === 0 ? (
                <ActivityIndicator style={styles.activityIndicator} size="large" color={colorGlobal.blueColor} />
            ) 
            :  
            (
                <FlatList
                    data={listData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}/>   
            )
        }         

    </ScrollView>
  )
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colorGlobal.whiteColor,
    },
    notificationHeader:{
        flexDirection: `row`,
        paddingHorizontal: 25,
        alignItems: `center`,
        paddingVertical: 25,
        backgroundColor: colorGlobal.blueColor,
    },
    notificationText:{
        fontSize: 22,
        marginHorizontal: 25,
        color: colorGlobal.whiteColor,
        fontWeight: `bold`,
    },
    subHeader:{
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: `center`,
    },
    subHeaderText:{
        fontSize: 30,
        fontWeight: `bold`,
        color: colorGlobal.blueColor,
    },
    item: {
        flexDirection: `row`,
        alignItems: `center`,
        padding: 20,
        marginVertical: 0,
        marginHorizontal: 25,
    },
    itemText:{
        marginHorizontal: 10,
        flexDirection: `column`,
    },
    title: {
        fontSize: 20,
        fontWeight: `bold`,
        color: colorGlobal.notificationChildItemTextColor,
    },
    dateText:{
        fontSize: 10,
        fontWeight: `bold`,
        color: `#bdbdbd`,
        color: colorGlobal.notificationChildItemTextColor,
    },
    activityIndicator:{
        marginVertical: 200,
    }
});

export default NotificationScreen;