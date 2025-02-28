import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import VillageSelection from "@/components/vilas/villageSelection";
import { clans } from "@/components/clans/clanList"; // Corrigido!

const CreateCharacter = () => {
  const router = useRouter();
  const { clan } = useLocalSearchParams();
  const clanName = Array.isArray(clan) ? clan[0] : clan;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);

  // Obtém os status do clã escolhido
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

    const characterData = {
      name,
      age,
      village: selectedVillage,
      clan,
      stats: clanStats,
      createdAt: new Date().toISOString(),
    };

    try {
      // Salva no Firebase diretamente
      await addDoc(collection(db, "characters"), characterData);
      Alert.alert("Sucesso", "Personagem criado com sucesso!");
      router.replace("/(panel)/characterSelection/page");
      
    } catch (error) {
      console.error("Erro ao salvar personagem:", error);
      Alert.alert("Erro", "Não foi possível salvar o personagem.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E", padding: 20, justifyContent: "center" }}>
      <Text style={{ color: "#FFF", fontSize: 24, marginBottom: 20 }}>Criar Personagem</Text>

      <Text style={{ color: "#FFF", fontSize: 18, marginBottom: 10 }}>Clã Escolhido: {clan}</Text>

      <Text style={{ color: "#FFF", fontSize: 18 }}>Nome:</Text>
      <TextInput
        style={{ backgroundColor: "#333", color: "#FFF", padding: 10, borderRadius: 10, marginBottom: 15 }}
        placeholder="Digite seu nome"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <Text style={{ color: "#FFF", fontSize: 18 }}>Idade:</Text>
      <TextInput
        style={{ backgroundColor: "#333", color: "#FFF", padding: 10, borderRadius: 10, marginBottom: 15 }}
        placeholder="Digite sua idade"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <VillageSelection selectedVillage={selectedVillage} onSelect={setSelectedVillage} />

      <TouchableOpacity
        onPress={handleConfirm}
        style={{ backgroundColor: "#FF6F00", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 }}
      >
        <Text style={{ color: "#FFF", fontSize: 18 }}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateCharacter;
