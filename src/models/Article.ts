// import cardBack from '../img/card_back.png';
export interface ArticleInterface {
  id: number;
  image_url: string;
  title: string;
  content: string;
  grade: number;
  choice: number;
  quality: number;
  timestamp?: number;
  calculatedScore?: number;
}

export const defaultArticle: ArticleInterface = {
  id: 0,
  image_url: 'https://gallica.bnf.fr/ark:/12148/btv1b10509986j/f1.highres',
  title: 'You have reviewed all the articles',
  content: 'Please check your score below',
  grade: 0,
  choice: 0,
  quality: 1,
};

export const articlesToReport = (articles: ArticleInterface[]) => {
  return articles.map(({ id, timestamp, calculatedScore }) => ({
    id,
    timestamp,
    calculatedScore,
  }));
};
