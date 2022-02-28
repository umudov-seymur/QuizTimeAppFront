import Vue from "vue";
import Vuex from "vuex";

// vuex modules
import auth from "./modules/auth.module";
import quiz from "./modules/quiz.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    quiz
  },
});
