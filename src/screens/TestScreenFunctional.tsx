import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Button, Image, ScrollView, View } from 'react-native';
import { Text } from '../components/Themed';
import CardFace from '../components/CardFace';
import Swiper from 'react-native-deck-swiper';
import { getArticles } from '../services/getData';
import { ArticleInterface } from '../models/Article';
import MyButton, { Direction } from '../components/MyButton';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

interface CardInterface {
  data: ArticleInterface;
}

interface StatusCardInterface {
  text: string;
}

function StatusCard({ text }: StatusCardInterface) {
  return <Text>{text}</Text>;
}
enum SwipeDirection {
  Left,
  Right,
}

export default function TestScreen() {
  const emptyArticles: ArticleInterface[] = [];
  const [cards, setCards] = useState(emptyArticles);
  const [done, setDone] = useState(false);
  const swiperRef = useRef(null);

  // remote data fetching
  useEffect(() => {
    setCards(getArticles());
  }, []);
  const handleSwipe = (direction: SwipeDirection, index: number) => {
    console.log('swipe ' + direction + ' index ' + index);
  };

  return (
    <View style={styles.container}>
      {cards.length > 0 ? (
        done === false ? (
          <>
            <View style={styles.swiper}>
              <Swiper
                ref={swiperRef}
                cards={cards}
                renderCard={(card) => {
                  return <CardFace data={card} />;
                }}
                onSwiped={(cardIndex) => {
                  console.log(cardIndex);
                }}
                onSwipedAll={() => {
                  setDone(true);
                  console.log('onSwipedAll');
                }}
                cardIndex={0}
                backgroundColor={'white'}
                stackSize={3}
                verticalSwipe={false}
                onSwipedLeft={(index) =>
                  handleSwipe(SwipeDirection.Left, index)
                }
                onSwipedRight={(index) =>
                  handleSwipe(SwipeDirection.Right, index)
                }
              ></Swiper>
            </View>
            <View style={styles.buttons}>
              <MyButton handleSwipe={() => swiperRef.swiperLeft()}>
                <Entypo name='cross' size={24} color='red' />
              </MyButton>
              <MyButton handleSwipe={() => swiperRef.swiperRight()}>
                <AntDesign name='heart' size={24} color='blue' />
              </MyButton>
            </View>
          </>
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
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  content: {
    flex: 2,
    position: 'absolute',
    bottom: -4,
    backgroundColor: 'white',
    margin: 5,
    paddingHorizontal: 20,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  swiper: {
    height: '90%',
  },
  buttons: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
