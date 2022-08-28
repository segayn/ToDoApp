import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import registerNNPushToken from 'native-notify';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, Image,Alert,  TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task';

export default function App() {
  registerNNPushToken(3670, 'MhG0SdhlvNzLuHwVqkcId7');
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [date, setDate] = useState(null);

  useEffect(() => {
    let today = new Date();
    let date = today.getDate() + '.' + '0' + (today.getMonth()+1) + '.' + today.getFullYear();
    setDate(date);
  })

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>

      {/* {Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <TouchableOpacity onPress={ () => Alert.alert('Profil fotoğrafınız 1 kez seçilebilir :(')}>
        <Image  style={styles.ppstyle} source={require('./assets/todopp.png')} />
        </TouchableOpacity>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.sectionTitle}>Günün Planları ✍️</Text>

        <View style={styles.items}>
          {/* {This is where the tasks will go!} */}

          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>)

            })
          }


        


        </View>


      </View>


      {/* {Write a task} */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Bir Plan Ekle...'} value={task} onChangeText={text => setTask(text)} />


        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  ppstyle: {
      width: 50,
      height: 50,
      borderRadius: 50,
      alignSelf: 'flex-end',
      top: 0,
      right: 20,
      
  },
  dateText: {
    color: "gray",
    fontWeight: "700",
    alignSelf: 'flex-end',
    top: 30,
    right: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'

  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    width: 250,
    borderWidth: 1,
    padding: 1,

  },

  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },

  addText: {

  },







});
