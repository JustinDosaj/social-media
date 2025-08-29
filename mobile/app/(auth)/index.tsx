import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function AuthIndex() {
    useEffect(() => {
        // Add any auth-checking logic here later
        // For now, just redirect to login after a brief moment
        const timer = setTimeout(() => {
        router.replace('/(auth)/login');
        }, 500); // Small delay to show loading state

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#6366F1" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});