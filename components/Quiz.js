import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CardButton from './CardButton'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {setLocalNotification, clearLocalNotification} from '../utils/helpers'
class Quiz extends Component{
    state = {
        correctAnswer: 0,
        currentQuestion:0,
        incorrectAnwer:0, 
        isAnswer: false,
        showResult: false,
        questionCount:this.props.questions.length
    }
    static navigationOptions = ({ navigation })=>{
        const { pageTitle } = navigation.state.params

        return {
            title: pageTitle
        }
    }
    toggleQuestion = ()=>{
        this.setState( (prevState) => (
            {isAnswer: !prevState.isAnswer}
        ))
    }
   
    handleRestart = ()=>{
        this.setState({
            isAnswer:false,
            showResult:false,
            currentQuestion:0,
            correctAnswer: 0,
            incorrectAnwer: 0,
            questionCount:this.props.questions.length
        })

        clearLocalNotification()
            .then(setLocalNotification)
    }
    handleAnswer = (answer)=>{
        if(answer === 'correct') {
            this.setState({correctAnswer: this.state.correctAnswer + 1})
        }

        if(answer === 'incorrect'){
            this.setState({incorrectAnwer:this.state.incorrectAnwer + 1})
        }

        if(this.state.currentQuestion === this.state.questionCount - 1){
            this.setState({showResult : true})
        } else {
            this.setState({currentQuestion : this.state.currentQuestion + 1})
        }
    }
    render(){
        const showingQuestion = this.props.questions[this.state.currentQuestion]
        
        if(this.props.questions.length === 0) { 
            return (
                <View style={styles.cantStartQuiz}> 
                    <Text style={{fontSize:30}}>
                        Sorry, you cannot take a quiz because there are no cards in the deck 
                    </Text>
                </View>
            )
        }
        if(this.state.showResult) {
            const { correctAnswer, questionCount } = this.state
            const percentage = ( (correctAnswer / questionCount) * 100).toFixed(0)

            return (
                <View style={{flex:1}}>
                    <View style={styles.qntAndAns}>
                        <Text style={[styles.answerText ,{fontSize : 30}]}>Quiz Complete !</Text>
                        <Text style={[styles.answerText, {fontSize:20}]}>{`${correctAnswer}/${questionCount}`} corrects</Text>
                        <Text style={[styles.answerText, {fontSize:20}]}>{'Percentage Correct'}</Text>
                        <Text style={[styles.answerText, {fontWeight:'bold', fontSize:25, color: percentage <= 50 ? 'red' : 'green'}]}>{`${percentage}%`}</Text>
                    </View>
                    <View style={styles.buttons}>
                    <CardButton onPress={this.handleRestart} 
                        btnStyle={{backgroundColor:'green'}}
                        textStyle={{color:'white'}}>
                         Restart
                     </CardButton>
                     <CardButton 
                        btnStyle={{backgroundColor:'red'}}
                        textStyle={{color:'white'}}
                        onPress={()=> this.props.navigation.dispatch(NavigationActions.back())}>
                         go Back
                     </CardButton>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.quizcontainer}>
                <View style={styles.qntAndAnsContent}>
                    <View style={{flex:1}}>
                        <Text style={styles.remainingQuestion}>{`${this.state.currentQuestion + 1}/${this.state.questionCount}`}</Text>
                        <View style={styles.qntAndAns}> 
                            <Text style={{fontSize:30, textAlign:'center'}}>
                                {!this.state.isAnswer ? showingQuestion.question : showingQuestion.answer}
                            </Text>
                        <Text style={styles.title} onPress={this.toggleQuestion}>
                             {!this.state.isAnswer ? 'Answer' : 'Question'}
                        </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <CardButton 
                        onPress={()=>this.handleAnswer('correct')}
                        btnStyle={{backgroundColor:'green'}}
                        textStyle={{color:'white'}}>
                        Correct
                    </CardButton>
                    <CardButton 
                        onPress={()=> this.handleAnswer('incorrect')}
                        btnStyle={{backgroundColor:'red'}}
                        textStyle={{color:'white'}}>
                        Incorrect
                    </CardButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
     answerText: {
        padding:10
     },
    quizcontainer : {
        flex: 1,
    },
    title:{
        padding:10,
        fontSize:15,
        color:'red',
        fontWeight:'bold'
    }
    ,
    qntAndAnsContent:{
        flex:5,
        margin:10,
    },
    qntAndAns: {
        alignItems:'center',
        justifyContent:'center',
        flex:5
    },
    buttons: {
        flex:3,
        alignItems:'center',
        margin:10
    },
    cantStartQuiz: {
        margin:20,
        justifyContent:'center',
        alignItems:'center',
    },
    remainingQuestion : {
        padding:10,
        fontSize: 20
    }
})

function mapStateToProps(decks, { navigation }) {
    const { title } = navigation.state.params
    const questions = decks[title].questions
    return {
        questions, 
    }
}
export default connect(mapStateToProps)(Quiz)