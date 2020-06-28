import React from 'react'
import {TouchableOpacity, Text,StyleSheet } from 'react-native'

export default function CardButton({onPress,children, btnStyle={}, textStyle={}}){
return (
    <TouchableOpacity onPress={onPress} style={[styles.button,btnStyle]}>
        <Text style={[styles.btnText, textStyle]}>
           {children}
        </Text>
   </TouchableOpacity>
)
}

const styles = StyleSheet.create({
    button: {
        width:'50%',
        height: 60,
        borderColor:'black',
        borderRadius:10,
        marginBottom:10
    },
    btnText : {
        fontSize:28,
        paddingTop:8,
        textAlign:'center',
        alignItems: 'center'
    }
})