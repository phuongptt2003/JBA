import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/ui/input';
import ButtonSubmit from '../../components/ui/button';
import { formatHeight, formatWeight, isValidEmail, isValidVietnamesePhone } from '../../utils/validation';
import { RootStackParamList } from '../../navigation/types';
import { User } from '../../models/user';
import { loginUser, registerUser } from '../../api/user-api';
import { useDispatch } from 'react-redux';
import { loginStore } from '../../store/slices/user-slice';

const RegisterScreen: React.FC = () => {
    const [user, setUser] = React.useState<User>({
        _id: '',
        username: '',
        password: '',
        phone: '',
        email: '',
        confirmPassword: '',
        invitationCode: '',
        weight: 0,
        height: 0,
        role: 'user',
        address: '',
        optionEmail: ''
    });

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        console.log('Register button clicked');
        const missingFields = [];
        if (!user.username) missingFields.push('Username');
        if (!user.phone) missingFields.push('Phone Number');
        if (!user.email) missingFields.push('Email');
        if (!user.password) missingFields.push('Password');
        if (!user.confirmPassword) missingFields.push('Confirm Password');
        // if (!user.invitationCode) missingFields.push('Invitation Code');
        if (user.weight <= 0) missingFields.push('Weight');
        if (user.height <= 0) missingFields.push('Height');

        if (missingFields.length > 0) {
            Alert.alert('Missing Information', `Please enter: ${missingFields.join(', ')}`);
            return;
        }

        if (!isValidEmail(user.email)) {
            Alert.alert('Error', 'Invalid email');
            return;
        }

        if (!isValidVietnamesePhone(user.phone)) {
            Alert.alert('Error', 'Invalid phone number');
            return;
        }

        if (user.password !== user.confirmPassword) {
            Alert.alert('Error', 'Password confirmation does not match');
            return;
        }
        if (user.password === '' || user.confirmPassword === '') {
            Alert.alert('Error', 'Please enter password and confirm password');
            return;
        }
        // if (user.InvitationCode === '') {
        //     Alert.alert('Error', 'Please enter an invitation code');
        //     return;
        // }
        if (user.weight <= 0 || user.height <= 0) {
            Alert.alert('Error', 'Please enter valid weight and height');
            return;
        }

        const isRegistered = await registerUser(user.email, user.password, user.username, user.phone, user.role, user.optionEmail, user.address, user.invitationCode);
        if (isRegistered) {
            Alert.alert('Success', 'Registration successful');
            const userLogin = await loginUser(user.email, user.password, 'web-app-v1');
            if (userLogin) {
                dispatch(loginStore(userLogin));
                navigation.navigate('Home', { email: user.email });
            } else {
                Alert.alert('Error', 'Login failed after registration');
            }
        } else {
            Alert.alert('Error', 'Email or Phone number already exists');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register Account</Text>
            <Input
                value={user.username}
                onChangeText={(text) => setUser({ ...user, username: text })}
                icon='supervised-user-circle'
                placeholder="Username"
            />
            <Input
                value={user.phone}
                onChangeText={(text) => setUser({ ...user, phone: text })}
                placeholder="Phone Number"
                icon='phone'
            />
            <Input
                value={user.email}
                onChangeText={(text) => setUser({ ...user, email: text })}
                placeholder="Email"
                icon='mail'
            />
            <Input
                value={user.password}
                onChangeText={(text) => setUser({ ...user, password: text })}
                placeholder="Password"
                secureTextEntry={true}
                icon='lock'
            />
            <Input
                value={user.confirmPassword}
                onChangeText={(text) => setUser({ ...user, confirmPassword: text })}
                placeholder="Confirm Password"
                secureTextEntry={true}
                icon='lock'
            />
            <Input
                value={user.invitationCode}
                onChangeText={(text) => setUser({ ...user, invitationCode: text })}
                placeholder="Invitation Code"
                icon='code'
            />
            <Input
                value={formatWeight(user.weight)}
                onChangeText={(text) => setUser({ ...user, weight: parseFloat(text) })}
                placeholder="Weight"
                keyboardType="numeric"
                icon='monitor-weight'
            />
            <Input
                value={formatHeight(user.height)}
                icon="height"
                keyboardType="numeric"
                onChangeText={(text) => setUser({ ...user, height: parseFloat(text) })}
            />
            <ButtonSubmit
                title="Sign Up"
                onPress={() => handleLogin()}
            />
            <Text style={{ top: 20 }} onPress={() => navigation.navigate('Login')}>
                Already have an account? <Text style={{ color: 'blue' }}>Login</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
