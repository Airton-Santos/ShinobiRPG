import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const Game = ({ onGameOver }) => {
  const [score, setScore] = useState(0);
  const [breathingState, setBreathingState] = useState('exhale'); // Começa com expiração
  const [circleSize, setCircleSize] = useState(new Animated.Value(100)); // Tamanho do círculo de respiração
  const [isButtonPressed, setIsButtonPressed] = useState(false); // Se o botão foi pressionado corretamente
  const [isGameOver, setIsGameOver] = useState(false); // Controle do estado do jogo

  const inhaleDuration = 3000; // Duração da inspiração em ms
  const exhaleDuration = 3000; // Duração da expiração em ms
  const maxScore = 10; // Pontuação máxima para vitória

  useEffect(() => {
    if (isGameOver) return;
  }, [isGameOver]);

  const animateCircle = (type) => {
    if (type === 'inhale') {
      Animated.timing(circleSize, {
        toValue: 300, // Expande o círculo na inspiração
        duration: inhaleDuration,
        useNativeDriver: false,
      }).start(() => {
        setIsButtonPressed(false); // Libera o botão após a animação de inspiração
      });
    } else if (type === 'exhale') {
      Animated.timing(circleSize, {
        toValue: 80, // Contrai o círculo na expiração
        duration: exhaleDuration,
        useNativeDriver: false,
      }).start(() => {
        setIsButtonPressed(false); // Libera o botão após a animação de expiração
      });
    }
  };

  const handleBreathPress = () => {
    if (isButtonPressed) return; // Evita múltiplos cliques durante a animação

    if (breathingState === 'inhale') {
      setScore((prevScore) => Math.min(prevScore + 1, maxScore)); // Aumenta a pontuação na inspiração
      setBreathingState('exhale'); // Muda para expiração
      animateCircle('exhale'); // Inicia a animação de expiração
    } else if (breathingState === 'exhale') {
      setScore((prevScore) => Math.min(prevScore + 1, maxScore)); // Aumenta a pontuação na expiração
      setBreathingState('inhale'); // Muda para inspiração
      animateCircle('inhale'); // Inicia a animação de inspiração
    }

    setIsButtonPressed(true); // Desabilita o botão até a animação terminar
  };

  useEffect(() => {
    if (score >= maxScore) {
      setIsGameOver(true); // Finaliza o jogo quando atingir a pontuação máxima
      // Adiciona 5 pontos em chakra ao personagem
      onGameOver(5); // Função que pode ser chamada para atualizar o personagem (passando o bônus de chakra)
    }
  }, [score, onGameOver]);

  const resetGame = () => {
    setScore(0);
    setBreathingState('exhale'); // Começa com expiração
    setCircleSize(new Animated.Value(100));
    setIsButtonPressed(false);
    setIsGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Pontuação: {score}</Text>
      <View style={styles.gameContainer}>
        <Animated.View
          style={[styles.circle, { width: circleSize, height: circleSize }]}
        >
          <Text style={styles.breathText}>
            {breathingState === 'inhale' ? 'Inspire' : 'Expire'}
          </Text>
        </Animated.View>
      </View>
      <TouchableOpacity
        style={styles.breathButton}
        onPress={handleBreathPress}
        disabled={isButtonPressed} // Desabilita o botão durante a animação
      >
        <Text style={styles.buttonText}>
          {breathingState === 'inhale' ? 'Inspire' : 'Expire'}
        </Text>
      </TouchableOpacity>
      {isGameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Jogo Finalizado!</Text>
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
    width: 300,
    height: 300,
    backgroundColor: '#333',
    borderRadius: 150,
    marginBottom: 40,
    overflow: 'hidden',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 150,
    position: 'absolute',
  },
  breathText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  breathButton: {
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

export default Game;
