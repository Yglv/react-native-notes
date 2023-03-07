/* eslint-disable react/prop-types */
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { firebase } from '../database'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

export function NoteDetail ({ route }) {
  const navigation = useNavigation()
  const [noteTitle, setNoteTitle] = useState(route.params.item.title)
  const [noteText, setNoteText] = useState(route.params.item.note)

  // update
  const handleUpdate = () => {
    if (noteTitle && noteTitle.length > 0) {
      firebase.firestore()
        .collection('notes')
        .doc(route.params.item.id)
        .update({
          title: noteTitle,
          note: noteText
        })
        .then(() => {
          navigation.navigate('Home')
        })
        .catch(error => {
          alert(error)
        })
    }
  }
  // delete
  const handleDelete = () => {
    firebase.firestore()
      .collection('notes')
      .doc(route.params.item.id)
      .delete()
      .then(() => navigation.navigate('Home'))
      .catch(error => {
        alert(error)
      })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleUpdate}
          >
            <Entypo name='edit' size={25} color='#eeb711'></Entypo>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleDelete}
          >
            <Entypo name='trash' size={25} color='#eeb711'></Entypo>
          </TouchableOpacity>
        </View>
      )
    })
  })
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Title'
        value={noteTitle}
        onChangeText={text => setNoteTitle(text)}
        style={styles.inputTitle}
      />
      <TextInput
        placeholder='Text'
        multiline={true}
        value={noteText}
        onChangeText={text => setNoteText(text)}
        style={styles.inputNote}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },
  inputTitle: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    height: 50,
    width: '95%',
    padding: 10
  },
  inputNote: {
    flex: 1,
    fontSize: 18,
    height: 300,
    width: '95%',
    padding: 10,
    textAlignVertical: 'top'
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    width: 70
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    shadowColor: 'black'
  },
})
