import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Game from '@/components/minigames/minigameChakra';
import { db, auth } from '@/firebaseConfig'; // Importa o Firebase
import { doc, updateDoc, getDocs, query, where, collection } from 'firebase/firestore';

const TrainingScreen = () => {
  const [isTrainingActive, setIsTrainingActive] = useState(false);

  // Função que será chamada quando o jogo terminar
  const handleGameOver = async () => {
    try {
      const userId = auth.currentUser?.uid;
  
      if (!userId) {
        console.log('Usuário não autenticado!');
        return;
      }
  
      // Referência para a coleção de personagens
      const charactersRef = collection(db, "characters");
  
      // Buscando o documento onde o campo userId é igual ao ID do usuário
      const q = query(charactersRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userDocSnap = querySnapshot.docs[0]; // Pega o primeiro documento encontrado
        const userData = userDocSnap.data();
        const currentChakra = userData?.stats?.chakra || 0; // Pega o chakra atual, ou 0 se não existir
  
        // Atualiza o chakra com um bônus de 5
        await updateDoc(userDocSnap.ref, {
          "stats.chakra": currentChakra + 5, // Adiciona 5 ao chakra atual
        });
  
        console.log(`Chakra atualizado com sucesso para o personagem de ${userId}`);
      } else {
        console.log("Documento do personagem não encontrado!");
      }
    } catch (error) {
      console.error('Erro ao atualizar chakra:', error);
    }
  };

  const startTraining = () => {
    setIsTrainingActive(true);
  };

  const closeTraining = () => {
    setIsTrainingActive(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Treinamento de Chakra</Text>
        <Text style={styles.subtitle}>Equilibre seu chakra e melhore suas habilidades!</Text>

        {!isTrainingActive ? (
          <TouchableOpacity style={styles.button} onPress={startTraining}>
            <Text style={styles.buttonText}>Iniciar Treinamento</Text>
          </TouchableOpacity>
        ) : (
          <Game onGameOver={handleGameOver} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D3748',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    backgroundColor: '#FF6F00',
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
