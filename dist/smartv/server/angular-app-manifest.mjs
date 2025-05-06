
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
    'index.csr.html': {size: 5488, hash: 'e32c949ba7aad815a86b967e48b926c0b85847c3425e5fa3cfe6b72c51c3d207', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'd5f646df0142e375845752b8449d91dd706f0514deecf6cc0416c18cd3ddea71', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: '5bd6d68bd0c7a0889d5a932b6fb9147c7994dde01b1e7b8c0bccbedbcd22593e', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24119, hash: 'db80c23511ee06d9d9714e5f2c6782f28c40690adae72dc1ef6535620c571ced', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: '791cce8d382fb627e6c04aa85b023183a4a6c171ab9d660ff698f672568d0f2d', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
