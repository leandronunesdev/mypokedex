import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        style={{ opacity: 1 }}
        animating={true}
        size='large'
        color='black'
      />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 200,
    alignItems: 'center',
    height: '100%',
  },
  loadingText: {
    paddingTop: 25,
  },
});

export default LoadingComponent;
