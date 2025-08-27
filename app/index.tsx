import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen() {
  const [error, setError] = useState<string | null>(null);

  const handleAuthenticate = async () => {
    setError(null);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (!hasHardware || !isEnrolled || !supported.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        setError('Fingerprint authentication not available');
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Fingerprint',
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: true,
      });
      if (result.success) {
        const hash = Date.now().toString(36);
        router.replace({ pathname: '/dashboard', params: { hash } });
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (e) {
      setError(String(e));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Start with fingerprint</Text>
      <TouchableOpacity style={styles.button} onPress={handleAuthenticate}>
        <Text style={styles.buttonText}>Authenticate</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  button: {
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
  error: {
    marginTop: 16,
    color: '#dc2626',
  },
});
