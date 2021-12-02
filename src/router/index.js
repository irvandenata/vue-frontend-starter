import { createRouter,createWebHistory } from "vue-router";
const routes = [
    {

           path:'/login',
           name: 'login',
           component:()=> import("../view/login/Index.vue")
          },
  {
            path: '/admin',
            name: 'admin',
             component:()=> import("../view/admin/Index.vue"),
            children: [
               {
           path:'/admin/dashboard',
           name: 'admin.dashboard',
           component:()=> import("../view/admin/Dashboard.vue")
          },
             {
              meta:{
               name:"CATEGORY"
              },
           path:'/admin/catagory',
           name: 'admin.category.index',
           component:()=> import("../view/admin/category/Index.vue")
          },
     
                 ]
               },
 
];


const router = createRouter({
 linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
 history:createWebHistory(),
 routes
});

router.beforeEach((to, from, next) => {
  if(to.name ==='login' && JSON.parse(localStorage.getItem("vuex")) != '' && JSON.parse(localStorage.getItem("vuex")).auth.token != '' )next({ name: 'admin.dashboard' })
  if (to.name !== 'login' && JSON.parse(localStorage.getItem("vuex")) == '' && JSON.parse(localStorage.getItem("vuex")).auth.token == ''  ) next({ name: 'login' });
  else next()
})


export default router;