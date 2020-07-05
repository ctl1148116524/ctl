/*
 * @Author: your name
 * @Date: 2020-07-05 09:04:26
 * @LastEditTime: 2020-07-05 12:32:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\view\src\router\router.js
 */
import VueRouter from 'vue-router'
Vue.use(VueRouter)
var home = () => import( /* webpackChunkName:"view-home"*/ '../view/home/index.vue')

function loadView1(view) {
    return () => import( /* webpackChunkName:"view-[request]"*/ '../view/' + view + '/index.vue')
}

var routes = [{
        path: '/',
        name: 'home',
        component: home,
        meta: {
            title: '主页'
        }
    },
    {
        path: '/page',
        name: 'page',
        component: loadView1('page'),
        meta: {
            title: '子页面1'
        }
    }
]
// {path:'/menu3',component:loadView1('page'),children:[
    //     {path:'page1', component:loadView1('page1')},
    //     {path:'page2', component:loadView1('page2')},
    //     {path:'page3', component:loadView1('page3')}
    // ]}
var router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

// router.beforeEach((to, from, next) => {
//     /* 路由发生变化修改页面title */
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
//     console.log(document.title)
//     next()
// })
router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
})

export {
    router
}