import { ArticleInterface } from '../models/Article';

export const calculateScore = (selectedCards: ArticleInterface[]) => {
  const lambda = 0.95;
  // console.log('lambda = ' + lambda);
  let score = 0;
  const n = selectedCards.length;
  if (n > 0)
    score =
      selectedCards.reduce(
        (accumulator, currentValue, index) =>
          accumulator +
          currentValue.grade *
            currentValue.choice *
            Math.pow(lambda, n - 1 - index),
        0
      ) /
      selectedCards.reduce(
        (accumulator, currentValue, index) =>
          accumulator +
          Math.abs(
            currentValue.grade *
              currentValue.choice *
              Math.pow(lambda, n - 1 - index)
          ),
        0
      );
  return score;
};
