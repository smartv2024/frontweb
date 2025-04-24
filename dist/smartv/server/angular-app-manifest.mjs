
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
    'index.csr.html': {size: 5488, hash: '126db42e0e339bbfc1d66e3e1b9997a5e9b8ef9056e0d37b5b84d9bc9340f5fa', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'd9bb1cf082c79d67ad1c58298d0e7a32bf2774819d4843c0d500eab3311ccaec', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: 'de5252ac37f4fbd41b2e8fb231ec92533455aa9775e75d5d9a770861b30969bc', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 7414, hash: 'a2b121eecb038624aa9d9da877e521814e10de5e79a81d0fdec02ad7de981105', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8571, hash: 'c54bc50c64ed166883d0af5b8b14b0e7558df87ce5cc7f7ee2e253ccca67f5f6', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
