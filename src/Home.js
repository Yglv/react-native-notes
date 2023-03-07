import { View, Text, StyleSheet, Pressable, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../database.js'
import { FlatList } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'
import { NotFound } from './NotFound.js'

export function Home () {
  const [notes, setNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [resultNotFound, setResultNotFound] = useState(false)
  const navigation = useNavigation()

  const findNotes = () => {
    firebase.firestore()
      .collection('notes')
      .onSnapshot(querySnapshot => {
        const newNotes = []
        querySnapshot.forEach(doc => {
          const { note, title } = doc.data()
          newNotes.push({ note, title, id: doc.id })
        })
        setNotes(newNotes)
        console.log(newNotes)
      })
  }
  useEffect(() => {
    findNotes()
  }, [])

  const handleOnSearchInput = async text => {
    setSearchQuery(text)
    if (!text.trim()) {
      setSearchQuery('')
      setResultNotFound(false)
      return await findNotes()
    }
    const filteredSearchNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note
      }
    })
    if (filteredSearchNotes.length) {
      setNotes([...filteredSearchNotes])
    } else {
      setResultNotFound(true)
    }
  }

  return (
    <View style={styles.container}>
      <Entypo name='magnifying-glass' style={styles.searchIcon} size={22} color='#969696'></Entypo>
      <TextInput
        style={styles.textInput}
        value={searchQuery}
        placeholder='Search'
        onChangeText={searchText => handleOnSearchInput(searchText)}
      />
      {searchQuery ? (<Entypo name='cross' onPress={() => setSearchQuery('')} style={styles.clearIcon} size={25} color='#969696'></Entypo>) : null}
      { resultNotFound
        ? (<NotFound/>)
        : (<FlatList
        data={notes}
        numColumns={1}
        estimatedItemSize={100}
        style={styles.flatList}
        renderItem={({ item }) => (
          <View style={styles.noteView}>
            <Pressable onPress={() => navigation.navigate('NoteDetail', { item })}>
              <Text style={styles.noteTitle}>
                {item.title}
              </Text>
              <Text style={styles.noteDescription}>
                {item.note.slice(0, 32)}
              </Text>
            </Pressable>
          </View>
        )}
      />)}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NoteAdd')}
      >
        <Entypo name='new-message' size={40} color='#eeb711'></Entypo>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center'
  },
  flatList: {
    flex: 1,
    paddingTop: 22,
    width: '90%'
  },
  noteView: {
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 7
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  noteDescription: {
    fontSize: 16,
    marginTop: 5
  },
  button: {
    position: 'absolute',
    bottom: 60,
    right: 30,
    color: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 7
  },
  textInput: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#e7e9e7',
    height: 35,
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 35,
    marginTop: 10,
    color: '#969696'
  },
  searchIcon: {
    position: 'absolute',
    top: 15,
    left: 25,
    zIndex: 3
  },
  clearIcon: {
    position: 'absolute',
    top: 15,
    left: '87%',
    zIndex: 3
  }
})
