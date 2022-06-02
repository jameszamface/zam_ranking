export const seasons = ['봄 웜 트루', '봄 웜 브라이트', '여름 쿨 라이트'];

export const types = [
  {
    name: '립',
    details: ['립틴트/립글로스', '립스틱/컬러립밤'],
  },
  {
    name: '아이',
    details: ['아이섀도우', '아이라이너/아이브로우'],
  },
  {
    name: '페이스',
    details: ['쿠션/파운데이션', '베이스/프라이머/컨실러'],
  },
];

export interface Category {
  image: string;
  color: string;
  name: string;
  types: {
    name: string;
    details: string[];
  }[];
  seasons?: string[];
}

export const categories: Category[] = [
  {
    image: 'https://loremflickr.com/320/240?random=1',
    color: '#ff2200',
    name: '퍼스널컬러',
    seasons,
    types,
  },
  {
    image: 'https://loremflickr.com/320/240?random=2',
    color: '#ff00ff',
    name: '신제품',
    types,
  },
];
