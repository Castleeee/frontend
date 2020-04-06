import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component (resolve) { require(['./views/Home.vue'], resolve) }
    },
    // user 相关路由
    //
    {
      path: '/login', // todo 如果已经是验证状态,跳转首页
      name: 'login',
      component (resolve) {
        require(['./components/user/login/Login.vue'], resolve)
      },
      meta: {
        onlyTemporary: true // 添加该字段，表示进入这个路由只有没登录的才能访问
      }

    },
    {
      path: '/changePwd', // 修改密码
      name: 'changePwd',
      component (resolve) { require(['./components/user/changepwd/changePasswd.vue'], resolve) },
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/resetPasswd', // 找回密码验证邮箱界面
      name: 'resetPasswd',
      component (resolve) { require(['./components/user/findback/resetPasswd.vue'], resolve) },
      meta: {
        onlyTemporary: true // 添加该字段，表示进入这个路由只有没登录的才能访问
      }
    },
    {
      path: '/search', // 更改邮箱界面
      name: 'searchResult',
      component (resolve) { require(['./components/search/result/resultPage.vue'], resolve) }
    },
    {
      path: '/changeEmail', // 更改邮箱界面
      name: 'changeEmail',
      component (resolve) { require(['./components/user/changeEmail/changeEmail.vue'], resolve) },
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由只有登录的才能访问
      }
    },
    {
      path: '/usercenter',
      name: 'usercenter',
      component (resolve) {
        require(['./components/user/usercenter/usercenter.vue'], resolve)
      },
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }// todo 用户资料中心cmd Only temporary
    },
    //
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/*',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/error/page404.vue')
    }
  ]
})
router.beforeEach((to, from, next) => { // todo 鉴定如果没有登陆就跳转登录界面一直不成功
  Vue.prototype.$LoadingBar.start()
  var loginState = localStorage.getItem('isLogin')// 获取本地存储的登录状态  // console.log(to.meta.requireAuth)  // console.log('loginstate:' + loginState)
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (loginState === 'true') { // 根据登录状态选择是否加载 todo 太蠢了, console.log('不需要验证')
      next()
    } else { // console.log('需要验证')
      next({// 需要登陆就登陆去
        path: '/Login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else if (to.meta.onlyTemporary) {
    if (loginState === 'true') {
      next({// 回到usercenter
        path: '/usercenter'// 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      next()
    }
  } else { next() }
})

router.afterEach(route => {
  Vue.prototype.$LoadingBar.finish()
})

export default router
