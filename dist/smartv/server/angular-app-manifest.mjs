
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
    "route": "/changepwd"
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
    "renderMode": 0,
    "route": "/admin/Devices/*"
  },
  {
    "renderMode": 2,
    "route": "/admin/archivedDevices"
  },
  {
    "renderMode": 0,
    "route": "/admin/archivedDevices/*"
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
  },
  {
    "renderMode": 2,
    "route": "/admin/users"
  },
  {
    "renderMode": 2,
    "route": "/admin/addUser"
  },
  {
    "renderMode": 2,
    "route": "/admin/profile"
  }
],
  assets: {
    'index.csr.html': {size: 5488, hash: '42142e6b78e733d171804e5b2f93adcb3e5d42103cc9767f09ce364c243ffa8e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'ba5ee7cabfd331b9ab17fb88cc33e3bb618360e9f302b72edc318aac163045be', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: '8817ca7000c023ff42b0570eb0a876dbb459be61970172b3409f338323aae382', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 25566, hash: '4c1ff8d4dcbfb5eae5ecd9208e101819ead821d449013ddd7358ff8318abec45', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: 'e8a686d06c0ec1909e06c64cf0d8b37ac045a14c986051a977877cdd40316ebb', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
