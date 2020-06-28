import { AsyncStorage } from 'react-native'

export const CARD_STORAGE_KEY = 'UDACICARDS'

const CARD_DATA = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

 const _storeData = async () => {
     try {
         return await AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(CARD_DATA))
     } catch (error) {
         console.warn('Error saving data to the database', error)
     }
 }

 export const getDecks = async()=> {
    try{
      return await  AsyncStorage.getItem(CARD_STORAGE_KEY)
    }catch(error) {
        console.warn(error)
    }
 }

 export const addDeckToDecks = async(deck)=>{
  try {
    await AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
      [deck] : {
        title: deck,
        questions: []
      }
    }))
  }catch( err ) {
    console.warn(err)
  }
 }

 export const removeDeckFromDecks = async(deckTitle)=> {
   try{
    const returnData =  await AsyncStorage.getItem(CARD_STORAGE_KEY)
    const data = JSON.parse(returnData)
    data[deckTitle]
    delete data[deckTitle]
    return AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data))
   }catch(err) {
     console.warn(err)
   }
 }

export const addCardToDeck = ({card, question, answer})=>{
  try{
     return AsyncStorage.getItem(CARD_STORAGE_KEY)
      .then( decks => {
        const decksInStore = JSON.parse(decks)
        return AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
          questions: decksInStore[card].questions.concat({question:question,answer:answer})
      }))
    })
  }catch(err){
    console.warn(err)
  }
}
 _storeData()