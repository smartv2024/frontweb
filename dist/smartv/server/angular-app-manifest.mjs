
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
    'index.csr.html': {size: 5488, hash: '6b1f2eb6b05a38f73830e4f556f62eec8465ca0027d0f77b2c5fd66d802614e0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: '8912d22f8853d63d2edfa630d48e103ae361ccb81cb26e85309d7df12b6420e9', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12274, hash: '39809e0be0d39eacb3721eb1ad2c11d5fb47360025c43a836882e2728bcfceb7', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 38614, hash: 'dc627d4fed0b398b03c3414ce8088f0396b45ed4e7945f88b9ded0ddb0ca1ae3', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 33618, hash: '535edc8cb7a7af00a422c5407fa49c7b4eeab93cc7c31a16d96b1df82a20aca5', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 37894, hash: '8029e3021301da363adf01181e8fb8f935bd7b0025d88904d92c24565b855e1d', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 36781, hash: 'bc939f3f58cad43841f1d975207d88fb2d25bda31b64c48746dfa972c679e0c0', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 32763, hash: 'c0454e7e3220ec681aefca6aa69cb83acf58ef900dd504e4f5c8bab4a41a645f', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 38888, hash: '7e8ed391c140345461a61584f83a7a1c98e8f991ee34220add27593fbacd27d0', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 28525, hash: 'df38d95d6595ec53dc0e04e3e43ee393d8eb952ee2314c0782002277ec848454', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 41882, hash: '4d40b42d9f65e085cf4ae11d8e619183717b2411138dc5f3687f54528a6b997c', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 35402, hash: 'da36e0cbeba856db7ff61da0ac518a6601d2d40f0f7218c96ac0f6138d914eca', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
