import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

export default function CardText({ value,onBlur,onFocus,onChangeText,isfocused }) {
    return (
            <TextInput 
                style={[styles.textInput,
                {backgroundColor : isfocused === 'true' ? 'white' : 'rgba(0,0,0,0.1)'}]}
                value={value}
                onBlur={onBlur}
                onFocus={onFocus}
                onChangeText={onChangeText}
                />  
    )
}

const styles = StyleSheet.create({
    textInput: {
        width:'80%',
        height:50,
        borderWidth:2,
        borderColor:'black',
        fontSize:28,
        borderRadius:6,
        margin:10,
        padding:3,
    }
})
