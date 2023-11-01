import { GetterTree } from 'vuex';
import type { House } from '@/types/House';
import type { State } from '@/types/State';

export const getters: GetterTree<State, State> = {
  /**
   * Get all houses from the state.
   * @param {State} state - The Vuex state.
   * @returns {House[]} - The list of houses.
   */
  allHouses: (state: State) => state.houses,

  /**
   * Get a house by its ID from the state.
   * @param {State} state - The Vuex state.
   * @param {string} id - The ID of the house.
   * @returns {House|undefined} - The house data or undefined if not found.
   */
  getHouseById: (state: State) => (id: string) => state.houses.find((house: House) => house.id.toString() === id),
};
