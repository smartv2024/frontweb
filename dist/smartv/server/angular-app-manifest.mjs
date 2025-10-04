
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
    'index.csr.html': {size: 5488, hash: 'e0771f5f8455c5ce04c2e62f31496b58b0c9fc984790e7aa4a7f04fd6e059393', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'ba61b072b9837172ae9891ca3d4619a1ef6204007a0044ba638b49052eb739d7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: 'b5993d2ffd805daab6cdf2d2e87db15d6da224ff96311c9f83d4721325ccb701', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24315, hash: '4e6d7cd0ad2e3266241db1f356d13d3bce049c60ee1c74fab178637a28e742b6', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8571, hash: '24f0eb25bc10a96354f011d50959b69351a3de01b4273aa6eb4e69e90ec7c135', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
