
import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';

interface TitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export const Title: React.FC<TitleProps> = ({ children, style }) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
   
  },
});

export default Title;
