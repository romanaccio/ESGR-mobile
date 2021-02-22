import { ArticleInterface, defaultArticle } from '../models/Article';

type NextPair = {
  card: ArticleInterface;
  nextCard: ArticleInterface;
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
  cards: ArticleInterface[],
  currentScore: number
): NextPair => {
  const databaseCards = [...cards];
  let firstCard = defaultArticle;
  let secondCard = defaultArticle;
  const firstCardIndex = getMaximizedCard(databaseCards, currentScore);
  let secondCardIndex = -1;
  if (firstCardIndex > -1) {
    firstCard = databaseCards[firstCardIndex];
    databaseCards.splice(firstCardIndex, 1);
    secondCardIndex = getMaximizedCard(databaseCards, currentScore);
    if (secondCardIndex > -1) secondCard = databaseCards[secondCardIndex];
  }
  return { card: firstCard, nextCard: secondCard };
};
