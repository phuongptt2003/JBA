import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet, Linking, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ButtonSubmit } from "../components/ui/button";
import { isValidEmail } from "../utils/validation";
import { RootStackParamList } from "../navigation/types";
import { Input } from "../components/ui/input";
import { loginUser } from "../api/UserApi";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";

export function LoginScreen(): React.JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  // const handleClickLogin = () => {
  //   // const dispatch = useDispatch();
  //   if (!email || !password) {
  //     Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu');
  //     return;
  //   }

  //   if (!isValidEmail(email)) {
  //     Alert.alert('Lỗi', 'Email không hợp lệ');
  //     return;
  //   }

  //   const user = loginUser(email, password);
  //   console.log(user);
  //   if (user === null) {
  //     Alert.alert('Error', 'Email or password is incorrect');
  //     return;
  //   }
  //   dispatch({ type: 'SET_USER', payload: user });
  //   Alert.alert('Thành công', 'Đăng nhập thành công');
  //   navigation.navigate('Home', { email });
  // }

  const handleClickLogin = async () => {
    try {
      const user = await loginUser(email, password);
      if (!user) {
        Alert.alert('Error', 'Email or password is incorrect');
        return;
      }

      dispatch(login(user)); 
      Alert.alert('Success', 'Login successful');
      navigation.navigate('Home', { email }); 
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error(error);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Input
        value={email}
        type="email"
        onChangeText={setEmail}
        placeholder="Email"
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={{ alignItems: 'flex-end', width: '90%' }}>
        <Text style={styles.linkText} onPress={() => { navigation.navigate('ForgotPassword') }}>Forgot Password?</Text>
      </View>
      <ButtonSubmit
        onPress={handleClickLogin}
        title="Login"
      />

      <View style={{ alignItems: 'center', top: 50 }}>
        <Text onPress={() => { navigation.navigate('Register') }}>Don't have account?<Text style={styles.linkText}> Register</Text></Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#c1d1f6ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 5,
    borderRadius: 20,
    width: '90%',
  },
  button: {
    top: 20,
    backgroundColor: 'lightpink',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 20,
    width: '90%',
  },
  icon: {
    marginRight: 8,
  },
  linkText: {
    right: 0,
    color: 'blue',
    textDecorationLine: 'underline',
  },
}
);

