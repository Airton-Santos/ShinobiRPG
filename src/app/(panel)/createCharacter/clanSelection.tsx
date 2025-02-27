import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import ClanList from "@/components/clans/clanList";

const ClanSelection = () => {
  const router = useRouter();
  const [selectedClan, setSelectedClan] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedClan) {
      alert("Escolha um clã!");
      return;
    }

    // Enviar o Clã escolhido para a próxima tela
    router.navigate({
      pathname: "/(panel)/createCharacter/page",
      params: { clan: selectedClan },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E", padding: 20 }}>
      <Text style={{ color: "#FFF", fontSize: 24, textAlign: "center", marginBottom: 10 }}>Criar Personagem</Text>

      {/* Seleção de Clã */}
      <Text style={{ color: "#FFF", fontSize: 18 }}>Escolha seu Clã:</Text>
      <ClanList onSelectClan={setSelectedClan} />

      {/* Exibir Clã Selecionado */}
      {selectedClan && (
        <View style={{ backgroundColor: "#444", padding: 10, marginTop: 20, borderRadius: 10 }}>
          <Text style={{ color: "#FFF", fontSize: 20 }}>Clã Selecionado: {selectedClan}</Text>
        </View>
      )}

      {/* Botão de Confirmar */}
      <TouchableOpacity
        onPress={handleConfirm}
        style={{
          backgroundColor: selectedClan ? "#D50000" : "#555",
          padding: 10,
          marginTop: 20,
          borderRadius: 10,
          alignItems: "center",
        }}
        disabled={!selectedClan}
      >
        <Text style={{ color: "#FFF", fontSize: 18 }}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClanSelection;
