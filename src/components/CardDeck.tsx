import React, { Component } from 'react';
import { StyleSheet, Button, Image, ScrollView, View } from 'react-native';
import { Text } from '../components/Themed';
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
enum SwipeDirection {
  Left,
  Right,
}

class CardDeck extends Component<CardProps> {
  swiper: Swiper<ArticleInterface> | null = null;

  onSwipe = (swipeDirection: SwipeDirection, index: number) => {
    const { handleSwipe, card } = this.props;
    if (handleSwipe) handleSwipe(swipeDirection, card);
    //FIXME: either use card on index
  };

  render() {
    const { card, nextCard } = this.props;
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
            stackSize={3}
            verticalSwipe={false}
            onSwipedLeft={(index) => this.onSwipe(SwipeDirection.Left, index)}
            onSwipedRight={(index) => this.onSwipe(SwipeDirection.Right, index)}
          ></Swiper>
        </View>
        <View style={styles.buttons}>
          <MyButton
            handleSwipe={() => {
              if (this.swiper) this.swiper.swipeLeft();
            }}
          >
            <Entypo name='cross' size={24} color='red' />
          </MyButton>
          <MyButton
            handleSwipe={() => {
              if (this.swiper) this.swiper.swipeRight();
            }}
          >
            <AntDesign name='heart' size={24} color='blue' />
          </MyButton>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
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

export default CardDeck;
