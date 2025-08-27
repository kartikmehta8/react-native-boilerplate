import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import * as LocalAuthentication from 'expo-local-authentication';

export default function Dashboard() {
  const { hash } = useLocalSearchParams<{ hash?: string }>();
  const [supported, setSupported] = useState<string>('');

  useEffect(() => {
    LocalAuthentication.supportedAuthenticationTypesAsync().then(types => {
      const names = types.map(t => LocalAuthentication.AuthenticationType[t]).join(', ');
      setSupported(names);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fingerprint Details</Text>
      <Text style={styles.label}>Hash: {hash}</Text>
      <Text style={styles.label}>Supported: {supported}</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/') }>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#111827',
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#111827',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
