import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

// Lista de clãs e seus status base
export const clans = [
  { name: "Uchiha", stats: { força: 5, velocidade: 7, vida: 6, defesa: 5, chakra: 8, controleChakra: 9 } },
  { name: "Senju", stats: { força: 7, velocidade: 6, vida: 10, defesa: 8, chakra: 5, controleChakra: 6 } },
  { name: "Hyuuga", stats: { força: 4, velocidade: 7, vida: 5, defesa: 6, chakra: 9, controleChakra: 10 } },
  { name: "Akimichi", stats: { força: 8, velocidade: 3, vida: 10, defesa: 9, chakra: 5, controleChakra: 3 } },
  { name: "Nara", stats: { força: 3, velocidade: 5, vida: 5, defesa: 4, chakra: 7, controleChakra: 10 } },
  { name: "Yamanaka", stats: { força: 2, velocidade: 6, vida: 4, defesa: 4, chakra: 8, controleChakra: 10 } },
  { name: "Aburame", stats: { força: 4, velocidade: 6, vida: 6, defesa: 6, chakra: 7, controleChakra: 8 } },
  { name: "Inuzuka", stats: { força: 6, velocidade: 8, vida: 6, defesa: 6, chakra: 5, controleChakra: 4 } },
];


type ClanListProps = {
  onSelectClan: (clan: string) => void;
};

const ClanList: React.FC<ClanListProps> = ({ onSelectClan }) => {
  return (
    <FlatList
      data={clans}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelectClan(item.name)}
          style={{
            backgroundColor: "#333",
            padding: 10,
            marginVertical: 5,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
          <Text style={{ color: "#CCC", fontSize: 14 }}>
            Força: {item.stats.força} | Velocidade: {item.stats.velocidade} | Vida: {item.stats.vida}
          </Text>
          <Text style={{ color: "#CCC", fontSize: 14 }}>
            Defesa: {item.stats.defesa} | Chakra: {item.stats.chakra} | Controle Chakra: {item.stats.controleChakra}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default ClanList;
