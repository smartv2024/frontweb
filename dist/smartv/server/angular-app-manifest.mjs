
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
    'index.csr.html': {size: 5488, hash: 'e7e91f3fa3385c51cf8076d913ea95995579054edb28db9ed8da62a27f73790d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'c592405ebb5fa2cac8f84b8d02335480f9a3c32661d6b58e3c46d0e61ef81b20', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: 'ab480852ba61245f7d088d1fd2c874cf3b9e089e1d511ac70e4e8b8a80f52260', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 27480, hash: '6ba86ec1d1ad94746549bde979b6a79e4b2cff55a7609e2ec66b9fbc4221f0c7', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: '1262e4774825d0e7307d59bca1aa5db31d12da810856d968882eceb665d83732', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
