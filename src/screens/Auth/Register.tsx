import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/ui/input';
import ButtonSubmit from '../../components/ui/button';
import { isValidEmail, isValidVietnamesePhone } from '../../utils/validation';
import { RootStackParamList } from '../../navigation/types';
import { User } from '../../models/user';

const RegisterScreen: React.FC = () => {
    const [user, setUser] = React.useState<User>({
        Username: '',
        Password: '',
        PhoneNumber: '',
        Email: '',
        ConfirmPassword: '',
        InvitationCode: ''
    });

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    function handleLogin() {
        console.log('Register button clicked');
        const missingFields = [];
        if (!user.Username) missingFields.push('Username');
        if (!user.PhoneNumber) missingFields.push('Phone Number');
        if (!user.Email) missingFields.push('Email');
        if (!user.Password) missingFields.push('Password');
        if (!user.ConfirmPassword) missingFields.push('Confirm Password');
        

        if (missingFields.length > 0) {
            Alert.alert('Thiếu thông tin', `Vui lòng nhập: ${missingFields.join(', ')}`);
            return;
        }

        if (!isValidEmail(user.Email)) {
            Alert.alert('Lỗi', 'Email không hợp lệ');
            return;
        }

        if (!isValidVietnamesePhone(user.PhoneNumber)) {
            Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
            return;
        }

        if (user.Password !== user.ConfirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
            return;
        }
        if (user.Password === '' || user.ConfirmPassword === '') {
            Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu và xác nhận mật khẩu');
            return;
        }
        Alert.alert('Thành công', 'Đăng ký thành công');
        navigation.navigate('Home', { email: user.Email });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register Account</Text>
            <Input 
                value={user.Username}
                onChangeText={(text) => setUser({ ...user, Username: text })}
                placeholder="Username"
            />
            <Input
                value={user.PhoneNumber}
                onChangeText={(text) => setUser({ ...user, PhoneNumber: text })}
                placeholder="Phone Number"  
            />
            <Input
                value={user.Email}
                onChangeText={(text) => setUser({ ...user, Email: text })}
                placeholder="Email"
            />
            <Input
                value={user.Password}
                onChangeText={(text) => setUser({ ...user, Password: text })}
                placeholder="Password"
                secureTextEntry={true}
            />
            <Input
                value={user.ConfirmPassword}
                onChangeText={(text) => setUser({ ...user, ConfirmPassword: text })}
                placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <Input
                value={user.InvitationCode}
                onChangeText={(text) => setUser({ ...user, InvitationCode: text })}
                placeholder="Invitation Code"
            />
            <ButtonSubmit 
                title="Sign Up"
                onPress={() => handleLogin()}
            />
            <Text style={{top:20}} onPress={()=> navigation.navigate('Login')}>
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
