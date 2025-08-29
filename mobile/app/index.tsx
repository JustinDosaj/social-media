import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                // User is logged in, go to main app
                router.replace('/(tabs)');
            } else {
                // User is not logged in, go to auth flow
                router.replace('/(auth)');
            }
        }
    }, [isAuthenticated, isLoading]);

    // Show loading spinner while checking auth status
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#6366F1" />
            </View>
        );
    }

  // This shouldn't render since we redirect above, but just in case
  return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});