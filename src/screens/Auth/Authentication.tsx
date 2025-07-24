
import React, { useEffect, useState } from 'react'
import { Alert, Button, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Input } from '../../components/ui/input';
import ButtonSubmit from '../../components/ui/button';
import { isValidEmail } from '../../utils/validation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { users } from '../../data/users';
import { useDispatch } from 'react-redux';
import { login, updateUser } from '../../store/slices/user-slice';
import { loginUser } from './Login';
// import { updatePassword } from '../../api/UserApi';

export const updatePassword = (email: string, newPassword: string): boolean => {
    const user = users.find(user => user.Email === email);
    if (user) {
        user.Password = newPassword;
        return true;
    }
    return false;
};

type PropsVerifyOTP = NativeStackScreenProps<RootStackParamList, 'VerifyOTP'>;
type PropsResetPassword = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;


export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const sendOTP = (email: string) => {
        if (!isValidEmail(email)) {
            Alert.alert('Error', 'Invalid email address');
            return;
        }
        console.log('OTP sent to:', email);
        Alert.alert('Success', 'OTP has been sent to your email');
        navigation.navigate('VerifyOTP', { email });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter your email:</Text>
            <Input
                value={email}
                type="email"
                onChangeText={setEmail}
                placeholder="Email"
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
    const sendOTP = (otp: string) => {
        setTimeout(() => {
            if (!otp) {
                Alert.alert('Erroor', 'Please enter the OTP');
                return;
            }
            Alert.alert('Success', 'OTP has been sent successfully');
            navigation.navigate('ResetPassword', { email });
        }, 3000);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={{ left: 10 }}>{`An OTP has been sent to ${email}`}</Text>
            {/* <Input
                value={otp}
                type="number"
                onChangeText={setOTP}
                placeholder="OTP"
            /> */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                {[...Array(6)].map((_, idx) => (
                    <Input
                        key={idx}
                        value={otp[idx] || ''}
                        type="number"
                        maxLength={1}
                        style={{
                            width: 40,
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
                        ref={(ref: any) => {
                            // @ts-ignore
                            refs[`otpInput${idx}`] = ref;
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

export const ResetPasswordScreen: React.FC<PropsResetPassword> = ({ navigation, route }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [listUser, setListUser] = useState(users);

    const email = route.params.email;
    const dispatch = useDispatch();

    useEffect(() => {
        setListUser(users);
    }, [users]);

    const resetPassword = async () => {
        if (!password || !confirmPassword) {
            Alert.alert('Error', 'Please enter both password fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        Alert.alert('Success', 'Password has been reset');

        //update database 
        const isUpdated = updatePassword(email, password);
        if (!isUpdated) {
            Alert.alert('Error', 'Failed to update password');
            return;
        }
        // const userLogin = loginUser(email, password);
        // if (userLogin) {
        //     Alert.alert('Success', 'Function Login successfully');
        //     dispatch(login(userLogin));
        //     navigation.navigate('Home', { email });
        // }

        // navigation.navigate('Home', { email });

        if (route.name === 'ResetPassword') {
            Alert.alert('Success', 'Password changed successfully');
            // const userLogin = loginUser(email, password);
            // if (userLogin) {
            //     dispatch(login(userLogin));
            //     navigation.navigate('Home', { email });
            // }
            const userLogin = await loginUser(email, password);
            if (userLogin) {
                Alert.alert('Success', 'Function Login successfully');
                dispatch(login(userLogin));
                navigation.navigate('Home', { email });
            }
            navigation.navigate('Home', { email });

        } else if (route.name === 'ChangePassword') {
            Alert.alert('Success', 'Password changed successfully');
            Alert.alert('New password is: ' + password);
            dispatch(updateUser({ Email: email, Password: password }));
            Alert.alert('This is list user: ', JSON.stringify(users));

            navigation.goBack();
        }

        // Alert.alert('Success', 'Password updated successfully');

        // navigation.navigate('Home', { email });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Password</Text>
            <Text style={styles.label}>New Password:</Text>
            <Input
                value={password}
                secureTextEntry
                placeholder="New Password"
                onChangeText={setPassword}
            />
            <Text style={styles.label}>Confirm your new password:</Text>
            <Input
                value={confirmPassword}
                secureTextEntry
                placeholder="Confirm Password"
                onChangeText={setConfirmPassword}
            />
            <ButtonSubmit
                title="Reset Password"
                onPress={resetPassword}
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 50,
    },
    label: {
        marginLeft: 10,
    }
});

export default ForgotPassword;