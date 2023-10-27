import { createRouter, createWebHistory } from 'vue-router';
import userModule from '@/store/modules/user';

const authRequiredPages = ['UserProfile', 'ListOfUsers', 'CompanyProfile', 'ListOfCompanies'];
const guestOnlyPages = ['UserAuthorization', 'UserRegistration'];
const publicPages = ['HomePage', 'AboutUs', 'TestVuex', 'CompanyRegister'];

const generateRoutes = (pages,) => {
  return pages.map(page => {
    const formattedPath = page
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
    const component = () => import(`@/views/${page}.vue`);
    return {
      path: `/${formattedPath}`,
      component,
      meta: {
        requiresAuth: authRequiredPages.includes(page),
        guestOnly: guestOnlyPages.includes(page)
      }
    };
  });
};

const authRequiredRoutes = generateRoutes(authRequiredPages, true);
const guestOnlyRoutes = generateRoutes(guestOnlyPages, false);
const publicRoutes = generateRoutes(publicPages);

const routes = [
  ...authRequiredRoutes,
  ...guestOnlyRoutes,
  ...publicRoutes,
  { path: '/', component: () => import('@/views/HomePage.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const jwtToken = localStorage.getItem('jwtToken');

  if (to.meta.requiresAuth) {
    if (!userModule.state.isAuthenticated || !jwtToken) {
      return next('/user-authorization');
    }
  }

  if (to.meta.guestOnly) {
    if (userModule.state.isAuthenticated || jwtToken) {
      return next('/');
    }
  }
  
  next();
});

export default router;