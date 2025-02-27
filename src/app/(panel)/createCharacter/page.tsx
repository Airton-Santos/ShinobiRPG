import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

import VillageSelection from "@/components/vilas/villageSelection";

const CreateCharacter = () => {
  const router = useRouter();
  const { clan } = useLocalSearchParams(); // Captura o clã vindo da tela anterior
  const auth = getAuth();
  const user = auth.currentUser; // Obtém o usuário autenticado

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!name || !age || !selectedVillage) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!user) {
      alert("Usuário não autenticado!");
      return;
    }

    setLoading(true);

    try {
      // Salva o personagem no Firestore dentro do ID do usuário
      await addDoc(collection(db, "characters"), {
        userId: user.uid,
        name,
        age,
        village: selectedVillage,
        clan,
        createdAt: new Date(),
      });

      alert("Personagem criado com sucesso!");

      // Redireciona para a seleção de personagens
      router.replace("/(panel)/characterSelection/page");
    } catch (error) {
      console.error("Erro ao criar personagem:", error);
      alert("Erro ao criar personagem!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E", padding: 20, justifyContent: "center" }}>
      <Text style={{ color: "#FFF", fontSize: 24, marginBottom: 20 }}>Criar Personagem</Text>

      {/* Exibir Clã Selecionado */}
      <Text style={{ color: "#FFF", fontSize: 18, marginBottom: 10 }}>Clã Escolhido: {clan}</Text>

      {/* Campo de Nome */}
      <Text style={{ color: "#FFF", fontSize: 18 }}>Nome:</Text>
      <TextInput
        style={{
          backgroundColor: "#333",
          color: "#FFF",
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}
        placeholder="Digite seu nome"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      {/* Campo de Idade */}
      <Text style={{ color: "#FFF", fontSize: 18 }}>Idade:</Text>
      <TextInput
        style={{
          backgroundColor: "#333",
          color: "#FFF",
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}
        placeholder="Digite sua idade"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      {/* Seleção de Vila */}
      <VillageSelection selectedVillage={selectedVillage} onSelect={setSelectedVillage} />

      {/* Botão de Criar Personagem */}
      <TouchableOpacity
        onPress={handleConfirm}
        style={{
          backgroundColor: "#FF6F00",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 20,
        }}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={{ color: "#FFF", fontSize: 18 }}>Confirmar</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default CreateCharacter;
