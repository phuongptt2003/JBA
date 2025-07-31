import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/ui/input';
import ButtonSubmit from '../../components/ui/button';
import { formatHeight, formatWeight, isValidEmail, isValidVietnamesePhone } from '../../utils/validation';
import { RootStackParamList } from '../../navigation/types';
import { User } from '../../models/user';
import { registerUser } from '../../api/user-api';
import { useDispatch } from 'react-redux';
import { loginUser } from './Login';
import { login } from '../../store/slices/user-slice';

const RegisterScreen: React.FC = () => {
    const [user, setUser] = React.useState<User>({
        Id: '',
        Username: '',
        Password: '',
        PhoneNumber: '',
        Email: '',
        ConfirmPassword: '',
        InvitationCode: '',
        Weight: 0,
        Height: 0
    });

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        console.log('Register button clicked');
        const missingFields = [];
        if (!user.Username) missingFields.push('Username');
        if (!user.PhoneNumber) missingFields.push('Phone Number');
        if (!user.Email) missingFields.push('Email');
        if (!user.Password) missingFields.push('Password');
        if (!user.ConfirmPassword) missingFields.push('Confirm Password');
        // if (!user.InvitationCode) missingFields.push('Invitation Code');
        if (user.Weight <= 0) missingFields.push('Weight');
        if (user.Height <= 0) missingFields.push('Height');

        if (missingFields.length > 0) {
            Alert.alert('Missing Information', `Please enter: ${missingFields.join(', ')}`);
            return;
        }

        if (!isValidEmail(user.Email)) {
            Alert.alert('Error', 'Invalid email');
            return;
        }

        if (!isValidVietnamesePhone(user.PhoneNumber)) {
            Alert.alert('Error', 'Invalid phone number');
            return;
        }

        if (user.Password !== user.ConfirmPassword) {
            Alert.alert('Error', 'Password confirmation does not match');
            return;
        }
        if (user.Password === '' || user.ConfirmPassword === '') {
            Alert.alert('Error', 'Please enter password and confirm password');
            return;
        }
        // if (user.InvitationCode === '') {
        //     Alert.alert('Error', 'Please enter an invitation code');
        //     return;
        // }
        if (user.Weight <= 0 || user.Height <= 0) {
            Alert.alert('Error', 'Please enter valid weight and height');
            return;
        }

        const isRegistered = await registerUser(user.Email, user.Password, user.Username, user.PhoneNumber, user.Role, user.OptionEmail, user.Address, user.InvitationCode);
        if (isRegistered) {
            Alert.alert('Success', 'Registration successful');
            const userLogin = await loginUser(user.Email, user.Password);
            if (userLogin) {
                dispatch(login(userLogin));
                navigation.navigate('Home', { email: user.Email });
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
                value={user.Username}
                onChangeText={(text) => setUser({ ...user, Username: text })}
                icon='supervised-user-circle'
                placeholder="Username"
            />
            <Input
                value={user.PhoneNumber}
                onChangeText={(text) => setUser({ ...user, PhoneNumber: text })}
                placeholder="Phone Number"
                icon='phone'
            />
            <Input
                value={user.Email}
                onChangeText={(text) => setUser({ ...user, Email: text })}
                placeholder="Email"
                icon='mail'
            />
            <Input
                value={user.Password}
                onChangeText={(text) => setUser({ ...user, Password: text })}
                placeholder="Password"
                secureTextEntry={true}
                icon='lock'
            />
            <Input
                value={user.ConfirmPassword}
                onChangeText={(text) => setUser({ ...user, ConfirmPassword: text })}
                placeholder="Confirm Password"
                secureTextEntry={true}
                icon='lock'
            />
            <Input
                value={user.InvitationCode}
                onChangeText={(text) => setUser({ ...user, InvitationCode: text })}
                placeholder="Invitation Code"
                icon='code'
            />
            <Input
                value={formatWeight(user.Weight)}
                onChangeText={(text) => setUser({ ...user, Weight: parseFloat(text) })}
                placeholder="Weight"
                keyboardType="numeric"
                icon='monitor-weight'
            />
            <Input
                value={formatHeight(user.Height)}
                icon="height"
                keyboardType="numeric"
                onChangeText={(text) => setUser({ ...user, Height: parseFloat(text) })}
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
