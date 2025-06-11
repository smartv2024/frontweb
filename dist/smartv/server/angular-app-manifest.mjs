
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
    'index.csr.html': {size: 5488, hash: '58f9ef89b644a91939c072a672994ae1f53655f61c28a0e078ea97acc2e7357a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1587, hash: '2e40528fb4255b4c9d656aee5b28a8f5278ae50a858eded1dcea69a1b85563fc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'changepwd/index.html': {size: 5664, hash: 'fe31637ce78eaeeaedeabe736ba25de584f09a482ffe20667977d15e995224a0', text: () => import('./assets-chunks/changepwd_index_html.mjs').then(m => m.default)},
    'admin/ads/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_ads_index_html.mjs').then(m => m.default)},
    'admin/newAds/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_newAds_index_html.mjs').then(m => m.default)},
    'admin/Devices/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_Devices_index_html.mjs').then(m => m.default)},
    'admin/archivedAds/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_archivedAds_index_html.mjs').then(m => m.default)},
    'admin/addDevices/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_addDevices_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24119, hash: '9169c4ba7b470a7e75a50e50e2a0152edba07b3322b1d4f5f2018a98f7c124fc', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/Makeschedule/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_Makeschedule_index_html.mjs').then(m => m.default)},
    'admin/Schedules/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_Schedules_index_html.mjs').then(m => m.default)},
    'admin/archivedDevices/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_archivedDevices_index_html.mjs').then(m => m.default)},
    'admin/schedule/view/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_schedule_view_index_html.mjs').then(m => m.default)},
    'admin/addUser/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_addUser_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 8540, hash: 'df568e022a7579b70be633ab04ebfc4a2d4bd1d0016635894327c2cb5126deca', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
