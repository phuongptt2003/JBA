import React from "react";
import { StyleSheet, TextInput, TextInputProps, View, TouchableOpacity } from "react-native";
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
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 4,
  }
});

type InputNumericProps = TextInputProps & {
  icon?: string;
  value: string | number;
  onChangeNumber: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

const InputNumeric = ({
  value,
  onChangeNumber,
  icon,
  min = -Infinity,
  max = Infinity,
  step = 1,
  style,
  ...props
}: InputNumericProps) => {
  const parseNum = (val: string | number) => {
    const n = Number(val);
    return isNaN(n) ? 0 : n;
  };
  const handleIncrease = () => {
    const num = parseNum(value);
    if (num + step <= max) onChangeNumber(num + step);
  };
  const handleDecrease = () => {
    const num = parseNum(value);
    if (num - step >= min) onChangeNumber(num - step);
  };
  return (
    <View style={[styles.container, style]}>
      {icon && <Icon name={icon} size={22} color="gray" />}
      <TextInput
        value={String(value)}
        onChangeText={text => {
          const numeric = text.replace(/[^\d.]/g, '');
          onChangeNumber(Number(numeric));
        }}
        keyboardType="numeric"
        style={styles.input}
        {...props}
      />
      <View style={styles.iconGroup}>
        <TouchableOpacity style={styles.iconButton} onPress={handleIncrease}>
          <Icon name="keyboard-arrow-up" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleDecrease}>
          <Icon name="keyboard-arrow-down" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputNumeric;
