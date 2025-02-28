import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons"; // Ícone de usuário

const KonohaVillage = () => {
  const router = useRouter();

  const handlerMissao = () => {
    router.navigate("/(panel)/missoes/page");
  };

  const handlerTreinamento = () => {
    router.navigate("/(panel)/treinamento/page");
  };

  return (
    <ImageBackground
      source={require('@/src/images/villages/KonohaGakureBackground.jpg')}
      style={styles.container}
    >
      {/* Botão no canto superior direito */}
      <TouchableOpacity
        style={styles.userButton}
        onPress={() => router.navigate("/(panel)/characterProfile/page")}
      >
        <Ionicons name="person-circle-outline" size={40} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.overlay}>
        <Text style={styles.title}>Vila de Konoha</Text>

        <TouchableOpacity onPress={handlerMissao} style={styles.button}>
          <Text style={styles.buttonText}>Missões</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlerTreinamento} style={styles.button}>
          <Text style={styles.buttonText}>Treinamento</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Outras funcionalidades")} style={styles.button}>
          <Text style={styles.buttonText}>Outras Funções</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#FFF",
    marginBottom: 40,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF6F00", 
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
  },
  userButton: {
    position: "absolute",
    top: 40, // Ajuste conforme necessário
    right: 20,
    zIndex: 10,
  },
});

export default KonohaVillage;
