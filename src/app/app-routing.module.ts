import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { AuthGuard } from './guards/auth.guard';
import { ForcePasswordChangeGuard } from './guards/force-password-change.guard';
const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'login',
  component:LoginComponent,
  },
  {
    path: 'changepwd',
    component: ChangepwdComponent,
    canActivate: [ForcePasswordChangeGuard],
    
  },
  {
    path:'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
