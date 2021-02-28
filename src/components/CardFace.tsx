import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text } from '../components/Themed';

import { ArticleInterface } from '../models/Article';

export interface CardFaceProps {
  data: ArticleInterface;
}

const CardFace = ({ data }: CardFaceProps) => {
  return (
    <View style={[styles.card]}>
      <Image
        style={styles.image}
        source={{
          uri: data.image_url,
        }}
      />
      <View style={[styles.content]}>
        <Text style={styles.cardsTitle}>{data.title}</Text>
        <Text style={styles.cardsText}>{data.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    minWidth: 300,
    minHeight: 420,
    paddingHorizontal: 10,
    alignSelf: 'center',
    top: -20,
  },
  image: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
  cardsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'justify',
    color: 'black',
  },
  cardsText: {
    fontSize: 12,
    textAlign: 'justify',
    color: 'black',
  },
  content: {
    flex: 2,
    position: 'absolute',
    bottom: -4,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginHorizontal: 15,
    paddingHorizontal: 20,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
});
export default CardFace;
