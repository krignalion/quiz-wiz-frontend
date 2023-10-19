import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';

const authRequiredPages = ['UserProfile', 'ListOfUsers', 'CompanyProfile', 'ListOfCompaies'];
const guestOnlyPages = ['UserAuthorization', 'UserRegistration'];
const publicPages = ['HomePage', 'AboutUs', 'TestVuex'];

const generateRoutes = (pages) => {
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

const authRequiredRoutes = generateRoutes(authRequiredPages);
const guestOnlyRoutes = generateRoutes(guestOnlyPages);
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

  if (to.meta.requiresAuth && !(await isValidToken(jwtToken))) {
    next('/user-authorization');
  } else if (to.meta.guestOnly && jwtToken) {
    next('/');
  } else {
    next();
  }
});

async function isValidToken(token) {
  if (!token) return false;

  try {
    const response = await axios.post(`${process.env.API_BASE_URL}/auth/jwt/verify/`, {
      token
    });

    return response.status === 200;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}

export default router;
