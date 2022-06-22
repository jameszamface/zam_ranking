import {Action, ActionType} from '../../contexts/TutorialContext/types/Action';
import {Tutorial} from '../../contexts/TutorialContext/types/Tutorial';

const actionBA: Action = {
  id: '랭킹제품',
  type: ActionType.Manual,
  duration: 3000, // modal.button이 있기 때문에 무시됩니다.
  modal: {
    size: {
      width: 0.9,
      // height: 0.3,
    },
    position: {
      bottom: 0.1,
    },
    texts: [
      '안녕하세요~',
      {text: '하이!', color: '#007FFF'},
      'ㅎㅎㅎ~',
      {text: "\n'첫 번째 제품'을 눌러보세요.", color: 'tomato'},
      'ㅎㅎㅎ~',
    ],
    textStyle: {
      fontSize: 20,
    },
    button: {
      text: '확인',
      containerStyle: {
        width: 'auto',
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#007FFF',
        borderColor: '#007FFF',
      },
      textStyle: {
        color: '#ffffff',
      },
    },
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  image: {
    size: {
      width: 100,
      height: 100,
    },
    horizontalAlign: 'left',
    uri: 'https://jameszamface.github.io/zam_ranking/finger_left.png',
    type: 'image',
  },
  outside: {
    block: true,
    color: 'rgba(0,0,0,0.5)',
  },
};

const actionBB: Action = {
  id: '나의 찜',
  type: ActionType.Auto,
  duration: 3000,
  modal: {
    size: {
      width: 0.9,
    },
    position: {
      top: 0.1,
    },
    texts: [
      '안녕하세요2',
      {text: '반가워요🦀🦀', color: 'tomato'},
      'zzz~',
      {text: '\n다시 마이잼으로 돌아가 볼까요?', color: 'tomato'},
    ],
    textStyle: {
      fontSize: 20,
    },
    // button: {
    //   text: '확인',
    //   containerStyle: {
    //     width: 'auto',
    //     paddingHorizontal: 20,
    //     borderRadius: 5,
    //     backgroundColor: '#007FFF',
    //     borderColor: '#007FFF',
    //   },
    //   textStyle: {
    //     color: '#ffffff',
    //   },
    // },
    // backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  image: {
    size: {
      width: 100,
      height: 100,
    },
    horizontalAlign: 'left',
    uri: 'https://jameszamface.github.io/zam_ranking/finger_left.png',
    type: 'image',
  },
  moveTo: {
    screen: 'MyZam',
  },
};

export const tutorialB: Tutorial = {
  id: 1,
  parentId: 0,
  screen: 'Ranking',
  actions: [actionBA, actionBB],
  description: '랭킹 튜토리얼입니다.',
};
