import {State} from './common';
import {Action} from './Action';

export interface Tutorial {
  id: string | number;
  parentId?: number; // 부모 튜토리얼의 ID
  screen: string;
  state?: State;
  actions: Action[];
  description?: string;
}
