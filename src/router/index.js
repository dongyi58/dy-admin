import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)
Vue.use(ElementUI);
const VueRouterPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const router = new VueRouter({
    // mode:'history',
    routes:[
                //视图主界面
             {
                 path:'/',
                 name:'index',
                 component:()=>import("@/pages/index"),
                 redirect: '/home', //重定向到欢迎页面
            //右侧内容区域作为子路由
            children:[
                {
                    path:'/home',
                    name:'home',
                    component:()=>import("@/pages/home"),
                    meta:{title:'首页'}
                },
                {
                    path:'/table',
                    name:'table',
                    component:()=>import("@/pages/table"),
                    meta:{title:'表格'}
                },
                {
                    path:'/userSetting',
                    name:'userSetting',
                    component:()=>import("@/pages/setting/userSetting"),
                    meta:{title:'用户设置'}
                    
                },
                {
                    path:'/permassion',
                    name:'permassion',
                    component:()=>import("@/pages/setting/permassion"),
                    meta:{title:'权限设置'}
                },
            ]
        },
       
       
        
    ]
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})
  
router.afterEach(() => {
    NProgress.done()
})
export default router