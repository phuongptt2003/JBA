import { StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 5,
    borderRadius: 20,
    width: '90%',
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
