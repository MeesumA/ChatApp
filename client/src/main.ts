import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { GroupsComponent } from './app/groups/groups.component';
import { ChannelsComponent } from './app/channels/channels.component';
import { ChatComponent } from './app/chat/chat.component';  // Import ChatComponent
import { ProfileComponent } from './app/profile/profile.component';  // Import ProfileComponent
import { SuperAdminComponent } from './app/super-admin/super-admin.component';  // Import SuperAdminComponent
import { AuthGuard } from './app/auth.guard';  // Import AuthGuard for route protection
import { importProvidersFrom } from '@angular/core';

// Define application routes
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },  // Protected route
  { path: 'groups', component: GroupsComponent },  // Protected route
  { path: 'channels', component: ChannelsComponent },  // Protected route
  { path: 'chat', component: ChatComponent },  // Add Chat route
  { path: 'profile', component: ProfileComponent},  // Profile route with AuthGuard
  { path: 'super-admin', component: SuperAdminComponent},  // Admin route with AuthGuard
  { path: '**', redirectTo: '/login' }  // Fallback for unknown paths
];

// Bootstrap the application with the routes
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes))  // Ensure routing works across the app
  ]
});
