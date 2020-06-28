import React, { Component } from 'react'
import { View, Text,FlatList,TouchableOpacity,StyleSheet} from 'react-native'
import { addDecks } from '../actions'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'

function DeckList({title,questions,onPress,}){
    return (
        <TouchableOpacity onPress={onPress}>
           <View style={styles.listviewContent}>
                <Text style={styles.title}> {title} </Text>
                <Text style={styles.total}> {questions.length} Cards</Text>
           </View>
        </TouchableOpacity>
    )
}

class DeckListView extends Component{

    componentDidMount(){
        return getDecks().then((decks)=> {
            this.props.dispatch(addDecks(JSON.parse(decks)))
        })
    }
    render() {
        const { decks } = this.props
        return (
           <View style={styles.listContainer}>
               <FlatList 
                   data={Object.keys(decks)}
                   keyExtractor={(item,index) => decks[item].title }
                   renderItem={ ({ item })=><DeckList {...decks[item]} onPress={()=>this.props.navigation.navigate(
                       'DeckDetail',
                       {title : decks[item].title})}/>}
               />
           </View>
        )
    }
}
const styles = StyleSheet.create({
    listContainer : {
        flex :1,
    }, 
    listviewContent: {
        marginTop:70,
        justifyContent:'center',
        alignItems:'center'
    },
    title : {
        padding:10,
        fontSize:30,
        color:'black'
    },
    total : {
        color:'black',
        opacity: 0.5,
        fontSize: 18
    }
})
function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(DeckListView)