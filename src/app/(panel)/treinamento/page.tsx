import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TrainingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Treinamento</Text>
        <Text style={styles.subtitle}>Melhore suas habilidades de combate</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Treinamento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Treinamento Avançado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D3748', // Cor sólida de fundo (um tom de cinza escuro)
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Sobreposição para tornar o texto legível
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF6F00', // Cor do botão (laranja)
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TrainingScreen;
