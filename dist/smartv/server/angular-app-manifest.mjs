
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
    'index.csr.html': {size: 5488, hash: '25cdf2f7357315b83f828546e8a7ac10019820b84563d0f5efd85b37be8ff17b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: '66c4706f08c351692b649b978ee3ccf31fa921f84d01ca41a783a18a6a67b56c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: '608ee55c3e7cac5de9b15306ad787c15d37149edcca4b4ff59e9a42e340727c6', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24315, hash: 'f68b1255e91126d9935939c70e7d48ce52dc0f9ffc5ebc5881fc335b3ae67a34', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8571, hash: '9aef5d6e06bec53e0436bb258c3007359d2d1386d4b0dad8cd26c0ceb09d6df0', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
