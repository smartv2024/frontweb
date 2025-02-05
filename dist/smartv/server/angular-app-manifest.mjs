
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
    "renderMode": 2,
    "route": "/admin/archivedDevices"
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
  }
],
  assets: {
    'index.csr.html': {size: 5488, hash: '6c812f1f2f6b5a3ff35f244cb31f7d19d17ab86d9e9f51faa1751f53c2e8d246', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'd82f8df986c0429409e6de0018de47aea5b772e7bedcc3f6358829b8c8717fe6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12274, hash: '3b8ab7a569fc0008e2681f4951e66e00d1b18fcbd12d55d2a7e7dbffdae5a0ad', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 38614, hash: '1f6c0f8360162fbcc32e40ef6550326b798a912e764690f640fcff46035a19de', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 33610, hash: '6a0c61c4689d8a391c42ba068c1e0f8bb26f7720c201f8df86b9dfd68e1dca44', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 36781, hash: '39368958359820cb4b8e050502835ce311b6ee89c857444f1e7da3a6547cfbd2', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 32763, hash: '731d2cafeda816d5c81856acba620428f9704dbe69d6f8615010588485b7ee25', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 41882, hash: '07cac983e824de0f844dfce82bd6e4226eaac900094d719dfa17d77ac07ac403', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 28527, hash: '4cc11ec5055b1f078041c57010cb381b2da36a41c43c9a46868f52bc6aaf78c0', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 35406, hash: 'e16438a69856927fb017a51be1a937686efb064ed1c43efddf0915f094f0b5bf', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 38890, hash: '9ec7097d5b0ed1dff16dc217e79670b1b8ba6ddf382f84a0f1576ad8819811ae', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 37894, hash: '21260087d195f389f5b4f14d7a3a8fbd332dad5280cd3743a35a3ae3e928339b', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
