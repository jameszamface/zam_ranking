import {Action, ActionType} from '../../contexts/TutorialContext/types/Action';
import {Tutorial} from '../../contexts/TutorialContext/types/Tutorial';

const actionAA: Action = {
  id: '[마이잼]수정',
  type: ActionType.Manual,
  duration: 3000, // modal.button이 있기 때문에 무시됩니다.
  modal: {
    size: {
      width: 0.9,
      // height: 0.3,
    },
    position: {
      top: 0.3,
    },
    texts: [
      '안녕하세요2',
      {text: '반가워요~ㅇㅇㅇ', color: '#007FFF'},
      'ㅎㅎㅎ~',
      {text: "\n'수정' 버튼을 눌러보세요.", color: 'tomato'},
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
    horizontalAlign: 'right',
    uri: 'https://jameszamface.github.io/zam_ranking/finger_right.png',
    type: 'image',
  },
};

// const actionAB: Action = {
//   id: '나의 찜',
//   type: ActionType.Manual,
//   // duration: 3250,
//   modal: {
//     size: {
//       width: 0.9,
//     },
//     position: {
//       bottom: 0.1,
//     },
//     texts: [
//       '안녕하세요2',
//       {text: '반가워요🦀🦀', color: 'tomato'},
//       'zzz~',
//       {text: "\n'나의 찜' 버튼을 눌러보세요.", color: 'tomato'},
//       '3초 후에 사라져요~',
//     ],
//     textStyle: {
//       fontSize: 20,
//     },
//     button: {
//       text: '확인',
//       containerStyle: {
//         width: 'auto',
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         backgroundColor: '#007FFF',
//         borderColor: '#007FFF',
//       },
//       textStyle: {
//         color: '#ffffff',
//       },
//     },
//     backgroundColor: 'rgba(0,0,0, 0.5)',
//   },
//   image: {
//     size: {
//       width: 100,
//       height: 100,
//     },
//     horizontalAlign: 'left',
//     uri: 'https://jameszamface.github.io/zam_ranking/finger_left.png',
//     type: 'image',
//   },
// };

export const tutorialD: Tutorial = {
  id: 3,
  screen: 'MyZam',
  actions: [actionAA],
  description: '마이잼 튜토리얼3입니다.',
};
