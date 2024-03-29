import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

import * as Progress from 'react-native-progress';
export interface ESGProfileProps {
  score: number;
}

const ESGProfile = ({ score }: ESGProfileProps) => {
  return (
    <View style={styles.container}>
      {score >= 0 ? (
        <>
          <View>
            {/* rotate */}
            <Progress.Bar
              style={styles.left}
              progress={0}
              width={100}
              color='red'
            />
          </View>
          <View>
            <Progress.Bar style={styles.right} progress={score} width={100} />
          </View>
        </>
      ) : (
        <>
          <View>
            {/* rotate */}
            <Progress.Bar
              style={styles.left}
              progress={-score}
              width={100}
              color='red'
            />
          </View>
          <View>
            <Progress.Bar style={styles.right} progress={0} width={100} />
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  left: {
    borderColor: 'red',
    backgroundColor: 'pink',
    transform: [{ rotate: '180deg' }],
  },
  right: {
    borderColor: 'blue',
    backgroundColor: 'lightblue',
  },
});

export default ESGProfile;
