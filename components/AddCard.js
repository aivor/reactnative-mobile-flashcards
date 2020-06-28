import React, { Component}from 'react'
import { View, Text,StyleSheet,TextInput,Alert } from 'react-native'
import CardButton from './CardButton'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import CardText from './CardText'

class AddCard extends Component{
    state = {
        isfocused: 'false',
        question: 'Question',
        answer: 'Answer'
    }
    handleFocus = event => {
        this.setState({ isfocused: 'true'})
        
        if(this.props.onFocus){
            this.props.onFocus(event)
        }
    }
    handleOnBlur = event => {
        this.setState({isfocused: 'false'})
        
        if(this.props.onBlur){
            this.props.onBlur(event)
        }

    }
    submitCard = ()=>{
      const question = this.state.question
      const answer = this.state.answer
      const card = this.props.navigation.state.params.quizTitle
      if(question === 'Question' && answer === 'Answer'){
          Alert.alert(`You didn't enter question and answer,Try again`)
          console.log('No answer entered')
      }else {
        addCardToDeck({card,question,answer})
        this.props.dispatch(addCard({ question,answer,card }))
      }

      this.setState({
          question: 'Question',
          answer:'Answer'
      })
    }
    static navigationOptions = ({ navigation })=>{
        const { pageTitle,quizTitle } = navigation.state.params
        return {
            title:`${quizTitle}   ${pageTitle}`
        }
    }

    render(){
        return (
            <View style={styles.addCardContainer}>
                <View style={styles.cardQuestion}>
                    <CardText 
                        value={this.state.question}
                        onBlur={this.handleOnBlur}
                        onFocus={this.handleFocus}
                        isfocused={this.state.isfocused}
                        onChangeText={(text)=> this.setState({question:text})}/>
                     <CardText 
                        value={this.state.answer}
                        onBlur={this.handleOnBlur}
                        onFocus={this.handleFocus}
                        isfocused={this.state.isfocused}
                        onChangeText={(text)=> this.setState({answer:text})}/>
                </View>
                <View style={styles.submitBtn}>
                    <CardButton 
                        onPress={this.submitCard}
                        btnStyle={{backgroundColor:'black'}}
                        textStyle={{color:'white'}}>
                        Submit
                    </CardButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addCardContainer: {
        flex:1,
    },
    cardQuestion: {
        flex:6,
        alignItems:'center',
        marginTop:40,
        marginBottom:5
    },
    submitBtn:{
        flex:4,
        alignItems:'center'
    }
})

function mapStateToProps(decks){
    return {
        decks
    }
}
export default connect(mapStateToProps)(AddCard)