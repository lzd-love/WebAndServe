/*
 * @Author: lzd
 * @Date: 2020-09-03 23:59:26
 * @LastEditors: lzd
 * @LastEditTime: 2020-11-11 09:31:38
 * @Description: content description
 */
import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store";

const originalReplace = VueRouter.prototype.push;
VueRouter.prototype.push = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
//重写push 用来处理他的本页面跳本页面的报错，让人不开心。

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/login",
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue")
  },
  {
    path: "/statuslist",
    name: "statuslist",
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "statuslist" */ "../views/status_list/StatusList.vue"
      )
  },
  {
    path: "/changepassword",
    name: "changepassword",
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "changepassword" */ "../views/change_password/ChangePassword.vue"
      )
  },
  {
    path: "/multiupdate",
    name: "multiupdate",
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "multiupdate" */ "../views/multi_update/MultiUpdate.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/**
 * @to 跳到的路由对象
 * @from 来的路由对象
 * @next  可以next(/a)之类的方式跳转另外的路由
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (window.sessionStorage.getItem("uid")) {
      next();
    } else {
      next({
        path: "/login" // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
