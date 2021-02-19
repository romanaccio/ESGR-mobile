import React, { useEffect, useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';

import Swiper from 'react-native-deck-swiper';
import { getArticles } from '../services/getData';

function Card({ data }) {
  // console.log(data);
  return (
    <View style={[styles.card]}>
      <Text style={{ fontSize: 20 }}>{data.title}</Text>
      <Text>{data.content}</Text>
    </View>
  );
}

export default function TestScreen() {
  const [cards, setCards] = useState([]);
  const [done, setDone] = useState(false);

  // remote data fetching
  useEffect(() => {
    setCards(getArticles());
  }, []);

  return (
    <View style={styles.container}>
      {cards.length > 0 ? (
        done === false ? (
          <Swiper
            cards={cards}
            renderCard={(card) => {
              return <Card data={card} />;
            }}
            onSwiped={(cardIndex) => {
              console.log(cardIndex);
            }}
            onSwipedAll={() => {
              setDone(true);
              console.log('onSwipedAll');
            }}
            cardIndex={0}
            backgroundColor={'#4FD0E9'}
            stackSize={3}
          ></Swiper>
        ) : (
          <Button
            title='Start over'
            onPress={() => {
              console.log('Start over');
              setCards(getArticles());
              setDone(false);
            }}
          />
        )
      ) : (
        <StatusCard text='Loading...' />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: 'gray',
  },
  cardsText: {
    fontSize: 22,
  },
});
