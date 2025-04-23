import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AdminService } from './admin/admin.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './AuthService/auth.service';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environnement/enivronement';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangepwdComponent } from './changepwd/changepwd.component';

const config: SocketIoConfig = {
  url: environment.baseUrl,
  options: {
    transports: ['websocket'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangepwdComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    NgbModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    AdminService,
    AuthService,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
