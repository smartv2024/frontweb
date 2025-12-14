
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
    'index.csr.html': {size: 5506, hash: '963f9214fd4561d7e4a2c9192eb6108ebf77b4af7c016ae226d1cb3361a64c08', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1605, hash: '3033ccb272096cc7be4a8cae6882d1e9c926275af869d76cea489cb155ea47fc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: '95188a4baad79a1b75718cd986b6742e6ff913c5330000f86371a44c2de2fcb3', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24315, hash: '97009bc77ed0c68aa488e82bf0fd995b9c54df804c3aa4091f4180ee78d75786', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8571, hash: '31f5f3d0ba8f4fe5d9cba36747d5e5152f51f424a91f1ab04d75d1149634bb3f', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
