import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import VillageSelection from "@/components/vilas/villageSelection";
import { clans } from "@/components/clans/clanList";
import { getAuth } from "firebase/auth";

const CreateCharacter = () => {
  const router = useRouter();
  const { clan } = useLocalSearchParams();
  const clanName = Array.isArray(clan) ? clan[0] : clan;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);

  const getClanStats = (clanName: string) => {
    const foundClan = clans.find(c => c.name === clanName);
    return foundClan ? foundClan.stats : null;
  };

  const handleConfirm = async () => {
    if (!name || !age || !selectedVillage || !clan) {
      alert("Preencha todos os campos!");
      return;
    }

    const clanStats = getClanStats(clanName);
    if (!clanStats) {
      alert("Erro ao obter os status do clã.");
      return;
    }

    // Obtendo o ID do usuário autenticado
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      alert("Usuário não autenticado.");
      return;
    }

    const characterData = {
      name,
      age,
      village: selectedVillage,
      clan,
      stats: clanStats,
      yen: 0,
      rank: "Estudante",
      xp: 0,
      level: 0,
      missionsCompleted: 0,
      missionsFailed: 0,
      userId,  // Adicionando o ID do usuário
      createdAt: new Date().toISOString(),
    };

    try {
      // Adicionando o personagem no Firestore com o ID do usuário
      await addDoc(collection(db, "characters"), characterData);
      Alert.alert("Sucesso", "Personagem criado com sucesso!");
      router.replace("/(panel)/characterSelection/page");
    } catch (error) {
      console.error("Erro ao salvar personagem:", error);
      Alert.alert("Erro", "Não foi possível salvar o personagem.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Personagem</Text>

      <Text style={styles.subtitle}>Clã Escolhido: {clan}</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Idade:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua idade"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <VillageSelection selectedVillage={selectedVillage} onSelect={setSelectedVillage} />

      <TouchableOpacity onPress={handleConfirm} style={styles.button}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#FFF",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    color: "#FFF",
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#333",
    color: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FF6F00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateCharacter;
