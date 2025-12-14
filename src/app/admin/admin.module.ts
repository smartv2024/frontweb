import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { HttpClientModule } from '@angular/common/http';
import { AddAdvertisementComponent } from './advertisement/add-advertisement/add-advertisement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from './admin.service';
import { ArchivAdsComponent } from './advertisement/archiv-ads/archiv-ads.component';
import { DevicesComponent } from './devices/devices.component';
import { AddDevicesComponent } from './devices/add-devices/add-devices.component';
import { ArchiveDevComponent } from './devices/archive-dev/archive-dev.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MakescheduleComponent } from './schedule/makeschedule/makeschedule.component';
import { ViewScheduleComponent } from './schedule/view-schedule/view-schedule.component';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ProfileComponent } from './users/profile/profile.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    AdvertisementComponent,
    AddAdvertisementComponent,
    ArchivAdsComponent        ,
    DevicesComponent,
    AddDevicesComponent,
    ArchiveDevComponent,
    ScheduleComponent,
    MakescheduleComponent,
    ViewScheduleComponent,
    AddUserComponent,
    ListUsersComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbDropdownModule
  ],
  providers:[AdminService]
})
export class AdminModule { }
