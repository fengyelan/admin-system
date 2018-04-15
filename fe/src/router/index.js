import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const login = r => require.ensure([], () => r(require('@/components/login')), 'login');
const index = r => require.ensure([], () => r(require('@/components/index')), 'index');

const homePage = r => require.ensure([], () => r(require('@/components/homePage')), 'homePage');
const userList = r => require.ensure([], () => r(require('@/components/userList')), 'userList');
const goodList = r => require.ensure([], () => r(require('@/components/goodList')), 'goodList');
const addGoods = r => require.ensure([], () => r(require('@/components/addGoods')), 'addGoods');
const shopTable = r => require.ensure([], () => r(require('@/components/shopTable')), 'shopTable');
const textEdit = r => require.ensure([], () => r(require('@/components/textEdit')), 'textEdit');
const setting = r => require.ensure([], () => r(require('@/components/setting')), 'setting');

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/login',
        name: "login",
        component: login
    },
    {
    	path: '/',
        component: index,
        children:[
            {
                path:'',
                component: homePage,
                meta: []
            },
            {
                path:'home',
                component: homePage,
                meta: []
            },
            {
                path:'/userList',
                component: userList,
                meta: ['数据列表','用户列表']
            },
            {
                path:'/goodList',
                component: goodList,
                meta: ['数据列表','商品列表']
            },
            {
                path:'/addGoods',
                component: addGoods,
                meta: ['添加数据','添加商品']
            },
            {
                path:'/shopTable',
                component: shopTable,
                meta: ['图表','商品分布']
            },
            {
                path:'/textEdit',
                component: textEdit,
                meta: ['文本','文本编辑']
            },
            {
                path:'/setting',
                component: setting,
                meta: ['设置','个人设置']
            }
        ]
    }
  ]
})
