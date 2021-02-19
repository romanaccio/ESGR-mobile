import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface MyButtonInterface {
  handleSwipe(): void;
}

const MyButton: FunctionComponent<MyButtonInterface> = ({
  handleSwipe,
  children,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleSwipe}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default MyButton;
