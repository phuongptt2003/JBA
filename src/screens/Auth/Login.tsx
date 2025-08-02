import React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet, Linking, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isValidEmail } from "../../utils/validation";
import { RootStackParamList } from "../../navigation/types";
import { useDispatch } from "react-redux";
import { loginStore } from "../../store/slices/user-slice";
import ButtonSubmit from "../../components/ui/button";
import { users } from "../../data/users";
import { User } from "../../models/user";
import Input from "../../components/ui/input";
import { Image } from "react-native";
import { loginUser } from "../../api/user-api";

export function LoginScreen(): React.JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const handleClickLogin = async () => {

    try {
      const user = await loginUser("test@example.com", "StrongPassword123", 'web-app-v1');
      // const user = await loginUser("phamphuong090203alele@gmail.com", "123456", 'web-app-v1');
      // const user = await loginUser("ThinhNguyen", "123456", 'web-app-v1');
      if (!user) {
        Alert.alert('Error', 'Email or password is incorrect');
        return;
      }

      dispatch(loginStore(user));
      
      console.log('Login successful:', user);
      // Alert.alert('Success', 'Login successful');
      navigation.navigate('Home', { email });
      
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://play-lh.googleusercontent.com/xWvxp16yYaYlz2PubTrNjDfn8EcKizgDMQzjjDrQaXKJHwC7PKP0hkMJTiGnTJOPhCvo' }}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
      <Text style={styles.title}>Sign In</Text>
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        icon='email'
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        icon='lock'
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
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
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
  },
}
);