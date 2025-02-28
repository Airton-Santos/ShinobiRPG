import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SpeedTrainingGame = ({ onGameOver }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // Tempo limite de 10 segundos

  useEffect(() => {
    if (timeLeft > 0 && progress < 100) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0 || progress >= 100) {
      onGameOver(progress >= 100); // Se atingiu 100%, venceu
    }
  }, [timeLeft, progress]);

  const handlePress = () => {
    if (progress < 100) {
      setProgress(progress + 10); // Cada toque aumenta a barra
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Tempo: {timeLeft}s</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Toque rápido!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  timer: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  progressBarContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "#444",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FF6F00",
  },
  button: {
    backgroundColor: "#FF6F00",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default SpeedTrainingGame;