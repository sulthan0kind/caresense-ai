
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type LoginScreenProps = {
  onLogin: (email: string) => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const validEmail = 'tesa@gmail.com';
    const validPassword = '12345678';

    if (!email.trim() || !password) {
      Alert.alert('Login Gagal', 'Email dan password harus diisi.');
      return;
    }

    if (
      email.trim().toLowerCase() === validEmail &&
      password === validPassword
    ) {
      onLogin(email.trim());
    } else {
      Alert.alert(
        'Login Gagal',
        'Email atau password yang kamu masukkan salah.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>CS</Text>
        </View>

        <Text style={styles.title}>CareSense AI</Text>
        <Text style={styles.subtitle}>
          Pendamping pintar untuk perawatan lansia
        </Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Selamat Datang</Text>
          <Text style={styles.description}>
            Masuk ke akun caregiver untuk melanjutkan.
          </Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan email"
            placeholderTextColor="#94A3A3"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan password"
            placeholderTextColor="#94A3A3"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Masuk</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          CARESENSE AI · CAREGIVER DASHBOARD
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7F7',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  logo: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: '#0F766E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#0F2A2A',
  },
  subtitle: {
    color: '#486060',
    fontSize: 12,
    marginTop: 6,
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#DCE8E8',
  },
  heading: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0F2A2A',
  },
  description: {
    color: '#486060',
    fontSize: 12,
    marginTop: 6,
    marginBottom: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2A2A',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#DCE8E8',
    borderRadius: 10,
    paddingHorizontal: 13,
    fontSize: 13,
    color: '#0F2A2A',
    marginBottom: 17,
    backgroundColor: '#FAFCFC',
  },
  button: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#0F766E',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    fontSize: 10,
    color: '#718078',
    marginTop: 28,
    letterSpacing: 1,
  },
});
