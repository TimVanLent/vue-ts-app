import { createStore } from 'vuex';
import type { State } from '@/types/State';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';

// set the State
const state: State = {
  houses: [],
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;
