// /app/mission/index.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';

const MissionRankSelectionScreen = () => {

  const router = useRouter();

  // Funções para navegar para a tela de missões de cada rank
  const goToMissionD = () => {
    router.navigate('/(panel)/missoes/missionsD/catarlixo')
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o Rank da Missão</Text>

      <Button title="Missão Rank D" onPress={goToMissionD} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
});

export default MissionRankSelectionScreen;
