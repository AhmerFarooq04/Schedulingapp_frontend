import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import uuid from "react-native-uuid";
import { format } from 'date-fns';
import Task from "./Task";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  
const onChange = (event, selectedValue) => {
  setShow(Platform.OS === 'ios');
  if (mode == 'date') {
    const currentDate = selectedValue || new Date();
    setDate(currentDate);
    setMode('time');
    setShow(Platform.OS !== 'ios'); // to show time picker
  } else {
    const selectedTime = selectedValue || new Date();
    setTime(selectedTime);
    setShow(Platform.OS === 'ios'); // to hide picker
    setMode('date'); // defaulting to date for next open
  }
};

const showMode = currentMode => {
  setShow(true);
  setMode(currentMode);
};

const showDatePicker = () => {
  showMode('date');
};

  const addToList = () => {
    if (inputValue === "") {
      Alert.alert("Oops", "Input is empty", [
        {
          text: "Ok",
        },
      ]);
      return;
    }

    const newItem = {
      id: uuid.v4(),
      item: inputValue,
      time: date, 
    };
    setTasks([newItem, ...tasks]);
    setInputValue("");
    Keyboard.dismiss();
    setShow(true);
  };

  const deleteFromList = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <View>
          <Text style={styles.sectionTitle}>Appointments</Text>
        </View>
        <TextInput
          value={inputValue}
          style={styles.input}
          placeholder='Add Task...'
          onChangeText={(text) => setInputValue(text)}
        />
        <TouchableOpacity onPress={addToList}>
          <View style={styles.btn}>
            <Text style={{ color: "white" }}>Add To Appointments </Text>

            <MaterialIcons
              style={{ marginLeft: 5, color: "white" }}
              name='add-box'
              size={24}
              color='black'
            />
          </View>
        </TouchableOpacity>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}

        <View style={styles.items}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={tasks}
            renderItem={({ item }) => (
              <Task task={item} deleteFromList={deleteFromList} />
            )}
          />
        </View>
      </View>

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#E8EAED",
  },
  btn: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#008080",
    color: "#ffffff",
  },
  taskWrapper: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  items: {
    flex: 1,
    marginTop: 30,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});