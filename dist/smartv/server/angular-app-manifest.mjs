
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
    'index.csr.html': {size: 5488, hash: 'be0de402bdb11f18ed3ed0375ff4329318df66bf4aa0d17332e21e5075178ab8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'e36de8dd55cda59a1a430cb457b08afe8ae183d51a41bd7544ebec3f7965571a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: '6dd7e9c2bcb6824a5ed3d623ae51bc17b49bf14e36ae20d7d18ca6dc5eaf6089', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 25566, hash: '8a1a5a49d07f85810f35c4139034a38da925fb1a99ed426ed0689a90c44d5c34', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: 'dc20f0919c8dd7fea1a8baed23b3591350584212a8249ef03d71eec25b32ae2c', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
