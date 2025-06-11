
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
    'index.csr.html': {size: 5488, hash: 'e10e0a9f4ab4668467dc1c5f5a66cc91486c26b692f9e1942073e550f3322b82', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'cce840666227abd4ba933557787dfff850e32d39cfa3c919374ac9382075f868', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: 'b2c1ae08a0a7d705ea4b2f24dceeede34dc4bc77a024d35672503f0af6c0275f', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24119, hash: '1afd05758e42477ef724cc29ae58c2e4af1c965ed16a87dad4162bebff2ccf71', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: 'e8b294065fa5dd18aad14ff4254e076b6b78a1fb3d53607dfe5d2548bae48567', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
