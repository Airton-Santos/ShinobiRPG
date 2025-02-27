import Colors from '@/constants/Colors';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.logoText}>
        Naruto<Text style={{ color: Colors.Vermelho }}>RP</Text>
      </Text>
      <Text style={styles.slogan}>Torne-se o shinobi mais forte!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  logoText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: Colors.Branco,
    marginBottom: 8,
  },
  slogan: {
    color: Colors.Branco,
    fontSize: 25,
    marginBottom: 15
  },
});

export default Header;
