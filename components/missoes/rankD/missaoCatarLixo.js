import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MissaoCatarLixo = ({ onMissaoConcluida }) => {
  const [tempoRestante, setTempoRestante] = useState(900); // 15 minutos (900 segundos)
  const [missaoConcluida, setMissaoConcluida] = useState(false);
  const [recompensa, setRecompensa] = useState(null);

  // Função para aplicar as recompensas
  const aplicarRecompensas = async () => {
    const novaRecompensa = {
      pontos: 100, // Exemplo de recompensa
      itens: ["Saco de Lixo", "Lixeira"], // Exemplo de itens
    };
    setRecompensa(novaRecompensa);

    // Salvar os pontos no AsyncStorage
    try {
      const pontosSalvos = await AsyncStorage.getItem('pontos');
      const pontos = pontosSalvos ? JSON.parse(pontosSalvos) : 0;
      const novosPontos = pontos + novaRecompensa.pontos;

      // Salvar a nova quantidade de pontos
      await AsyncStorage.setItem('pontos', JSON.stringify(novosPontos));
    } catch (error) {
      console.error('Erro ao salvar pontos no AsyncStorage:', error);
    }
  };

  // Função para salvar o tempo restante da missão no AsyncStorage
  const salvarTempoRestante = async (tempo) => {
    try {
      await AsyncStorage.setItem('tempoRestante', JSON.stringify(tempo));
    } catch (error) {
      console.error('Erro ao salvar o tempo restante no AsyncStorage:', error);
    }
  };

  // Função para recuperar o tempo restante da missão
  const recuperarTempoRestante = async () => {
    try {
      const tempoSalvo = await AsyncStorage.getItem('tempoRestante');
      if (tempoSalvo) {
        setTempoRestante(JSON.parse(tempoSalvo));
      }
    } catch (error) {
      console.error('Erro ao recuperar o tempo restante do AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // Recupera o tempo restante quando o componente é montado
    recuperarTempoRestante();

    if (tempoRestante > 0) {
      const timer = setTimeout(() => {
        setTempoRestante(prevTempo => {
          const novoTempo = prevTempo - 1;
          salvarTempoRestante(novoTempo); // Salva o tempo restante após cada segundo
          return novoTempo;
        });
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setMissaoConcluida(true);
      aplicarRecompensas();
      salvarTempoRestante(0); // Zera o tempo no AsyncStorage quando a missão é concluída
      if (onMissaoConcluida) {
        onMissaoConcluida(recompensa); // Notifica a missão concluída
      }
    }
  }, [tempoRestante]);

  return (
    <View style={styles.container}>
      {missaoConcluida ? (
        <View>
          <Text style={styles.sucesso}>Missão Concluída!</Text>
          <Text style={styles.recompensa}>
            Recompensas: {recompensa ? `${recompensa.pontos} pontos` : "Nenhuma"}
          </Text>
          <Text style={styles.recompensa}>
            Itens: {recompensa ? recompensa.itens.join(", ") : "Nenhum"}
          </Text>
        </View>
      ) : (
        <Text style={styles.texto}>Tempo restante: {tempoRestante}s</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
  },
  sucesso: {
    fontSize: 22,
    color: "green",
    fontWeight: "bold",
  },
  recompensa: {
    fontSize: 18,
    marginTop: 10,
    color: "blue",
  },
});

export default MissaoCatarLixo;
