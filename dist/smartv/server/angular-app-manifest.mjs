
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
    'index.csr.html': {size: 5488, hash: '404e82be4b9249a85f6a6aec8673f7e7dc2e228288f3ccdab1e5c980e0519a02', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'ffcf3cf24f767ef27de95d41a66e299b82bc0659a74b7a1cd1570fec9abd6564', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24119, hash: 'a21d381e56d8c487e1db35b714c5a252c3c569e8784beded808e10eff022bd24', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: '2287cb4f8aa3e4e949c4bf345f51120eb35bebb5b8473916917506cb0dc3d2cc', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: '82484b0171f1852466a3f6ccaa14658c7c68b10db60d0b0eed7833e50846af7b', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
