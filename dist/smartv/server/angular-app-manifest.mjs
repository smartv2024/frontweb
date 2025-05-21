
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
    'index.csr.html': {size: 5488, hash: '2a31ec999b5b36ca4346adac91f913c6e674c2ea0737ea1f89237038bb23b4a2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'e79d699f6a5ad3eeb10d3ce2646e94ad1e3e3b88eab7f3c1ea6336265865f63e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: 'ab0625daee6e7cd4edde82b4da47380cd52a6cc65b0eaa08255ed73a506d8242', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24119, hash: 'bcac30bd55a78c3035c3d648ac664d6f72c7d3aff4d556b3e9a639b50b9b678f', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: 'd61f8f50b89cb50a4cf2836a074acf7e850126370a23987c6525aed0241b09f1', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
