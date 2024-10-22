import Vue from "vue";
import Meta from "vue-meta";
import Router from "vue-router";
import Home from "@/components/pages/Home";
import { Role } from "@/helpers/Role";

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      // meta: { authorize: [Role.Teacher, Role.Student] },
    },
    {
      path: "/auth",
      component: () => import("@/layouts/AuthLayout"),
      children: [
        {
          path: "login",
          component: () => import("@/components/pages/auth/Login"),
          name: "login",
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/components/pages/auth/Register"),
        },
      ],
    },
    {
      path: "/quizzes",
      name: "quizzes",
      meta: { authorize: [Role.Teacher] },
      component: () => import("@/components/pages/quiz/QuizList"),
    },
    {
      path: "/quizzes/:id/questions",
      name: "quizzes.questions",
      meta: { authorize: [Role.Teacher] },
      component: () => import("@/components/pages/questions/QuestionList"),
    },
    {
      path: "/quiz/join/:quizPassword",
      name: "quiz.join",
      meta: { authorize: [Role.Teacher, Role.Student] },
      component: () => import("@/components/pages/exam/QuizJoin"),
    },
    {
      path: "/quizzes/:id/print",
      name: "quizzes.print",
      meta: { authorize: [Role.Teacher] },
      component: () => import("@/components/pages/quiz/QuizPrint"),
    },
    {
      path: "/code/:quizPassword",
      name: "exam",
      meta: { authorize: [Role.Teacher, Role.Student] },
      component: () => import("@/layouts/ExamLayout"),
      children: [
        {
          path: ":questionId",
          component: () => import("@/components/pages/exam/ExamQuestion"),
          name: "exam.question",
        }
      ],
    },
    {
      path: "/categories",
      name: "categories",
      meta: { authorize: [Role.Teacher] },
      component: () => import("@/components/pages/categories/CategoryList"),
    },
    {
      path: "/categories/create",
      name: "categories.create",
      meta: { authorize: [Role.Teacher] },
      component: () => import("@/components/pages/categories/AddCategory"),
    },
    {
      path: "/categories/:id/edit",
      name: "categories.update",
      meta: { authorize: [Role.Teacher] },
      component: () => import("@/components/pages/categories/EditCategory"),
    },
    {
      path: "/404",
      name: "NotFound",
      component: () => import("@/components/pages/NotFound"),
    },
    {
      path: "*",
      redirect: "/404",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;

  if (authorize) {
    if (!currentUser) {
      return next({ name: "login", query: { returnUrl: to.path } });
    }

    if (authorize.length && !authorize.includes(currentUser.roles[0])) {
      return next({ path: "/403" });
    }
  }

  next();
});

export default router;
