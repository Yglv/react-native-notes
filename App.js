import React from 'react'
import 'react-native-gesture-handler'
import { Home } from './src/Home'
import { NoteAdd } from './src/NoteAdd'
import { NoteDetail } from './src/NoteDetail'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Header } from './src/Header'

const Stack = createStackNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name="Home"
          options={{
            headerTitle: () => <Header name='Notes'/>,
            headerStyle: {
              height: 120,
              backgroundColor: '#fafafa',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            }
          }}/>
        <Stack.Screen
          component={NoteAdd}
          name="NoteAdd"
          options={({ navigation }) => ({
            headerTitle: () => <Header name=''/>,
            headerStyle: {
              backgroundColor: '#fafafa',
              height: 120,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTintColor: '#eeb711'
          })}/>
        <Stack.Screen
          component={NoteDetail}
          name="NoteDetail"
          options={({ navigation }) => ({
            headerTitle: () => <Header name=''/>,
            headerStyle: {
              backgroundColor: '#fafafa',
              height: 120,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTintColor: '#eeb711'
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


