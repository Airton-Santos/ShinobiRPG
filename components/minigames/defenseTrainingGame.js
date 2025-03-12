import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const DefenseTrainingGame = ({ onGameOver }) => {
  const [score, setScore] = useState(0);
  const [enemyAttack, setEnemyAttack] = useState(new Animated.Value(0));
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState('Prepare-se para defender!');
  const maxScore = 10; // Pontuação máxima para finalizar o treino

  useEffect(() => {
    if (isGameOver) return;

    const attackInterval = setInterval(() => {
      triggerAttack();
    }, 1500); // Inimigo ataca a cada 1.5 segundos

    return () => clearInterval(attackInterval);
  }, [isGameOver]);

  const triggerAttack = () => {
    Animated.timing(enemyAttack, {
      toValue: 1,
      duration: 600, // Velocidade do ataque
      useNativeDriver: false,
    }).start(() => {
      setMessage('Defenda agora!');
      setTimeout(() => {
        enemyAttack.setValue(0);
        setMessage('Prepare-se para o próximo!');
      }, 400);
    });
  };

  const defend = () => {
    if (enemyAttack._value > 0.5) {
      // Defesa bem-sucedida
      setScore(prevScore => Math.min(prevScore + 1, maxScore));
      setMessage('Ótima defesa!');
    } else {
      // Errou o tempo
      setMessage('Defesa falhou!');
    }
  };

  useEffect(() => {
    if (score >= maxScore) {
      setIsGameOver(true);
      onGameOver(5); // Adiciona 5 pontos de defesa ao personagem
    }
  }, [score, onGameOver]);

  const resetGame = () => {
    setScore(0);
    setIsGameOver(false);
    setMessage('Prepare-se para defender!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Defesa: {score}</Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.gameContainer}>
        <Animated.View
          style={[
            styles.attackIndicator,
            { opacity: enemyAttack, transform: [{ translateY: enemyAttack.interpolate({ inputRange: [0, 1], outputRange: [-50, 50] }) }] },
          ]}
        />
      </View>
      <TouchableOpacity style={styles.defendButton} onPress={defend}>
        <Text style={styles.buttonText}>Defender</Text>
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
  message: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
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
  attackIndicator: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 25,
    position: 'absolute',
  },
  defendButton: {
    backgroundColor: '#008CFF',
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

export default DefenseTrainingGame;
