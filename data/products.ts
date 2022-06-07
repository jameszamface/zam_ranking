export interface Product {
  id: number;
  rank: number;
  brand: string;
  tags?: string[];
  description: string;
  liked: boolean;
  color: {
    string: string;
    number: string;
    description: string;
  };
  image: string;
  isNew: boolean;
  type: {
    name: string;
    detail: string;
  };
  season?: string;
  youtubers: number;
}

export type ProductWithoutId = Omit<Product, 'id'>;

export const products: ProductWithoutId[] = [
  {
    rank: 1,
    brand: '브랜드1',
    tags: ['블랜딩', '무드'],
    description: '차크',
    liked: false,
    color: {
      string: '#ff0000',
      number: '12',
      description: '날씨요정등극해',
    },
    image: 'https://loremflickr.com/320/240?random=1',
    isNew: true,
    type: {
      name: '립',
      detail: '립틴트/립글로스',
    },
    season: '봄 웜 트루',
    youtubers: 100,
  },
  {
    rank: 2,
    brand: '브랜드1',
    tags: ['블랜딩', '무드'],
    description: '차크',
    liked: false,
    color: {
      string: '#ff0000',
      number: '12',
      description: '날씨요정등극해',
    },
    image: 'https://loremflickr.com/320/240?random=1',
    isNew: true,
    type: {
      name: '립',
      detail: '립스틱/컬러립밤',
    },
    season: '봄 웜 트루',
    youtubers: 100,
  },
  {
    rank: 3,
    brand: '브랜드1',
    tags: ['블랜딩', '무드'],
    description: '차크',
    liked: false,
    color: {
      string: '#ff0000',
      number: '12',
      description: '날씨요정등극해',
    },
    image: 'https://loremflickr.com/320/240?random=1',
    isNew: true,
    type: {
      name: '아이',
      detail: '아이섀도우',
    },
    season: '봄 웜 트루',
    youtubers: 100,
  },
  {
    rank: 4,
    brand: '브랜드1',
    tags: ['블랜딩', '무드'],
    description: '차크',
    liked: false,
    color: {
      string: '#ff0000',
      number: '12',
      description: '날씨요정등극해',
    },
    image: 'https://loremflickr.com/320/240?random=1',
    isNew: true,
    type: {
      name: '아이',
      detail: '아이섀도우',
    },
    season: '봄 웜 트루',
    youtubers: 100,
  },
  {
    rank: 5,
    brand: '브랜드1',
    tags: ['블랜딩', '무드'],
    description: '차크',
    liked: false,
    color: {
      string: '#ff0000',
      number: '12',
      description: '날씨요정등극해',
    },
    image: 'https://loremflickr.com/320/240?random=1',
    isNew: true,
    type: {
      name: '립',
      detail: '립틴트/립글로스',
    },
    season: '봄 웜 트루',
    youtubers: 100,
  },
  {
    rank: 6,
    brand: '브랜드1',
    tags: ['블랜딩', '무드'],
    description: '차크',
    liked: false,
    color: {
      string: '#ff0000',
      number: '12',
      description: '날씨요정등극해',
    },
    image: 'https://loremflickr.com/320/240?random=1',
    isNew: true,
    type: {
      name: '립',
      detail: '립틴트/립글로스',
    },
    season: '봄 웜 트루',
    youtubers: 100,
  },
  {
    rank: 7,
    brand: '브랜드1',
    tags: ['블랜딩', '무드'],
    description: '차크',
    liked: false,
    color: {
      string: '#ff0000',
      number: '12',
      description: '날씨요정등극해',
    },
    image: 'https://loremflickr.com/320/240?random=1',
    isNew: true,
    type: {
      name: '립',
      detail: '립틴트/립글로스',
    },
    season: '봄 웜 트루',
    youtubers: 100,
  },
  {
    rank: 8,
    brand: '브랜드1',
    tags: ['블랜딩', '무드'],
    description: '차크',
    liked: false,
    color: {
      string: '#ff0000',
      number: '12',
      description: '날씨요정등극해',
    },
    image: 'https://loremflickr.com/320/240?random=1',
    isNew: true,
    type: {
      name: '립',
      detail: '립틴트/립글로스',
    },
    season: '봄 웜 트루',
    youtubers: 100,
  },
  {
    rank: 9,
    brand: '브랜드1',
    tags: ['블랜딩', '무드'],
    description: '차크',
    liked: false,
    color: {
      string: '#ff0000',
      number: '12',
      description: '날씨요정등극해',
    },
    image: 'https://loremflickr.com/320/240?random=1',
    isNew: true,
    type: {
      name: '립',
      detail: '립틴트/립글로스',
    },
    season: '봄 웜 트루',
    youtubers: 100,
  },
  {
    rank: 10,
    brand: '브랜드1',
    tags: ['블랜딩', '무드'],
    description: '차크',
    liked: false,
    color: {
      string: '#ff0000',
      number: '12',
      description: '날씨요정등극해',
    },
    image: 'https://loremflickr.com/320/240?random=1',
    isNew: true,
    type: {
      name: '립',
      detail: '립틴트/립글로스',
    },
    season: '봄 웜 트루',
    youtubers: 100,
  },
  {
    rank: 11,
    brand: '브랜드1',
    tags: ['블랜딩', '무드'],
    description: '차크',
    liked: false,
    color: {
      string: '#ff0000',
      number: '12',
      description: '날씨요정등극해',
    },
    image: 'https://loremflickr.com/320/240?random=1',
    isNew: true,
    type: {
      name: '립',
      detail: '립틴트/립글로스',
    },
    season: '봄 웜 트루',
    youtubers: 100,
  },
];
