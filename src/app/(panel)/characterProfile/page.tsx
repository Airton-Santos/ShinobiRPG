import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const CharacterProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser; // Obtém o usuário autenticado
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!user) return; // Se não houver usuário logado, não faz nada

      try {
        // Buscando o personagem pelo userId (associado ao usuário logado)
        const q = query(
          collection(db, "characters"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Pegando o primeiro personagem encontrado
          const characterData = querySnapshot.docs[0].data();
          setCharacter(characterData);
        } else {
          console.error("Personagem não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar personagem:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6F00" />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Personagem não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Personagem</Text>

      {/* Nome, Clã e Vila */}
      <View style={styles.section}>
        <Text style={styles.characterInfo}>Nome: {character.name}</Text>
        <Text style={styles.characterInfo}>Clã: {character.clan}</Text>
        <Text style={styles.characterInfo}>Vila: {character.village}</Text>
      </View>

      {/* Status principais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Atributos</Text>
        <Text style={styles.stat}>Força: {character.stats?.força}</Text>
        <Text style={styles.stat}>Defesa: {character.stats?.defesa}</Text>
        <Text style={styles.stat}>Vida: {character.stats?.vida}</Text>
        <Text style={styles.stat}>Velocidade: {character.stats?.velocidade}</Text>
        <Text style={styles.stat}>Chakra: {character.stats?.chakra}</Text>
        <Text style={styles.stat}>Controle de Chakra: {character.stats?.controleChakra}</Text>
      </View>

      {/* Experiência e Rank */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progresso</Text>
        <Text style={styles.stat}>Nível: {character.level}</Text>
        <Text style={styles.stat}>XP: {character.xp}</Text>
        <Text style={styles.stat}>Rank Ninja: {character.rank}</Text>
      </View>

      {/* Histórico de missões */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Histórico de Missões</Text>
        <Text style={styles.stat}>Completas: {character.missionsCompleted}</Text>
        <Text style={styles.stat}>Falhas: {character.missionsFailed}</Text>
      </View>
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
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#FF6F00",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  characterInfo: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 5,
  },
  stat: {
    color: "#FFF",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFF",
    fontSize: 18,
    marginTop: 10,
  },
});

export default CharacterProfile;
