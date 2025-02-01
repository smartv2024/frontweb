
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
    'index.csr.html': {size: 5488, hash: 'b591ceebc12ac815694cb1095100823864bcd764b2c4fe9dd58534519298d344', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: '7156a2032ead2a92fdc39206a1cd96a515a12da8cb31e62878de5ecf3089ebf1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 33618, hash: '12f5c0ee2953b0f4dcc99e4b577c6ef7d67f656ec005e4b00f01b3e1b754db0b', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 38614, hash: 'b11dbd8872e3dd8e584b7ff3b40161056b6c7656f3a5e903777729b7f6914b3c', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12274, hash: '16bff11b82f49dcf8a4e05dcc7e54b5ace51ffe97f0b04e4a5332cf8e3466127', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 37894, hash: '48b824722578692022c4aad1e13afb460904ede0400e2196f0a7a64c534d860a', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 32763, hash: '632a567dfe2fc10250b11f9d359a38a553527cd14922215ae84c41ec886c4854', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 41886, hash: 'bff2272fd0be1fb8399d5548883e5b1952e1485ff86129ea2c62f015c5cd1417', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 36781, hash: 'f5ce184c9e9be7485f2c6e6655ef0e5d8f01910e6c007a3b7e07df53d47bf0b7', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 38891, hash: 'fb2df794913e0d6176dfec325b13435ac9aa507c4e8281042f8dfb981ea9386f', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 28527, hash: '298bdbf273d514330cc6090ce7e2906c331de6a8e89ba5fe1455938208ced485', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 35402, hash: '4d2150d0da64f9cd39eaffeeb603a1951c41aa29f676a25fb8f3f01e29da6d88', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
