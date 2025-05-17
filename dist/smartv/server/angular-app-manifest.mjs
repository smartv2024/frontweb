
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
    'index.csr.html': {size: 5488, hash: 'c52676a7164b72a6c8c75d638ec07b86dbc62328266c38b38eadf04fcc9dbe75', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'cb1cb7f98aed2fe7ba3f735b7c76b0ee8c1a88a95f8b0d3fa9c7544226d2492d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: 'ba64ecb596960bd61a2e9e65bb5836eac3f05b1a569e9a87f7a0fd727847e468', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24119, hash: '87dfbd5b0ea6c40f84b7a68ab5a7a8537f4db3076a19fb1b500dc41cdaa1994d', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: '4564a11256f0c63465a7fd36c697fcdcd0a70269f693ef8426bf872516ec55e0', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
