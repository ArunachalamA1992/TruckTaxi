import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const TimerComponent = ({ start, stop, reset }) => {
  const [timer, setTimer] = useState(0); // Start from 0
  const [isRunning, setIsRunning] = useState(false);

  // Helper function to format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Pad with leading zeroes
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(secs).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = BackgroundTimer.setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1); // Increment the timer
      }, 1000);
    } else {
      BackgroundTimer.clearInterval(interval);
    }

    return () => BackgroundTimer.clearInterval(interval); // Cleanup on unmount
  }, [isRunning]);

  // Start the timer when the "start" prop is true
  useEffect(() => {
    if (start) {
      setIsRunning(true);
    }
  }, [start]);

  // Stop the timer when the "stop" prop is true
  useEffect(() => {
    if (stop) {
      setIsRunning(false);
    }
  }, [stop]);

  // Reset the timer when the "reset" prop is true
  useEffect(() => {
    if (reset) {
      setIsRunning(false);
      setTimer(0); // Reset the timer to 0
    }
  }, [reset]);

  return (
    <View style={{alignItems:'center',backgroundColor:'green',padding:5}}>
      <Text style={{ fontSize: 15, fontWeight: 'bold',alignItems:'center',color:'#fff' }}>
      {formatTime(timer)}
      </Text>
    </View>
  );
};

export default TimerComponent;
