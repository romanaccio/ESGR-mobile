import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface MyButtonInterface {
  handleAction(): void;
}

const MyButton: FunctionComponent<MyButtonInterface> = ({
  handleAction: handleAction,
  children,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAction}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: 'rgb(228,230,233)',
  },
  button: {
    padding: 5,
  },
});

export default MyButton;
