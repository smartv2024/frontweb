
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
    'index.csr.html': {size: 5488, hash: 'cb4becd82d9706c52829ece5f95fd3ca046478fb3afd0a299a010f722f02f695', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'e1dcb3af7eb9b6cc09f8f86d5e2d2a7dfb09237032441ca5659761abddcc0102', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: 'af003bd51317c787c19f753da476e7b723cfa639965a3f426da2db1676fdfa05', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 23234, hash: 'a32cca91220408bf4030d0c03e8687b6ff4cd9e19fff4cb45a63a53891b5d808', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: '193004336ed8a7904d95ecc755cc4bbe7a68201d2fb64d62775a5e99f40755a2', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
