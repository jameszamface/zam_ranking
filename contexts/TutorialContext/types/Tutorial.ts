import {State} from '.';
import {Action} from './Action';

export interface Tutorial {
  id: number;
  screen: string;
  state: State;
  actions: Action[];
  description?: string;
}
