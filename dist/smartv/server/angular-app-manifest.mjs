
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
    'index.csr.html': {size: 5488, hash: '075c10d3d618154b22929e78e3149175edc32f4dd841d17a11a0f350788a4f79', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: '2b4d736978b9c1d21b96dfee7169dccf623ea9ea16f4b9c19f8b200e33884b98', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24119, hash: '4d61913c2c4f63d3abdde9548cd2e640a7db7f6da5daf71b5bbce952d0690425', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: '3d06d9b9adb22e6bc7e6d14d11a2836e31095daf332130f9f7d728db7f2c0343', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: '0fbed71f05079df18bb88a05e9cd93db039dc8eb8887505a0bf3b73dd22d6967', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
