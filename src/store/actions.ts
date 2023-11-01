import { ActionTree, Commit } from 'vuex';
import type { HouseFormData } from '@/types/House';
import type { State } from '@/types/State';

const API_BASE_URL = 'https://api.intern.d-tt.nl/api/houses';
const API_KEY = 'mfchsrveNwq-KxX9zYByPRIa5AkVOCTE';

export const actions: ActionTree<State, State> = {
  /**
   * Fetch the list of houses from the API and commit mutations to update the state.
   * @param {Object} context - The Vuex context.
   * @param {Commit} context.commit - The commit function to update the state.
   */
  async fetchHouses({ commit }: { commit: Commit }) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY,
        },
      });

      if (response.ok) {
        const data = await response.json();
        commit('SET_HOUSES', data);
      } else {
        console.error('Failed to fetch houses');
      }
    } catch (error) {
      console.error('Error fetching houses', error);
    }
  },

  /**
   * Fetch a specific house from the API and update the state.
   * @param {Object} context - The Vuex context.
   * @param {Commit} context.commit - The commit function to update the state.
   * @param {number} houseId - The ID of the house to fetch.
   */
  async fetchHouse({ commit }: { commit: Commit }, houseId: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/${houseId}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY,
        },
      });

      if (response.ok) {
        const data = await response.json();
        commit('UPDATE_HOUSE', data[0]);
      } else {
        console.error('Failed to fetch houses');
      }
    } catch (error) {
      console.error('Error fetching houses', error);
    }
  },

  /**
   * Create a new house by sending a POST request to the API.
   *
   * @param {Object} context - The Vuex context.
   * @param {Commit} context.commit - The commit function to update the state.
   * @param {HouseFormData} houseData - The data for the new house.
   * @returns {Promise<House|undefined>} - A promise that resolves to the created house or undefined if the creation fails.
   */
  async createHouse({ commit }: { commit: Commit }, houseData: HouseFormData) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'X-Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(houseData),
      });

      if (response.ok) {
        const newHouse = await response.json();
        commit('ADD_HOUSE', newHouse);
        return newHouse;
      } else {
        console.error('Failed to create a house');
      }
    } catch (error) {
      console.error('Error creating a house', error);
    }
  },

  /**
   * Upload an image for a specific house by sending a POST request to the API.
   *
   * @param {Object} context - The Vuex context.
   * @param {Commit} context.commit - The commit function to update the state.
   * @param {Object} params - Object containing houseId and image (File) to upload.
   */
  async uploadImage({ commit }: { commit: Commit }, { houseId, image }: { houseId: number; image: File }) {
    try {
      if (!(image instanceof File)) return;
      const formData = new FormData();
      formData.append('image', image, image.name);

      const response = await fetch(`${API_BASE_URL}/${houseId}/upload`, {
        method: 'POST',
        headers: {
          'X-Api-Key': API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  },

  /**
   * Edit an existing house by sending a POST request with updated data to the API.
   *
   * @param {Object} context - The Vuex context.
   * @param {Commit} context.commit - The commit function to update the state.
   * @param {Object} params - Object containing houseId (ID of the house to edit) and updatedHouseData (new house data).
   */
  async editHouse({ commit }: { commit: Commit }, { houseId, updatedHouseData }: { houseId: number; updatedHouseData: HouseFormData }) {
    try {
      const response = await fetch(`${API_BASE_URL}/${houseId}`, {
        method: 'POST',
        headers: {
          'X-Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHouseData),
      });

      if (!response.ok) {
        console.error('Failed to edit the house');
      }
    } catch (error) {
      console.error('Error editing the house', error);
    }
  },

  /**
   * Delete a house by sending a DELETE request to the API.
   *
   * @param {Object} context - The Vuex context.
   * @param {Commit} context.commit - The commit function to update the state.
   * @param {number} houseId - The ID of the house to delete.
   */
  async deleteHouse({ commit }: { commit: Commit }, houseId: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/${houseId}`, {
        method: 'DELETE',
        headers: {
          'X-Api-Key': API_KEY,
        },
      });
      if (response.ok) {
        commit('DELETE_HOUSE', houseId);
      } else {
        console.error('Failed to delete the house');
      }
    } catch (error) {
      console.error('Error deleting the house', error);
    }
  }
};
