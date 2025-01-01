import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { AddAdvertisementComponent } from './advertisement/add-advertisement/add-advertisement.component';
import { ArchivAdsComponent } from './advertisement/archiv-ads/archiv-ads.component';
import { AddDevicesComponent } from './devices/add-devices/add-devices.component';
import { DevicesComponent } from './devices/devices.component';
import { ArchiveDevComponent } from './devices/archive-dev/archive-dev.component';
import { MakescheduleComponent } from './schedule/makeschedule/makeschedule.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ViewScheduleComponent } from './schedule/view-schedule/view-schedule.component';

const routes: Routes = [
  {

    path: '',
    component: AdminComponent,
    children:[
    
      {
        path:'ads',
        component:AdvertisementComponent
      },
      {
        path:'newAds',
        component:AddAdvertisementComponent
      },{
        path:'archivedAds',
        component:ArchivAdsComponent
      },
      {
        path:'addDevices',
        component:AddDevicesComponent
      },
      {
        path:'Devices',
        component:DevicesComponent
      },
      {
        path:'archivedDevices',
        component:ArchiveDevComponent
      },
      {
        path:'Makeschedule',
        component:MakescheduleComponent
      },
      {
        path:'Schedules',
        component:ScheduleComponent
      },
      {
        path:'schedule/view',
        component:ViewScheduleComponent
      },
      {
        path:'',
        redirectTo:'Schedules',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
