import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

type Village = {
  id: string;
  name: string;
};

const villages: Village[] = [
  { id: "1", name: "Konoha" },
  { id: "2", name: "Suna" },
  { id: "3", name: "Kiri" },
  { id: "4", name: "Kumo" },
  { id: "5", name: "Iwa" },
];

type Props = {
  selectedVillage: string | null;
  onSelect: (village: string) => void;
};

const VillageSelection: React.FC<Props> = ({ selectedVillage, onSelect }) => {
  return (
    <View>
      <Text style={{ color: "#FFF", fontSize: 18, marginBottom: 10 }}>Escolha sua Vila:</Text>
      <FlatList
        data={villages}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item.name)}
            style={{
              backgroundColor: selectedVillage === item.name ? "#FF6F00" : "#333",
              padding: 10,
              margin: 5,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 16 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default VillageSelection;
