import _ from 'lodash';

interface Feed {
  id: number; // 17519;
  section: number; // 0;
  categ: string; // 'I';
  userId: number; // 1000000256;
  likes: number; // 0;
  comments: number; // 0;
  parts: number; // 0;
  title: string; // '';
  note: string; // '냐냔ㅁ냠냠';
  thumbnails?: string | null; // '["17519/TH_0.JPG"]';
  images?: string | null; // '["17519/0.JPG"]';
  imageSizes?: string | null; // '[[899, 900]]';
  video?: string | null; // null;
  votes?: number | null; // null;
  votesResult?: string | null; // null;
  isOpen: string; // '1';
  isModify: string; // '0';
  updDatm: string; // '2022-06-03 17:28:03';
  useYn: string; // 'Y';
  hashtags: string; // '[]';
  goods: string; // '[]';
}

export interface ZamFeed {
  feed: Feed;
  nickname: string; // '보틀친구곽튭';
  likeMe?: number | null;
  voteMe?: number | null;
  imageUris?: {uri: string}[] | null; // 'https://d1sjhoa769f1sq.cloudfront.net/qa_user_feeds/17519/0.JPG'
  cosmetics: {id: {shopId: number; goodsNo: number; option: number}}[];
  // [
  //   {id: {shopId: 10004, goodsNo: 74126, option: 0}},
  //   {id: {shopId: 10004, goodsNo: 90232, option: 0}},
  // ],
}

type FeedWithoutId = Omit<Feed, 'id'>;
type ZamFeedWithoutId =
  | Omit<ZamFeed, 'feed'> & {
      feed: FeedWithoutId;
    };

export const localFeeds: ZamFeedWithoutId[] = [
  {
    feed: {
      section: 0,
      categ: 'I',
      userId: 1000000256,
      likes: 0,
      comments: 0,
      parts: 0,
      title: '',
      note: '냐냔ㅁ냠냠',
      thumbnails: '["17519/TH_0.JPG"]',
      images: '["17519/0.JPG"]',
      imageSizes: '[[899, 900]]',
      video: null,
      votes: null,
      votesResult: null,
      isOpen: '1',
      isModify: '0',
      updDatm: '2022-06-03 17:28:03',
      useYn: 'Y',
      hashtags: '[]',
      goods: '[]',
    },
    likeMe: null,
    voteMe: null,
    nickname: '보틀친구곽튭',
    imageUris: [
      {uri: 'https://d1sjhoa769f1sq.cloudfront.net/qa_user_feeds/17519/0.JPG'},
    ],
    cosmetics: [],
  },
  {
    feed: {
      section: 0,
      categ: 'I',
      userId: 1000000256,
      likes: 2,
      comments: 3,
      parts: 0,
      title: '',
      note: '테스트 !',
      thumbnails: '["17517/TH_0.JPG"]',
      images: '["17517/0.JPG"]',
      imageSizes: '[[409, 408]]',
      video: null,
      votes: null,
      votesResult: null,
      isOpen: '1',
      isModify: '0',
      updDatm: '2022-05-26 16:27:05',
      useYn: 'Y',
      hashtags: '[]',
      goods: '["10004_74126_0", "10004_90232_0"]',
    },
    likeMe: 17517,
    voteMe: null,
    nickname: '보틀친구곽튭',
    imageUris: [
      {uri: 'https://d1sjhoa769f1sq.cloudfront.net/qa_user_feeds/17517/0.JPG'},
    ],
    cosmetics: [
      {id: {shopId: 10004, goodsNo: 74126, option: 0}},
      {id: {shopId: 10004, goodsNo: 90232, option: 0}},
    ],
  },
  {
    feed: {
      section: 0,
      categ: 'I',
      userId: 1000000256,
      likes: 0,
      comments: 0,
      parts: 0,
      title: '',
      note: 'ㅅㄷㄴㅁㅅㄷㄴㅅㄷㅁㄴㅅㅁㄷㄴㅅㅁㄷㄴㅅㄷㄴㅁㅆㄷㄴㅁ',
      thumbnails: '["17513/TH_0.JPG"]',
      images: '["17513/0.JPG"]',
      imageSizes: '[[900, 899]]',
      video: null,
      votes: null,
      votesResult: null,
      isOpen: '1',
      isModify: '0',
      updDatm: '2022-05-25 10:28:30',
      useYn: 'Y',
      hashtags: '[]',
      goods: '["10004_86886_0"]',
    },
    likeMe: null,
    voteMe: null,
    nickname: '보틀친구곽튭',
    imageUris: [
      {uri: 'https://d1sjhoa769f1sq.cloudfront.net/qa_user_feeds/17513/0.JPG'},
    ],
    cosmetics: [{id: {shopId: 10004, goodsNo: 86886, option: 0}}],
  },
  {
    feed: {
      section: 0,
      categ: 'I',
      userId: 1000000256,
      likes: 0,
      comments: 0,
      parts: 0,
      title: '',
      note: 'ㅅㄷㄴㅁㅅㄴㄷㅅㄷㅁㄴㅅㄷㄴㅁㅅㄷㄴㅁㅅㄷㄴㅁㅅㄷㄴㅁㅅㄷㅁㄴㅅㄷㅁㄴㅅㄷ',
      thumbnails: '["17512/TH_0.JPG"]',
      images: '["17512/0.JPG"]',
      imageSizes: '[[899, 900]]',
      video: null,
      votes: null,
      votesResult: null,
      isOpen: '1',
      isModify: '0',
      updDatm: '2022-05-25 10:24:27',
      useYn: 'Y',
      hashtags: '[]',
      goods: '["10004_90594_0", "10003_2849_0", "10004_105319_0"]',
    },
    likeMe: null,
    voteMe: null,
    nickname: '보틀친구곽튭',
    imageUris: [
      {uri: 'https://d1sjhoa769f1sq.cloudfront.net/qa_user_feeds/17512/0.JPG'},
    ],
    cosmetics: [
      {id: {shopId: 10004, goodsNo: 90594, option: 0}},
      {id: {shopId: 10003, goodsNo: 2849, option: 0}},
      {id: {shopId: 10004, goodsNo: 105319, option: 0}},
    ],
  },
  {
    feed: {
      section: 0,
      categ: 'I',
      userId: 1000000256,
      likes: 0,
      comments: 0,
      parts: 0,
      title: '',
      note: 'Testatdsafdsaf12312321312',
      thumbnails: '["17479/TH_0.JPG"]',
      images: '["17479/0.JPG"]',
      imageSizes: '[[900, 899]]',
      video: null,
      votes: null,
      votesResult: null,
      isOpen: '1',
      isModify: '1',
      updDatm: '2022-05-18 11:00:20',
      useYn: 'Y',
      hashtags: '[]',
      goods: '["10004_1778_1"]',
    },
    likeMe: null,
    voteMe: null,
    nickname: '보틀친구곽튭',
    imageUris: [
      {uri: 'https://d1sjhoa769f1sq.cloudfront.net/qa_user_feeds/17479/0.JPG'},
    ],
    cosmetics: [{id: {shopId: 10004, goodsNo: 1778, option: 1}}],
  },
  // 질문글?
  {
    feed: {
      section: 5,
      categ: 'T',
      userId: 1000000256,
      likes: 1,
      comments: 1,
      parts: 0,
      title: '',
      note: 'ㅅㄷㄴㅅㄷㄴㅅㄷㄴㅅㄴㄷㅅㄷㄴㅅㄷㄴㅅ',
      thumbnails: null,
      images: null,
      imageSizes: null,
      video: null,
      votes: null,
      votesResult: null,
      isOpen: '1',
      isModify: '0',
      updDatm: '2022-05-18 11:00:20',
      useYn: 'Y',
      hashtags: '[]',
      goods: '["10003_2747_0", "10003_26396_0"]',
    },
    likeMe: null,
    voteMe: null,
    nickname: '보틀친구곽튭',
    imageUris: null,
    cosmetics: [
      {id: {shopId: 10003, goodsNo: 2747, option: 0}},
      {id: {shopId: 10003, goodsNo: 26396, option: 0}},
    ],
  },
];

export const zamFeedsWithoutId = _.cloneDeep([...localFeeds, ...localFeeds]);
