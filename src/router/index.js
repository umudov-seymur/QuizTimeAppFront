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
      name: "Home",
      component: Home,
      // meta: { authorize: [Role.Teacher, Role.Student] },
    },
    {
      path: "/auth",
      component: () => import("@/components/layouts/AuthLayout"),
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
      path: "/questions",
      name: "questions",
      meta: { authorize: [Role.Teacher] },
      component: () => import("@/components/pages/QuestionList"),
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
