import React, { useEffect, useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';

import Swiper from 'react-native-deck-swiper';

function Card({ data }) {
  return (
    <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
      <Text>{data.text}</Text>
    </View>
  );
}

function StatusCard({ text, doSomething }) {
  if (doSomething) doSomething();
  return (
    //   <TouchableOpacity
    //     onPress={() => {
    //       console.log('touch');
    //     }}
    //   >
    //     <Text style={styles.cardsText}>{text}</Text>
    //   </TouchableOpacity>
    <Text style={styles.cardsText}>{text}</Text>
  );
}

export default function TestScreen() {
  const [cards, setCards] = useState([]);
  const [done, setDone] = useState(false);

  const initialCards = [
    { text: 'Tomato', backgroundColor: 'red' },
    { text: 'Aubergine', backgroundColor: 'purple' },
    { text: 'Courgette', backgroundColor: 'green' },
    // { text: 'Blueberry', backgroundColor: 'blue' },
    // { text: 'Umm...', backgroundColor: 'cyan' },
    // { text: 'orange', backgroundColor: 'orange' },
  ];
  // replace with real remote data fetching
  useEffect(() => {
    setTimeout(() => {
      setCards(initialCards);
    }, 1000);
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
              setCards(initialCards);
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
  },
  cardsText: {
    fontSize: 22,
  },
});
