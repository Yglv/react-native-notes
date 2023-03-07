import { View, Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { firebase } from '../database'
import React, { useLayoutEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons'

export function NoteAdd ({ navigation }) {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const handleAdd = () => {
    firebase.firestore()
      .collection('notes')
      .add({
        title, note
      })
      .then(() => {
        setTitle('')
        setNote('')
        Keyboard.dismiss()
      })
      .catch((error) => alert(error))
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.button}
          onPress={ handleAdd }
        >
          <Entypo name='check' size={30} color='#eeb711'></Entypo>
        </TouchableOpacity>
      )
    })
  })
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Title'
        value={title}
        onChangeText={text => setTitle(text)}
        style={styles.inputTitle}
      />
      <TextInput
        placeholder='Text'
        multiline={true}
        value={note}
        onChangeText={text => setNote(text)}
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
    fontWeight: 'bold',
    height: 50,
    textAlign: 'center',
    width: '95%',
    padding: 10
  },
  inputNote: {
    flex: 1,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    height: 300,
    width: '95%',
    padding: 10,
    textAlignVertical: 'top'
  },
  button: {
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    shadowColor: 'black'
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  }
})
