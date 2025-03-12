// MissaoScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MissaoCatarLixo from '@/components/missoes/rankD/missaoCatarLixo'; // Importando o componente MissaoCatarLixo

// Definindo o tipo para a recompensa da missão
interface Recompensa {
  pontos: number;
  itens: string[];
}

const MissaoScreen: React.FC = () => {
  // Função para notificar quando a missão for concluída
  const handleMissaoConcluida = (recompensa: Recompensa) => {
    console.log('Missão Concluída!', recompensa);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela da Missão</Text>
      
      {/* Chamando o componente MissaoCatarLixo */}
      <MissaoCatarLixo onMissaoConcluida={handleMissaoConcluida} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
});

export default MissaoScreen;