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

const emptyArticles: ArticleInterface[] = [];

export default class TestScreen extends Component {
  swiper: Swiper<ArticleInterface> | null = null;

  state = {
    cards: emptyArticles,
    done: false,
  };

  componentDidMount() {
    this.setState({ cards: getArticles() });
  }

  handleSwipe = (direction: SwipeDirection, index: number) => {
    console.log('swipe ' + direction + ' index ' + index);
  };

  render() {
    const { cards, done } = this.state;
    return (
      <View style={styles.container}>
        {cards.length > 0 ? (
          done === false ? (
            <>
              <View style={styles.swiper}>
                <Swiper
                  ref={(swiper) => {
                    this.swiper = swiper;
                  }}
                  cards={cards}
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
                  onSwipedLeft={(index) =>
                    this.handleSwipe(SwipeDirection.Left, index)
                  }
                  onSwipedRight={(index) =>
                    this.handleSwipe(SwipeDirection.Right, index)
                  }
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
          ) : (
            <Button
              title='Start over'
              onPress={() => {
                console.log('Start over');
                this.setState({
                  cards: getArticles(),
                  done: false,
                });
              }}
            />
          )
        ) : (
          <StatusCard text='Loading...' />
        )}
      </View>
    );
  }
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
