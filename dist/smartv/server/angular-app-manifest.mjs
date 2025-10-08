
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
    'index.csr.html': {size: 5488, hash: '1cc421ed07d1c62e15d7fea1388c8e69c03b61cb0829f58d6bd433da4eede4cd', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: 'e8cdcdbc43ea4e127cea74dca91637da4a7221a7f3eeb53df1c88e82367cc083', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24315, hash: '11da25b31eaaa3054dc1d9b15a8b1a79c733e94f62c0de34738f05ddfb8cdc94', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: '8ae8ba08176d39861793992e96ee073fb4869771b69d09ad66cd9e8bd8018d41', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8571, hash: 'c113243c00a26a1f5adb5e09da03d3bd61d3856bd32dedd5a67438f6bc80ef08', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
