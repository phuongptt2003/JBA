
import React, { useEffect, useState } from 'react'
import { Alert, Button, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Input } from '../../components/ui/input';
import ButtonSubmit from '../../components/ui/button';
import Label from '../../components/ui/label';
import { isValidEmail } from '../../utils/validation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { users } from '../../data/users';
import { useDispatch } from 'react-redux';
import Title from '../../components/ui/title';
import { User } from '../../models/user';
import { login, updateUser } from '../../store/slices/user-slice';
import { changePassword, getOTP, loginUser, updatePassword, verifyOTP } from '../../api/user-api';

type PropsVerifyOTP = NativeStackScreenProps<RootStackParamList, 'VerifyOTP'>;
type PropsResetPassword = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;
type PropsChangePassword = NativeStackScreenProps<RootStackParamList, 'ChangePassword'>;
type PropsPasswordScreen = PropsResetPassword | PropsChangePassword;


export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const sendOTP = async (email: string) => {
        const sentOTP = await getOTP(email);
        if (!sentOTP) {
            console.log('Failed to send OTP');
            Alert.alert('Error', 'Failed to send OTP');
            return;
        }
        console.log('OTP sent successfully:', sentOTP);
        Alert.alert('Success', 'OTP has been sent to your email');
        navigation.navigate('VerifyOTP', { email });
    }
    return (
        <View style={styles.container}>
            <Label style={styles.label}>Enter your email:</Label>
            <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                icon='email'
            />
            <ButtonSubmit
                onPress={() => {
                    sendOTP(email);
                }}
                title="Send OTP"
            />
        </View>
    )
};

export const VerifyOTP: React.FC<PropsVerifyOTP> = ({ route, navigation }) => {
    const [otp, setOTP] = React.useState('');
    const email = route.params.email;
    const sendOTP = async (otp: string) => {
        const verified = await verifyOTP(email, otp);
        if (!verified) {
            console.log('Failed to verify OTP');
            Alert.alert('Error', 'Failed to verify OTP');
            return;
        }
        console.log('OTP verified successfully:', verified);
        navigation.navigate('ResetPassword', { email });
    };
    return (
        <View style={styles.container}>
            <Title>Verify OTP</Title>
            <Text style={{ left: 10 }}>{`An OTP has been sent to ${email}`}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                {[...Array(6)].map((_, idx) => (
                    <Input
                        key={idx}
                        value={otp[idx] || ''}
                        maxLength={1}
                        style={{
                            width: 50,
                            height: 50,
                            marginHorizontal: 5,
                            textAlign: 'center',
                            fontSize: 24,
                            borderBottomWidth: 2,
                            borderColor: '#aaa',
                            backgroundColor: '#fff',
                        }}
                        onChangeText={text => {
                            let newOtp = otp.split('');
                            newOtp[idx] = text;
                            setOTP(newOtp.join('').slice(0, 6));
                        }}
                        keyboardType="number-pad"
                        autoFocus={idx === 0}
                    />
                ))}
            </View>
            <ButtonSubmit
                onPress={() => sendOTP(otp)}
                title="Send OTP"
            />
        </View>
    );
};

export const ResetPasswordScreen: React.FC<PropsPasswordScreen> = ({ navigation, route }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const email = route.params.email;
    const dispatch = useDispatch();

    const resetPassword = async () => {
        if (!password || !confirmPassword) {
            Alert.alert('Error', 'Please enter both password fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        try {
            console.log('password:', password);
            console.log('confirmPassword:', confirmPassword);
            
            const resetPw = await updatePassword(email, confirmPassword, password);
            if (!resetPw) {
                Alert.alert('Error', 'Failed to reset password');
                return;
            }
            console.log('DEBUG - resetPw:', resetPw);
            console.log('DEBUG - route.name === "ResetPassword":', route.name === 'ResetPassword');
            console.log('DEBUG - route.name === "ChangePassword":', route.name === 'ChangePassword');
            console.log('Password updated successfully');

            if (route.name === 'ResetPassword') {
                const userLogin = await loginUser(email, password, 'web-app-v1');
                // const userLogin = await loginUserMock(email, password)
                if (userLogin) {
                    Alert.alert('Success', 'Password reset successfully. You are now logged in.');
                    dispatch(login(userLogin));
                    navigation.navigate('Home', { email });
                } else {
                    Alert.alert('Error', 'Failed to login with new password');
                }

            } 
        } catch (error) {
            console.error('Error updating password:', error);
            Alert.alert('Error', 'Something went wrong');
        }
    };

    return (
        <View style={styles.container}>
            <Title>Update Password</Title>
            <Label style={styles.label}>New Password:</Label>
            <Input
                value={password}
                secureTextEntry
                placeholder="New Password"
                onChangeText={setPassword}
                icon='lock'
            />
            <Label style={styles.label}>Confirm your new password:</Label>
            <Input
                value={confirmPassword}
                secureTextEntry
                placeholder="Confirm Password"
                onChangeText={setConfirmPassword}
                icon='lock'
            />
            <ButtonSubmit
                title="Reset Password"
                onPress={resetPassword}
            />
        </View>
    );
};


export const ChangePasswordScreen: React.FC<PropsPasswordScreen> = ({ navigation, route }) => {
    const [old, setOld] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const email = route.params.email;
    const dispatch = useDispatch();

    const handleChangePassword = async () => {
        if (!old || !newPassword) {
            Alert.alert('Error', 'Please enter both password fields');
            return;
        }
        
        try {
            console.log('old:', old);
            console.log('newPassword:', newPassword);

            const change = await changePassword(newPassword, old);
            if (!change) {
                Alert.alert('Error', 'Failed to reset password');
                return;
            }
            console.log('DEBUG - change:', change);
            console.log('DEBUG - route.name === "ResetPassword":', route.name === 'ResetPassword');
            console.log('DEBUG - route.name === "ChangePassword":', route.name === 'ChangePassword');
            console.log('Password updated successfully');

            Alert.alert('Success', 'Password changed successfully');
            // dispatch(updateUser({ Email: email, Password: newPassword }));
            navigation.goBack();

        } catch (error) {
            console.error('Error updating password:', error);
            Alert.alert('Error', 'Something went wrong');
        }
    };

    return (
        <View style={styles.container}>
            <Title>Update Password</Title>
            <Label style={styles.label}>Old Password:</Label>
            <Input
                value={old}
                secureTextEntry
                placeholder="Old Password"
                onChangeText={setOld}
                icon='lock'
            />
            <Label style={styles.label}>Confirm your new password:</Label>
            <Input
                value={newPassword}
                secureTextEntry
                placeholder="Confirm Password"
                onChangeText={setNewPassword}
                icon='lock'
            />
            <ButtonSubmit
                title="Reset Password"
                onPress={handleChangePassword}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: '#ebeef5ff',
    },
    label: {
        marginLeft: 10,
    }
});

export default ForgotPassword;