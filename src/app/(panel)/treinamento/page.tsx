import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Game from '@/components/minigames/minigameChakra';
import SpeedGame from '@/components/minigames/speedTrainingGame';
import StrenghtGame from '@/components/minigames/strengthTrainingGame';
import { db, auth } from '@/firebaseConfig';
import { doc, updateDoc, getDocs, query, where, collection, Timestamp } from 'firebase/firestore';

const TrainingScreen = () => {
  const [isChakraTrainingActive, setIsChakraTrainingActive] = useState(false);
  const [isSpeedTrainingActive, setIsSpeedTrainingActive] = useState(false);
  const [isStrengthTrainingActive, setIsStrengthTrainingActive] = useState(false);
  const [cooldownChakra, setCooldownChakra] = useState(false);
  const [cooldownSpeed, setCooldownSpeed] = useState(false);
  const [cooldownStrength, setCooldownStrength] = useState(false);

  useEffect(() => {
    checkCooldown();
  }, []);

  const checkCooldown = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const charactersRef = collection(db, "characters");
    const q = query(charactersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDocSnap = querySnapshot.docs[0];
      const userData = userDocSnap.data();
      const now = new Date();

      const lastChakraTraining = userData?.lastChakraTraining?.toDate();
      const lastStrengthTraining = userData?.lastStrengthTraining?.toDate();
      const lastSpeedTraining = userData?.lastSpeedTraining?.toDate();

      if (lastChakraTraining && now.getTime() - lastChakraTraining.getTime() < 24 * 60 * 60 * 1000) {
        setCooldownChakra(true);
      }
      if (lastSpeedTraining && now.getTime() - lastSpeedTraining.getTime() < 24 * 60 * 60 * 1000) {
        setCooldownSpeed(true);
      }
      if (lastStrengthTraining && now.getTime() - lastStrengthTraining.getTime() < 24 * 60 * 60 * 1000) {
        setCooldownStrength(true);
      }
    }
  };

  const handleChakraGameOver = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const charactersRef = collection(db, "characters");
    const q = query(charactersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDocSnap = querySnapshot.docs[0];
      const userData = userDocSnap.data();
      const currentChakra = userData?.stats?.chakra || 0;

      await updateDoc(userDocSnap.ref, {
        "stats.chakra": currentChakra + 5,
        lastChakraTraining: Timestamp.now(),
      });

      console.log(`Chakra atualizado! Cooldown ativado.`);
      setCooldownChakra(true);
    }
  };

  const handleSpeedGameOver = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const charactersRef = collection(db, "characters");
    const q = query(charactersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDocSnap = querySnapshot.docs[0];
      const userData = userDocSnap.data();
      const currentSpeed = userData?.stats?.velocidade || 0;

      await updateDoc(userDocSnap.ref, {
        "stats.velocidade": currentSpeed + 5,
        lastSpeedTraining: Timestamp.now(),
      });

      console.log(`Velocidade atualizada! Cooldown ativado.`);
      setCooldownSpeed(true);
    }
  };

  const handleStrengthGameOver = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const charactersRef = collection(db, "characters");
    const q = query(charactersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDocSnap = querySnapshot.docs[0];
      const userData = userDocSnap.data();
      const currentStrength = userData?.stats?.força || 0;

      await updateDoc(userDocSnap.ref, {
        "stats.força": currentStrength + 5,
        lastStrengthTraining: Timestamp.now(),
      });

      console.log(`Força atualizada! Cooldown ativado.`);
      setCooldownStrength(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Treinamento</Text>
        <Text style={styles.subtitle}>Melhore suas habilidades através do treino!</Text>

        {!isChakraTrainingActive && !isSpeedTrainingActive && !isStrengthTrainingActive ? (
          <>
            <TouchableOpacity
              style={[styles.button, cooldownChakra && styles.disabledButton]}
              onPress={() => {
                if (cooldownChakra) {
                  Alert.alert("Aguarde!", "Você só pode treinar chakra uma vez por dia.");
                  return;
                }
                setIsChakraTrainingActive(true);
              }}
              disabled={cooldownChakra}
            >
              <Text style={styles.buttonText}>Treinamento de Chakra</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, cooldownSpeed && styles.disabledButton]}
              onPress={() => {
                if (cooldownSpeed) {
                  Alert.alert("Aguarde!", "Você só pode treinar velocidade uma vez por dia.");
                  return;
                }
                setIsSpeedTrainingActive(true);
              }}
              disabled={cooldownSpeed}
            >
              <Text style={styles.buttonText}>Treinamento de Velocidade</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, cooldownStrength && styles.disabledButton]}
              onPress={() => {
                if (cooldownStrength) {
                  Alert.alert("Aguarde!", "Você só pode treinar força uma vez por dia.");
                  return;
                }
                setIsStrengthTrainingActive(true);
              }}
              disabled={cooldownStrength}
            >
              <Text style={styles.buttonText}>Treinamento de Força</Text>
            </TouchableOpacity>
          </>
        ) : isChakraTrainingActive ? (
          <Game onGameOver={() => {
            handleChakraGameOver();
            setIsChakraTrainingActive(false);
          }} />
        ) : isSpeedTrainingActive ? (
          <SpeedGame onGameOver={() => {
            handleSpeedGameOver();
            setIsSpeedTrainingActive(false);
          }} />
        ) : (
          <StrenghtGame onGameOver={() => {
            handleStrengthGameOver();
            setIsStrengthTrainingActive(false);
          }} />
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
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TrainingScreen;
