import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity } from '../components/Themed';

import SwipeCards from 'react-native-swipe-cards-deck';

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

  // replace with real remote data fetching
  useEffect(() => {
    setTimeout(() => {
      setCards([
        { text: 'Tomato', backgroundColor: 'red' },
        { text: 'Aubergine', backgroundColor: 'purple' },
        { text: 'Courgette', backgroundColor: 'green' },
        // { text: 'Blueberry', backgroundColor: 'blue' },
        // { text: 'Umm...', backgroundColor: 'cyan' },
        // { text: 'orange', backgroundColor: 'orange' },
      ]);
    }, 1000);
  }, []);

  function handleYup(card) {
    console.log(`Yup for ${card.text}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Nope for ${card.text}`);
    return true;
  }
  function handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
    return true;
  }

  return (
    <View style={styles.container}>
      {cards ? (
        <SwipeCards
          cards={cards}
          renderCard={(cardData) => <Card data={cardData} />}
          keyExtractor={(cardData) => String(cardData.text)}
          renderNoMoreCards={() => {
            return (
              <StatusCard
                text='No more cards...'
                doSomething={() => setDone(true)}
              />
            );
          }}
          handleYup={handleYup}
          handleNope={handleNope}
          handleMaybe={handleMaybe}
          hasMaybeAction={false}
          // If you want a stack of cards instead of one-per-one view, activate stack mode
          stack={true}
          stackDepth={2}
        />
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
