import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';

interface LabelProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export const Label: React.FC<LabelProps> = ({ children, style }) => {
  return (
    <Text style={[styles.label, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
  },
});

export default Label;
