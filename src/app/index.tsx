import Colors from '@/constants/Colors';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import Header from '@/components/cabeçalho/header';
import { Link } from 'expo-router';
import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'expo-router';


export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
  

  async function handleSigIn() {
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }
  
    setLoading(true);
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login bem-sucedido!");
      router.navigate("/(panel)/characterSelection/page")
    } catch (error: any) {
      alert("Erro ao fazer login: " + error.message);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.form}>
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

        <Pressable style={styles.button} onPress={handleSigIn} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Carregando..." : "Entrar"}</Text>
        </Pressable>


        <Link href={'/(auth)/signup/page'} style={styles.link}>
          <Text style={styles.linkText}>Ainda não criou uma conta? Cadastre-se</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Preto,
  },

  form: {
    flex: 1,
    backgroundColor: Colors.Branco,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingLeft: 14,
    paddingRight: 14,
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
    borderRadius: 8,
  },

  buttonText: {
    color: Colors.Zinc,
    fontSize: 14,
    fontWeight: 'bold',
  },

  link: {
    marginTop: 16,
    textAlign: 'center',
  },

  linkText: {
    color: '#6A0AD6', // Cor roxa
    textDecorationLine: 'underline',
  },
});
