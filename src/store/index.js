import Vue from "vue";
import Vuex from "vuex";

// vuex modules
import auth from "./modules/auth.module";
import quiz from "./modules/quiz.module";
import category from "./modules/category.module";
import question from "./modules/question.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    quiz,
    category,
    question,
  },
});
