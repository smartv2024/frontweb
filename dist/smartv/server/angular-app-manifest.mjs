
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
    'index.csr.html': {size: 5488, hash: '62a7675dcc2a4cc435e6dfe8dcfec6614daa5f73ff3b4d79b62acd658a23b53a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: '7d95c4fa3a8ff650592c110ebc6be9e8f1ed5f215f1c64e7ee1c5d955c472911', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12274, hash: '98dc96278678f43316385001a131a0acbff04ff568ac20cbbee3d615ebe3affb', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 33610, hash: '260bc4d4572eb2e7159821f2742c86b3ae465f6dd67dffae7adafc8e9c099671', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 38614, hash: '0336dc42977ebe6fd057c01f1f643de3aae49f40b2c53e8ab08d9c7ab18ecb33', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 37894, hash: '41ed7de5bdea5aec93fbef03d8b03c0f656a3eaacb29de06543c9d5c5052a898', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 32763, hash: '8b527df673cc6aa5590fd9d51a035ff05fcf40153f33896416bdd9b8c0611d7c', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 38953, hash: 'ed799e9c3d982e9b28a9b3ea375b8f8dfd1acf21b10b40b77180623347cdc93e', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 35402, hash: '26871c5be0a88e6aef0791f1b2b9310c5b809b6805ca15e659f2477ae1eddfbf', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 36782, hash: 'd4a1420e7025315e40a6c47c34afbe37297e38134074562dc1b7fb591ba78041', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 41882, hash: 'ad51dcae8f050e4ca50c706942258ee4efa07668b3e2f22fdc5d0217e3b24453', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 28527, hash: '48866eac5f839c097583e92aae56913042e6e075d030a699ac7bbf4b2213eced', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
