
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
    'index.csr.html': {size: 5488, hash: 'cea6a0a29c43b71ea4fd4df1ecbb6f45852b8bba7fbd2f4ebed7d764ca052ce2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: '7f6d99dd267059e213f1665885e02f6d05b449874de47a5f0ca06f72033dbce5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: '8b1f192575e1cf61f0a95700a3897c0ee9e717bb7d1e471fa88a7784b0658502', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24119, hash: '6998101975368e473ca2d71edba3c59ad460ee07f5d55a159ebf842dd206aab2', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: '0d988a2740c3c8cc04b08b25b531d6247fbbe2a929ee5bc11cdc25d05f35b236', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
