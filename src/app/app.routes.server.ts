import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/Devices/:userId',
    renderMode: RenderMode.Server // For parameterized routes, use Server mode
  },
  {
    path: 'admin/archivedDevices/:userId',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
