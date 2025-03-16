
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "redirectTo": "/admin/Schedules",
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "route": "/admin/ads"
  },
  {
    "renderMode": 2,
    "route": "/admin/newAds"
  },
  {
    "renderMode": 2,
    "route": "/admin/archivedAds"
  },
  {
    "renderMode": 2,
    "route": "/admin/addDevices"
  },
  {
    "renderMode": 2,
    "route": "/admin/Devices"
  },
  {
    "renderMode": 2,
    "route": "/admin/archivedDevices"
  },
  {
    "renderMode": 2,
    "route": "/admin/Makeschedule"
  },
  {
    "renderMode": 2,
    "route": "/admin/Schedules"
  },
  {
    "renderMode": 2,
    "route": "/admin/schedule/view"
  }
],
  assets: {
    'index.csr.html': {size: 5488, hash: '23b32332817d65542fdcb96de1eb1e3637223525380a7946ff1afd9932c4fd70', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: '185d7d0943a92434f71a1abbd915f87d6d4e9e42c6e7f4fcb70e3641d2abc547', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 38614, hash: '0debc1802b9911b5c241bb3e275426131541c3ebb600cd8737fcc0d70b8cd41c', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12274, hash: '0e6e770db21846f27eea20fdb0829a77f10643a2fce46d3e437c129d23e9c847', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 33610, hash: 'f36a529f6c75cfd9767df29ba19932bcbd745df822ebcc278627f97acef814b9', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 32763, hash: 'c9e93830ef69acdcfc57eea541d612fbc2267e1c6a3a84c5d69b8e572ca37593', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 37894, hash: 'bb9ec6f8aee606d0cf84f3bad52cfebf8fa51c1683160821e5e4474c615c20de', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 36781, hash: '3f12e4eae6fc125ce8975c4d9e991fb3259c26bca0df651b3bc698d34ba303f8', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 41882, hash: 'ca2e48b981b627affb44f2133dfdb3b4025d01ba0870ee0fa4e34f9153eaab55', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 28522, hash: '6bb8b5c57b006cfc19d55779112ef7b31e144af819f680a78ee448360ebd524b', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 35408, hash: '226e63bad87bdbc17403ebdeae8037eabb6aebccd22f0227523bd2097015167b', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 38399, hash: 'd25fae6417084e4454f276ae065527fb64972aa654d0604e1f41e9319d9d3280', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
