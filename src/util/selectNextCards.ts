import { ArticleInterface, defaultArticle } from '../models/Article';
import { calculateScore } from './calculateScore';

type NextCards = {
  card: ArticleInterface;
  nextCard: ArticleInterface;
  nextNextCardIfLeft: ArticleInterface;
  nextNextCardIfRight: ArticleInterface;
};

export const initialNextCards: NextCards = {
  card: defaultArticle,
  nextCard: defaultArticle,
  nextNextCardIfLeft: defaultArticle,
  nextNextCardIfRight: defaultArticle,
};

const getMaximizedCard = (
  cards: ArticleInterface[],
  currentScore: number
): number => {
  if (cards.length === 0) return -1;

  let indexOfMax = 0;
  let maxChoice = 0;

  cards.forEach((card, index) => {
    const choice = 2 * card.quality + Math.abs(card.grade - currentScore);
    if (choice > maxChoice) {
      maxChoice = choice;
      indexOfMax = index;
    }
  });
  return indexOfMax;
};

export const selectNextCards = (
  selectNextCards: ArticleInterface[],
  remainingCards: ArticleInterface[],
  currentNextCards: NextCards | null
): NextCards => {
  const localSelectedCards = [...selectNextCards];
  const localRemainingCards = [...remainingCards];
  let firstCard = defaultArticle;
  let secondCard = defaultArticle;
  let thirdCardIfLeft = defaultArticle;
  let thirdCardIfRight = defaultArticle;

  if (currentNextCards !== null) {
    console.log('currentNextCards is not null');
    firstCard = currentNextCards.nextCard;
    if (currentNextCards.card.choice === -1) {
      console.log('last card was swiped left');
      secondCard = currentNextCards.nextNextCardIfLeft;
    } else {
      console.log('last card was swiped right');

      secondCard = currentNextCards.nextNextCardIfRight;
    }
    // remove firstCard and secondCard from localRemainingCards and add them to localSelectedCards
    const firstCardIndex = localRemainingCards.findIndex(
      (card) => card.id === firstCard.id
    );
    console.log('firstCardIndex=' + firstCardIndex);
    if (firstCardIndex > -1) {
      console.log('removing fist card from localRemainingCards');
      localRemainingCards.splice(firstCardIndex, 1);
    }
    const secondCardIndex = localRemainingCards.findIndex(
      (card) => card.id === secondCard.id
    );
    console.log('secondCardIndex=' + secondCardIndex);

    if (secondCardIndex > -1) {
      console.log('removing second card from localRemainingCards');

      localRemainingCards.splice(secondCardIndex, 1);
    }
    localSelectedCards.push(firstCard);
    localSelectedCards.push(secondCard);
  } else {
    console.log('currentNextCards is null');

    const currentScore = calculateScore(localSelectedCards);
    const firstCardIndex = getMaximizedCard(localRemainingCards, currentScore);
    let secondCardIndex = -1;
    if (firstCardIndex > -1) {
      console.log('found first card');

      firstCard = localRemainingCards[firstCardIndex];
      localRemainingCards.splice(firstCardIndex, 1);
      localSelectedCards.push(firstCard);
      const newScore = calculateScore(localSelectedCards);
      secondCardIndex = getMaximizedCard(localRemainingCards, newScore);
      if (secondCardIndex > -1) {
        console.log('found second card');

        secondCard = localRemainingCards[secondCardIndex];
        // remove second card from localRemainingCards
        localRemainingCards.splice(secondCardIndex, 1);
      }
    }
  }
  // determine score if first cards is swiped left
  firstCard.choice = -1;
  const leftChoiceScore = calculateScore(localSelectedCards);

  // determine score if first card is swiped right
  firstCard.choice = 1;
  const rightChoiceScore = calculateScore(localSelectedCards);

  // reset firstCard.choice to zero
  firstCard.choice = 0;

  // look for third card
  const thirdCardLeftIndex = getMaximizedCard(
    localRemainingCards,
    leftChoiceScore
  );
  if (thirdCardLeftIndex > -1) {
    console.log('found third card left');
    thirdCardIfLeft = localRemainingCards[thirdCardLeftIndex];
  }
  const thirdCardRightIndex = getMaximizedCard(
    localRemainingCards,
    rightChoiceScore
  );
  if (thirdCardRightIndex > -1) {
    console.log('found third card right');

    thirdCardIfRight = localRemainingCards[thirdCardRightIndex];
  }

  return {
    card: firstCard,
    nextCard: secondCard,
    nextNextCardIfLeft: thirdCardIfLeft,
    nextNextCardIfRight: thirdCardIfRight,
  };
};
