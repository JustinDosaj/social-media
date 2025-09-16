import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {

  const { user, logout } = useAuth()
  
  const handleLogout = async () => {
    try {
      await logout(user?.token || '')
    } catch (error: any) {
      Alert.alert('Error', 'Failed to logout. Please try again')
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to my Social Media App</Text>
        {user?.email && <Text style={styles.emailText}>Email: {user.email}</Text>}

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 40,
        color: '#111827',
    },
    emailText: {
      fontSize: 16,
      color: '#6B7280',
      marginBottom: 40,
    },
    logoutButton: {
        backgroundColor: '#6366F1',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});
