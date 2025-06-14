
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
    'index.csr.html': {size: 5488, hash: 'baa4a945ad947d0b884e888704b0a1b8122faaacbb0fd3d0850e4adc31582bef', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: '392e3834ebd8977a3f2e402c5ed02206de396870420470a9e9325a0183eeb8ba', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: 'f4f185911f41703392e20522d61b60a7b813ccd7581c7933d3d3fd08d61325be', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24119, hash: '71a36a84f58f2a5351dfca13bc38069b4e12d0ded43d04737a3f5630e7581881', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: '2e3da7ab3e477c3eafa56188a58bcefb577aabf40f8bbf7fc6d531d8d704f059', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
