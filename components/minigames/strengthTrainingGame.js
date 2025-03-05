import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const StrengthTrainingGame = ({ onGameOver }) => {
  const [score, setScore] = useState(0);
  const [barPosition, setBarPosition] = useState(new Animated.Value(0)); // Posição da barra
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const maxScore = 10; // Pontuação máxima para finalizar o treino
  
  useEffect(() => {
    if (isGameOver) return;
  }, [isGameOver]);

  const liftWeight = () => {
    if (isButtonPressed) return;

    Animated.sequence([
      Animated.timing(barPosition, {
        toValue: -100, // Levanta a barra
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(barPosition, {
        toValue: 0, // Abaixa a barra
        duration: 300,
        useNativeDriver: false,
      })
    ]).start(() => {
      setScore(prevScore => Math.min(prevScore + 1, maxScore)); // Aumenta a pontuação
      setIsButtonPressed(false);
    });
    
    setIsButtonPressed(true);
  };

  useEffect(() => {
    if (score >= maxScore) {
      setIsGameOver(true);
      onGameOver(5); // Adiciona 5 pontos de força ao personagem
    }
  }, [score, onGameOver]);

  const resetGame = () => {
    setScore(0);
    setBarPosition(new Animated.Value(0));
    setIsButtonPressed(false);
    setIsGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Força: {score}</Text>
      <View style={styles.gameContainer}>
        <Animated.View style={[styles.bar, { transform: [{ translateY: barPosition }] }]} />
      </View>
      <TouchableOpacity
        style={styles.liftButton}
        onPress={liftWeight}
        disabled={isButtonPressed}>
        <Text style={styles.buttonText}>Levantar Peso</Text>
      </TouchableOpacity>
      {isGameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Treino Concluído!</Text>
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  score: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  gameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 40,
  },
  bar: {
    width: 150,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 5,
    position: 'absolute',
  },
  liftButton: {
    backgroundColor: '#FF6F00',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  gameOverContainer: {
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 32,
    color: 'white',
    marginBottom: 20,
  },
});

export default StrengthTrainingGame;
