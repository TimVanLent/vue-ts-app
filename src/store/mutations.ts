import { MutationTree } from 'vuex';
import type { House } from '@/types/House';
import type { State } from '@/types/State';

export const mutations: MutationTree<State> = {

  /**
   * Set the list of houses in the state.
   * @param {State} state - The Vuex state.
   * @param {House[]} houses - The list of houses to set.
   */
  SET_HOUSES(state: State, houses: House[]) {
    state.houses = houses;
  },

  /**
   * Add a new house to the state.
   * @param {State} state - The Vuex state.
   * @param {House} house - The house to add.
   */
  ADD_HOUSE(state: State, house: House) {
    state.houses.push(house);
  },

  /**
   * Update an existing house in the state.
   * If the house doesn't exist, it adds the updated house.
   * @param {State} state - The Vuex state.
   * @param {House} updatedHouse - The updated house data.
   */
  UPDATE_HOUSE(state: State, updatedHouse: House) {
    const index = state.houses.findIndex((house) => house.id === updatedHouse.id);
    if (index !== -1) {
      state.houses[index] = updatedHouse;
    } else {
      state.houses.push(updatedHouse);
    }
  },

  /**
   * Delete a house from the state.
   * @param {State} state - The Vuex state.
   * @param {number} houseId - The ID of the house to delete.
   */
  DELETE_HOUSE(state: State, houseId: number) {
    state.houses = state.houses.filter((house) => house.id !== houseId);
  },
};
