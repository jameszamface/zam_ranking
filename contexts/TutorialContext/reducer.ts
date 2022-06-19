import {ActionInfo} from '.';

export type ReducerAction =
  | {
      type: 'SET';
      actionInfo: ActionInfo;
    }
  | {
      type: 'HIDE';
    }
  | {
      type: 'REMOVE';
    };

export const reducer = (
  state: ActionInfo | undefined,
  action: ReducerAction,
): ActionInfo | undefined => {
  switch (action.type) {
    case 'SET':
      return {
        ...action.actionInfo,
        visible: true,
      };
    case 'HIDE':
      return state
        ? {
            ...state,
            visible: false,
          }
        : undefined;
    case 'REMOVE':
      return undefined;
    default:
      return state;
  }
};

export default reducer;
