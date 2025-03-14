// /app/mission/index.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';

const MissionRankSelectionScreen = () => {

  const router = useRouter();

  // Funções para navegar para a tela de missões de cada rank
  const goToMissionD = () => {
    router.navigate('/(panel)/missoes/ranksmissionsD')
  };

  const goToMissionC = () => {
    window.location.href = "/mission/C";
  };

  const goToMissionB = () => {
    window.location.href = "/mission/B";
  };

  const goToMissionA = () => {
    window.location.href = "/mission/A";
  };

  const goToMissionS = () => {
    window.location.href = "/mission/S";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o Rank da Missão</Text>

      <Button title="Missão Rank D" onPress={goToMissionD} />
      <Button title="Missão Rank C" onPress={goToMissionC} />
      <Button title="Missão Rank B" onPress={goToMissionB} />
      <Button title="Missão Rank A" onPress={goToMissionA} />
      <Button title="Missão Rank S" onPress={goToMissionS} />
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
