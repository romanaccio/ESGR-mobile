import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Image,
  ScrollView,
  View,
  Text,
} from 'react-native';
import CardFace from '../components/CardFace';
import Swiper from 'react-native-deck-swiper';
import { getArticles } from '../services/getData';
import { ArticleInterface } from '../models/Article';
import MyButton from '../components/MyButton';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export interface CardProps {
  card: ArticleInterface;
  nextCard: ArticleInterface;
  handleSwipe(direction: SwipeDirection, card: ArticleInterface): void;
  legend?: string;
  displayButtons?: boolean;
}
export enum SwipeDirection {
  LEFT,
  RIGHT,
}

class CardDeck extends Component<CardProps> {
  swiper: Swiper<ArticleInterface> | null = null;

  onSwipe = (swipeDirection: SwipeDirection, index: number) => {
    const { handleSwipe, card } = this.props;
    if (handleSwipe) handleSwipe(swipeDirection, card);
    //FIXME: either use card on index
  };

  render() {
    const { card, nextCard, legend, displayButtons } = this.props;
    return (
      <>
        <View style={styles.swiper}>
          <Swiper
            ref={(swiper) => {
              this.swiper = swiper;
            }}
            cards={[card, nextCard]}
            renderCard={(card) => {
              return <CardFace data={card} />;
            }}
            onSwiped={(cardIndex) => {
              console.log(cardIndex);
            }}
            onSwipedAll={() => {
              this.setState({ done: true });
              console.log('onSwipedAll');
            }}
            cardIndex={0}
            backgroundColor={'white'}
            stackSize={2}
            verticalSwipe={false}
            onSwipedLeft={(index) => this.onSwipe(SwipeDirection.LEFT, index)}
            onSwipedRight={(index) => this.onSwipe(SwipeDirection.RIGHT, index)}
          ></Swiper>
        </View>
        <View style={styles.buttons}>
          {displayButtons ? (
            <>
              <MyButton
                handleSwipe={() => {
                  if (this.swiper) this.swiper.swipeLeft();
                }}
              >
                <Entypo name='cross' size={24} color='red' />
              </MyButton>
              <Text>{legend ? legend : 'Please swipe'}</Text>
              <MyButton
                handleSwipe={() => {
                  if (this.swiper) this.swiper.swipeRight();
                }}
              >
                <AntDesign name='heart' size={24} color='blue' />
              </MyButton>
            </>
          ) : null}
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  swiper: {
    height: '90%',
  },
  buttons: {
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});

export default CardDeck;
