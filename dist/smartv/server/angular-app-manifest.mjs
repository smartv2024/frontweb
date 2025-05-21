
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
    'index.csr.html': {size: 5488, hash: 'b22565516e492c9cd85f7b727c72a1d567004a0dad335b6c8011bad8b4040064', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: '8b1e733bae29fe046a3c26ad3151f744acc7b26f5598318777754b11b0617b61', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: 'b950d7fd8e67e5edcb9de8137458cbf4d7a7d7c53afec280a942686be72b64db', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24119, hash: '2f015b0189fcc2fc2ca94cef2ab4ec8fe967a2e6045faaba6a056b255eb73446', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: '604122b6f1463d90110547f76cef8d473762078591dc807ccfda20f9255a8be4', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
