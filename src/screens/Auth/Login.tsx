import React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet, Linking, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isValidEmail } from "../../utils/validation";
import { RootStackParamList } from "../../navigation/types";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/user-slice";
import ButtonSubmit from "../../components/ui/button";
import { users } from "../../data/users";
import { User } from "../../models/user";
// import { loginUser } from "../../api/UserApi";

export const loginUser = (email: string, password: string): User | null => {
  const user = users.find(u => u.Email === email && u.Password === password);
  return user || null;
}
export function LoginScreen(): React.JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();


  const handleClickLogin = async () => {
    try {
      Alert.alert('This is list of users', JSON.stringify(users, null, 2));
      const user = await loginUser("pp@gmail.com", "123");
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
      {/* <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
      /> */}
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

export const Input = ({
  value,
  onChangeText,
  placeholder,
  style,
  secureTextEntry = false,
  ...props
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
  secureTextEntry?: boolean;
  [key: string]: any;
}) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    style={[styles.input, style]}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    {...props}
  />
);