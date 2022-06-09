export interface WatchedCosmetic {
  endYn: string; // 'S';
  goodsAmt: number; // 32000;
  goodsBrand: string; // '엠퀴리';
  goodsBrandId: number; // 3704;
  goodsCate: string; // '선스틱';
  goodsCnt: number; // 28;
  goodsNm: string; // '코어 선 스틱';
  goodsNo: number; // 31884;
  likes: number; // 4;
  shopId: number; // 10003;
  useYn: string; // 'Y';
}

export interface LinkedCosmetic {
  C00: number; // 1000000256;
  C01: number; // 10003;
  C02: number; // 10400;
  C03: string; // '소프트 블러링 아이팔레트';
  C04: string; // 'https://d1sjhoa769f1sq.cloudfront.net/prodimg256/00/1000310400.jpg';
  C05: string; // '웨이크메이크';
  C06: number; // 1;
  chasu: number; // 1;
  chasuImg: string; // 'Y';
  chasuNm: string; // '2호 생기 블러링';
  colorImg: string; // '';
  folder: number; // 0;
  goodsAmt: number; // 32000;
  goodsBrandId: number; // 3937;
  goodsChasuImg?: string | null; // '1_0.jpg';
  movCnt: number; // 165;
  rgbCd: string; // 'e9b7c2';
}

export interface Video {
  C00: number; // 1000000256;
  C01: number; // 11253;
  C02: number; // 10161;
  C03: string; // '노아이라인‼️맑고 청순한 쿨톤 핑크 메이크업💓| 화보 촬영 GRWM';
  C04: number; // 0;
  C05: number; // 0;
  C06: string; // 'eOBUOHy9cG4';
  C07: string; // '김크리스탈KimCrystal';
  C08: number; // 26420;
}

export interface Activities {
  watchedCosmetics: WatchedCosmetic[];
  watchedVideos: Video[];
  scrapVideos: Video[];
  likedCosmetics: LinkedCosmetic[];
}

export const activities: Activities = {
  watchedCosmetics: [
    {
      endYn: 'S',
      goodsAmt: 32000,
      goodsBrand: '엠퀴리',
      goodsBrandId: 3704,
      goodsCate: '선스틱',
      goodsCnt: 28,
      goodsNm: '코어 선 스틱',
      goodsNo: 31884,
      likes: 4,
      shopId: 10003,
      useYn: 'Y',
    },
    {
      endYn: 'S',
      goodsAmt: 24000,
      goodsBrand: '라운드랩',
      goodsBrandId: 886,
      goodsCate: '선쿠션',
      goodsCnt: 813,
      goodsNm: '자작나무 수분 선쿠션',
      goodsNo: 24656,
      likes: 113,
      shopId: 10003,
      useYn: 'Y',
    },
    {
      endYn: 'S',
      goodsAmt: 20000,
      goodsBrand: '에스쁘아',
      goodsBrandId: 3466,
      goodsCate: '틴트',
      goodsCnt: 190827,
      goodsNm: '꾸뛰르 립 틴트 벨벳',
      goodsNo: 13186,
      likes: 26849,
      shopId: 10003,
      useYn: 'Y',
    },
    {
      endYn: 'S',
      goodsAmt: 32000,
      goodsBrand: '웨이크메이크',
      goodsBrandId: 3937,
      goodsCate: '아이팔레트',
      goodsCnt: 90976,
      goodsNm: '소프트 블러링 아이팔레트',
      goodsNo: 10400,
      likes: 12406,
      shopId: 10003,
      useYn: 'Y',
    },
    {
      endYn: 'S',
      goodsAmt: 12000,
      goodsBrand: '에뛰드',
      goodsBrandId: 3417,
      goodsCate: '틴트',
      goodsCnt: 155907,
      goodsNm: '픽싱틴트',
      goodsNo: 11418,
      likes: 21215,
      shopId: 10003,
      useYn: 'Y',
    },
  ],
  watchedVideos: [
    {
      C00: 1000000256,
      C01: 11253,
      C02: 10161,
      C03: '노아이라인‼️맑고 청순한 쿨톤 핑크 메이크업💓| 화보 촬영 GRWM',
      C04: 0,
      C05: 0,
      C06: 'eOBUOHy9cG4',
      C07: '김크리스탈KimCrystal',
      C08: 26420,
    },
    {
      C00: 1000000256,
      C01: 13695,
      C02: 10078,
      C03: '여드름 스킨케어 추천 🎇 | 여드름 스킨케어 루틴 | 민감성 스킨케어 | 민감성피부 스킨케어 | 스킨케어',
      C04: 0,
      C05: 0,
      C06: 'AL9K6Vd_QqI',
      C07: 'Hyeoni혜오니',
      C08: 1872,
    },
    {
      C00: 1000000256,
      C01: 13436,
      C02: 10157,
      C03: 'SUB) 봄웜인생립❤️ 요즘 진~짜 잘 쓰는 립추천💋컬러, 발색, 지속력 다 본다❗️ 믿고 봐..❗️ MY FAVORITE LIPSㅣ웜톤 틴트 추천ㅣ립 추천ㅣ최모나choimona',
      C04: 0,
      C05: 0,
      C06: 'IVw-KprJsyc',
      C07: '최모나choimona',
      C08: 43309,
    },
    {
      C00: 1000000256,
      C01: 13757,
      C02: 10078,
      C03: '(SUB) 여러분 저 대학생 됐어요...📖 입학썰 이야기하며 새내기st 메이크업 & 수강신청 날 VLOG',
      C04: 0,
      C05: 0,
      C06: '7C3gFX2HAuY',
      C07: '도영도영이',
      C08: 186001,
    },
    {
      C00: 1000000256,
      C01: 10014,
      C02: 10362,
      C03: 'cc) 청순St 메이크업 ft.초간단 눈화장!!!✨pure makeupㅣ아랑',
      C04: 0,
      C05: 0,
      C06: 'D60rP5athw8',
      C07: 'ARANG 아랑',
      C08: 61641,
    },
  ],
  scrapVideos: [
    {
      C00: 1000000256,
      C01: 10039,
      C02: 10559,
      C03: '광고❌ 유튜버가 만든 화장품은 진짜 좋을까..?😅 (레오제이 에뛰드 팔레트, 민스코 롬앤 틴트, 재유 노베브 애교살, 경선 팔레트, 젤라 신상쿠션, 우린 향수, 조효진 쉐딩)',
      C04: 1,
      C05: 0,
      C06: 'TUJmDpbmT8k',
      C07: 'HOONION',
      C08: 116079,
    },
  ],
  likedCosmetics: [
    {
      C00: 1000000256,
      C01: 10003,
      C02: 10400,
      C03: '소프트 블러링 아이팔레트',
      C04: 'https://d1sjhoa769f1sq.cloudfront.net/prodimg256/00/1000310400.jpg',
      C05: '웨이크메이크',
      C06: 1,
      chasu: 1,
      chasuImg: 'Y',
      chasuNm: '2호 생기 블러링',
      colorImg: '',
      folder: 0,
      goodsAmt: 32000,
      goodsBrandId: 3937,
      goodsChasuImg: '1_0.jpg',
      movCnt: 165,
      rgbCd: 'e9b7c2',
    },
    {
      C00: 1000000256,
      C01: 10003,
      C02: 2651,
      C03: '섀도우 팔레트',
      C04: 'https://d1sjhoa769f1sq.cloudfront.net/prodimg256/51/100032651.jpg',
      C05: '데이지크',
      C06: 1,
      chasu: 12,
      chasuImg: 'Y',
      chasuNm: '12 웜 블렌딩',
      colorImg: '',
      folder: 0,
      goodsAmt: 34000,
      goodsBrandId: 670,
      goodsChasuImg: '12_0.jpg',
      movCnt: 31,
      rgbCd: 'f0c4a3',
    },
    {
      C00: 1000000256,
      C01: 10003,
      C02: 26542,
      C03: '잉크 무드 글로이 틴트',
      C04: 'https://d1sjhoa769f1sq.cloudfront.net/prodimg256/42/1000326542.jpg',
      C05: '페리페라',
      C06: 1,
      chasu: 1,
      chasuImg: 'Y',
      chasuNm: '001 틴메추해',
      colorImg: '',
      folder: 0,
      goodsAmt: 10000,
      goodsBrandId: 5140,
      goodsChasuImg: '1_0.jpg',
      movCnt: 56,
      rgbCd: 'fb9a89',
    },
    {
      C00: 1000000256,
      C01: 10004,
      C02: 122367,
      C03: '레드 블레미쉬 클리어 수딩 토너',
      C04: 'https://d1sjhoa769f1sq.cloudfront.net/prodimg256/67/10004122367.jpg',
      C05: '닥터지',
      C06: 1,
      chasu: 0,
      chasuImg: '',
      chasuNm: '',
      colorImg: '',
      folder: 0,
      goodsAmt: 29000,
      goodsBrandId: 5808,
      goodsChasuImg: null,
      movCnt: 30,
      rgbCd: '',
    },
    {
      C00: 1000000256,
      C01: 10004,
      C02: 101670,
      C03: '원더 세라마이드 모찌 토너',
      C04: 'https://d1sjhoa769f1sq.cloudfront.net/prodimg256/70/10004101670.jpg',
      C05: '토니모리',
      C06: 1,
      chasu: 0,
      chasuImg: '',
      chasuNm: '',
      colorImg: '',
      folder: 0,
      goodsAmt: 9900,
      goodsBrandId: 4940,
      goodsChasuImg: null,
      movCnt: 39,
      rgbCd: '',
    },
  ],
};
