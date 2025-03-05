import { useState } from 'react';
import Colors from '@/constants/Colors';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, ScrollView} from 'react-native';
import Header from '@/components/cabeçalho/header';
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router';
import { auth } from '@/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';



export default function Signup() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }
  
    setLoading(true);
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Conta criada com sucesso!");
    } catch (error: any) {
      alert("Erro ao criar conta: " + error.message);
    } finally {
      setLoading(false);
    }
  }
  



 return (

  <SafeAreaView style={{flex: 1}}>
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>

      <Pressable style={styles.btnVoltar} onPress={() => router.back()}>
        <Ionicons name='arrow-back' size={24} color={Colors.Branco}/>
      </Pressable>

      <Header />

        <View style={styles.form}>

          <View>
          <Text style={styles.label}>Nome Do Usúario</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder='Digite seu nome do usuário'
          />
          </View>
          
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder='Digite Seu Email...'
            />
          </View>

          <View>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder='Digite Sua Senha...'
              secureTextEntry
            />
          </View>

          <Pressable style={styles.button} onPress={handleSignUp} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Carregando..." : "Cadastrar"}</Text>
          </Pressable>

        </View>
      </View>
    </ScrollView>  
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Preto
    },

    form: {
      flex: 1,
      backgroundColor: Colors.Branco,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingTop: 24  ,
      paddingLeft: 14,
      paddingRight: 14
    },

    label: {
      color: Colors.Zinc,
      marginBottom: 4,
    },

    input: {
      borderWidth: 1,
      borderColor: Colors.Cinza,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 8,
      paddingTop: 14,
      paddingBottom: 14,
    },

    button: {
      backgroundColor: Colors.Verde,
      paddingTop: 14,
      paddingBottom: 14,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      borderRadius: 8
    },

    buttonText: {
      color: Colors.Zinc,
      fontSize: 14,
      fontWeight: 'bold'
    },

    btnVoltar: {
      backgroundColor: 'rgba(255, 255, 255, 0.55)',
      alignSelf: 'flex-start',
      borderRadius: 8,
      padding: 8,
      marginTop: 16,
      marginLeft: 16
    }

})