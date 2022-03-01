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
      commit("SET_LOADING", true);

      return CategoryService.getAllCategory().then(
        (response) => {
          commit("SET_CATEGORIES", response.data);
          setTimeout(() => {
            commit("SET_LOADING", false);
          }, 850);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    fetchCategoryById({ commit }, categoryId) {
      return CategoryService.getCategoryById(categoryId).then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    addCategory({ commit }, category) {
      commit("SET_LOADING", true);

      return CategoryService.createCategory(category).then(
        (response) => {
          commit("SET_CATEGORY", category);
          commit("SET_LOADING", false);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    updateCategory({ commit }, category) {
      commit("SET_LOADING", true);

      return CategoryService.updateCategory(category).then(
        (response) => {
          commit("UPDATE_CATEGORY", category);
          commit("SET_LOADING", false);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    deleteCategory({ commit }, categoryId) {
      return CategoryService.deleteCategory(categoryId).then(
        (response) => {
          commit("DELETE_CATEGORY", categoryId);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
  },
};
