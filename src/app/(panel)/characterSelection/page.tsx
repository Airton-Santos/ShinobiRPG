import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Importe os métodos do Firestore

const CharacterSelection = () => {
  const router = useRouter();
  const [characters, setCharacters] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true); // Para mostrar carregando enquanto busca

  const handlerCriarPersonagem = () => {
    router.navigate("/(panel)/createCharacter/clanSelection");
  };

  const handlerSelecionarPersonagem = (characterName: string) => {
    console.log(`Selecionado: ${characterName}`); // Substitua por navegação ou lógica necessária
  };

  // Função para buscar personagens do Firestore
  const fetchCharacters = async () => {
    try {
      const db = getFirestore(); // Inicialize o Firestore
      const charactersCollection = collection(db, 'characters'); // Referência à coleção de personagens
      const characterSnapshot = await getDocs(charactersCollection);
      const characterList = characterSnapshot.docs.map(doc => ({ name: doc.data().name })); // Ajuste conforme seu modelo de dados

      setCharacters(characterList);
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
      Alert.alert("Erro", "Não foi possível carregar os personagens.");
    } finally {
      setLoading(false); // Atualiza o estado de loading
    }
  };

  useEffect(() => {
    fetchCharacters(); // Chama a função ao montar o componente
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#1E1E1E", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    ); // Mostra um carregando enquanto busca os dados
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#FFF", fontSize: 24, marginBottom: 20 }}>Seleção de Personagem</Text>

      {characters.length > 0 ? (
        <>
          {characters.map((char, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => handlerSelecionarPersonagem(char.name)} 
              style={{ backgroundColor: "#333", padding: 10, marginBottom: 10, borderRadius: 10 }}
            >
              <Text style={{ color: "#FFF", fontSize: 18 }}>{char.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={handlerCriarPersonagem}
            style={{ backgroundColor: "#FF6F00", padding: 10, borderRadius: 10, marginTop: 20 }}
          >
            <Text style={{ color: "#FFF", fontSize: 18 }}>Criar Novo Personagem</Text>
          </TouchableOpacity>
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
