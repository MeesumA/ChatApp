import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './app/login/login.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { GroupsComponent } from './app/groups/groups.component';
import { ChannelsComponent } from './app/channels/channels.component';
import { importProvidersFrom } from '@angular/core';
import { UserService } from './app/user.service'; // Import UserService
import { AuthService } from './app/auth.service';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'channels', component: ChannelsComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes),
    FormsModule),
    UserService,
    provideHttpClient(),
    AuthService
  ]
}).catch(err => console.error(err));
