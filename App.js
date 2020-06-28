import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  DeckListView  from './components/DeckListView'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './reducers'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator} from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import DeckDetail from './components/DeckDetail'
import Quiz from './components/Quiz'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'

const TabNavigation = createBottomTabNavigator({
  Decks : {
    screen : DeckListView,
     navigationOptions: {
      tabBarLabel:'Decks',
      tabBarIcon: ({ tintColor })=> <Ionicons name='ios-bookmarks' color={tintColor} size={30} />
    }
  },
  AddDeck : {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel:'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' color={tintColor} size={30} /> 
    }
}
})

const StackNavigation = createStackNavigator({
  Home : {
    screen : TabNavigation,
    navigationOptions: {
      headerShown:false
    }
  },
  DeckDetail : {
    screen: DeckDetail,
  },
  Quiz: {
    screen: Quiz
  },
  AddCard : {
    screen: AddCard
  }
}, {
 initialRouteName: 'Home'
},

{defaultNavigationOptions : {
   headerTintColor: 'white',
   headerStyle:{
   backgroundColor:'black',
 }
}})

const AppNavigation = createAppContainer(StackNavigation)

export default class extends Component {
  componentDidMount() {
    setLocalNotification()
  }
render( ) {
  return (
    <Provider store={createStore(Reducer)}>
        <View style={styles.container}>
          <AppNavigation />
        </View>
    </Provider> 
  );
}
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignContent:'center',
      justifyContent: 'center'
  }
})