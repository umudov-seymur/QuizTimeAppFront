import CategoryService from "@/services/category.service";

export default {
  namespaced: true,
  state: {
    categories: [],
    isLoading: true,
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_CATEGORY(state, category) {
      state.categories.unshift(category);
    },
    UPDATE_CATEGORY(state, data) {
      const index = state.categories.findIndex(
        (category) => category.id === data.id
      );
      state.categories.splice(index, 1, data);
    },
    DELETE_CATEGORY(state, id) {
      const index = state.categories.findIndex(
        (category) => category.id === id
      );
      state.categories.splice(index, 1);
    },
  },
  actions: {
    fetchCategories({ commit }) {
      return CategoryService.getAllCategory().then(
        (response) => {
          commit("SET_CATEGORIES", response.data);
          commit("SET_LOADING", false);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
  },
};
