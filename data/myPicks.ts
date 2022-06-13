import _ from 'lodash';
import {createRandomID} from '../utils/id';

interface Goods {
  chasu: number; // 1;
  colorImg: string; // '';
  colorNm: string; // '2호 생기 블러링';
  colorType: string; // '';
  endYn: string; // '';
  goodsAmt: number; // 32000;
  goodsBrand: string; // '웨이크메이크';
  goodsBrandId: number; // 3937;
  goodsCate: string; // '아이팔레트';
  goodsChasuImg: string; // '1_0.jpg';
  goodsNm: string; // '소프트 블러링 아이팔레트';
  goodsNo: number; // 10400;
  personalColor: string; // '여름쿨트루,여름쿨라이트,여름쿨뮤트';
  rgbCd: string; // 'e9b7c2';
  shopId: number; // 10003;
  skinType: string; // '';
}

export interface Pick {
  goods: Goods;
  id: number;
  title: string;
}
type PickWithoutId = Omit<Pick, 'id'>;

const localPick: PickWithoutId = {
  goods: {
    chasu: 1,
    colorImg: '',
    colorNm: '2호 생기 블러링',
    colorType: '',
    endYn: '',
    goodsAmt: 32000,
    goodsBrand: '웨이크메이크',
    goodsBrandId: 3937,
    goodsCate: '아이팔레트',
    goodsChasuImg: '1_0.jpg',
    goodsNm: '소프트 블러링 아이팔레트',
    goodsNo: 10400,
    personalColor: '여름쿨트루,여름쿨라이트,여름쿨뮤트',
    rgbCd: 'e9b7c2',
    shopId: 10003,
    skinType: '',
  },
  title: '👝\n파우치에\n없으면 불안한',
};
export const picks = _.range(0, 10).map(() => ({
  ...localPick,
  id: createRandomID(),
}));
