import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';
import CardFace from '../components/CardFace';
import Swiper from 'react-native-deck-swiper';
import { ArticleInterface } from '../models/Article';
import MyButton from '../components/MyButton';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export interface CardProps {
  cards: ArticleInterface[];
  handleSwipe(direction: SwipeDirection, card: ArticleInterface): void;
  legend?: string;
  displayButtons?: boolean;
  enableSwipe?: boolean;
}
export enum SwipeDirection {
  LEFT,
  RIGHT,
}

class CardDeck extends Component<CardProps> {
  public static defaultProps = {
    legend: '',
    displayButtons: true,
    enableSwipe: true,
  };
  swiper: Swiper<ArticleInterface> | null = null;

  onSwipe = (swipeDirection: SwipeDirection, index: number) => {
    const { handleSwipe, cards } = this.props;
    if (handleSwipe) handleSwipe(swipeDirection, cards[0]);
    //FIXME: either use card on index
  };

  render() {
    const { cards, legend, displayButtons, enableSwipe } = this.props;
    return (
      <View>
        <View style={styles.swiper}>
          <Swiper
            ref={(swiper) => {
              this.swiper = swiper;
            }}
            key={cards[0].id}
            cards={cards}
            renderCard={(card) => {
              return <CardFace data={card} />;
            }}
            onSwipedAll={() => {
              this.setState({ done: true });
              console.log('onSwipedAll');
            }}
            cardIndex={0}
            backgroundColor='white'
            stackSize={2}
            verticalSwipe={false}
            horizontalSwipe={enableSwipe}
            onSwipedLeft={(index) => this.onSwipe(SwipeDirection.LEFT, index)}
            onSwipedRight={(index) => this.onSwipe(SwipeDirection.RIGHT, index)}
            stackSeparation={0}
            stackScale={0}
            stackAnimationFriction={0}
            stackAnimationTension={0}
          ></Swiper>
        </View>
        <View style={styles.buttons}>
          {displayButtons ? (
            <>
              <MyButton
                handleAction={() => {
                  if (this.swiper) this.swiper.swipeLeft();
                }}
              >
                <Entypo name='cross' size={24} color='red' />
              </MyButton>
              <Text>{legend ? legend : 'Please swipe'}</Text>
              <MyButton
                handleAction={() => {
                  if (this.swiper) this.swiper.swipeRight();
                }}
              >
                <AntDesign name='heart' size={24} color='blue' />
              </MyButton>
            </>
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  swiper: {
    alignSelf: 'center',
    height: '90%',
    width: '100%',
  },
  buttons: {
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
});

export default CardDeck;
