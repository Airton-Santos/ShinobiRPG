import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Definindo as rotas da vila com tipos literais de string para evitar erro de tipo
type VillageRoute = "/(panel)/villages/konoha" | "/(panel)/villages/kirigakure" | "/(panel)/villages/sunagakure" | "/(panel)/villages/kumogakure" | "/(panel)/villages/iwagakure";

const villageRoutes: Record<string, VillageRoute> = {
  "Konoha": "/(panel)/villages/konoha",
  "Kirigakure": "/(panel)/villages/kirigakure",
  "Sunagakure": "/(panel)/villages/sunagakure",
  "Kumogakure": "/(panel)/villages/kumogakure",
  "Iwagakure": "/(panel)/villages/iwagakure",
};

const CharacterSelection = () => {
  const router = useRouter();
  const [characters, setCharacters] = useState<{ name: string; village: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const handlerCriarPersonagem = () => {
    router.navigate("/(panel)/createCharacter/clanSelection");
  };

  const handlerSelecionarPersonagem = (characterName: string, village: string) => {
    // Verificando se a vila tem uma rota definida
    const villageRoute = villageRoutes[village as keyof typeof villageRoutes];

    if (villageRoute) {
      router.push(villageRoute); // Navega para a rota da vila
    } else {
      Alert.alert("Erro", `A vila '${village}' não tem uma rota definida.`);
    }
  };

  const fetchCharacters = async () => {
    try {
      const db = getFirestore();
      const charactersCollection = collection(db, 'characters');
      const characterSnapshot = await getDocs(charactersCollection);
      const characterList = characterSnapshot.docs.map(doc => ({
        name: doc.data().name,
        village: doc.data().village,
      }));

      setCharacters(characterList);
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
      Alert.alert("Erro", "Não foi possível carregar os personagens.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#1E1E1E", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#FFF", fontSize: 24, marginBottom: 20 }}>Seleção de Personagem</Text>

      {characters.length > 0 ? (
        <>
          {characters.map((char, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => handlerSelecionarPersonagem(char.name, char.village)} 
              style={{ backgroundColor: "#333", padding: 10, marginBottom: 10, borderRadius: 10 }}
            >
              <Text style={{ color: "#FFF", fontSize: 18 }}>{char.name} - {char.village}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <TouchableOpacity
          onPress={handlerCriarPersonagem}
          style={{ backgroundColor: "#FF6F00", padding: 10, borderRadius: 10 }}
        >
          <Text style={{ color: "#FFF", fontSize: 18 }}>Criar Personagem</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CharacterSelection;
