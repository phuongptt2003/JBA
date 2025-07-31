import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    marginTop: 5,
    height: 45,
    width: '90%',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
  },
}
);


type InputProps = TextInputProps & {
  icon?: string;
};

export const Input = ({
  value,
  onChangeText,
  placeholder,
  style,
  secureTextEntry = false,
  icon,
  ...props
}: InputProps) => (
  <View style={[styles.container, style]}>
    {icon && <Icon name={icon} size={22} color="gray" />}
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      {...props}
    />
  </View>
);


export default Input;