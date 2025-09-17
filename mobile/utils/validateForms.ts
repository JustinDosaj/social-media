import { Alert } from "react-native";

interface IValidateForms {
    email: string,
    password: string,
    confirmPassword?: string
}

export const validateSignUpForm = ({email, password, confirmPassword}: IValidateForms) => {
    
    if (!email || !password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields');
        return false;
    }

    if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return false;
    }

    if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return false;
    }

    return true;
};

export const validateLoginForm = ({email, password}: IValidateForms) => {
    
    if (!email || !password ) {
        Alert.alert('Error', 'Please fill in all fields');
        return false;
    }

    if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return false;
    }

    return true;
};

export const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '#E5E7EB' };
    if (password.length < 6) return { strength: 1, text: 'Weak', color: '#EF4444' };
    if (password.length < 8) return { strength: 2, text: 'Fair', color: '#F59E0B' };
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return { strength: 3, text: 'Strong', color: '#10B981' };
    }
    return { strength: 2, text: 'Fair', color: '#F59E0B' };
};
