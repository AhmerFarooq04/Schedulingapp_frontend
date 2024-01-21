import React, { useState } from 'react';
import { Button, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TimePicker() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <Button onPress={showTimepicker} title="Show time picker!" />
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
    </View>
  );
}
