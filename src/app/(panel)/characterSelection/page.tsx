import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Definindo os tipos
interface Character {
  id: string;
  name: string;
  village: string;
}

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
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  const handlerCriarPersonagem = () => {
    router.navigate("/(panel)/createCharacter/clanSelection");
  };

  const handlerSelecionarPersonagem = (character: Character) => {
    const villageRoute = villageRoutes[character.village];
    if (villageRoute) {
      router.push(villageRoute);
    } else {
      Alert.alert("Erro", `A vila '${character.village}' não tem uma rota definida.`);
    }
  };

  const fetchCharacters = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
      }

      const db = getFirestore();
      const charactersCollection = collection(db, 'characters');
      const q = query(charactersCollection, where("userId", "==", user.uid));
      const characterSnapshot = await getDocs(q);
      const characterList: Character[] = characterSnapshot.docs.map(doc => {
        const data = doc.data() as Omit<Character, "id">; // Garante que não tenha 'id'
        return { id: doc.id, ...data };
      });
      
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
        characters.map((char) => (
          <TouchableOpacity 
            key={char.id} 
            onPress={() => handlerSelecionarPersonagem(char)} 
            style={{ backgroundColor: "#333", padding: 10, marginBottom: 10, borderRadius: 10 }}
          >
            <Text style={{ color: "#FFF", fontSize: 18 }}>{char.name} - {char.village}</Text>
          </TouchableOpacity>
        ))
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
