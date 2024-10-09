import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule for HTTP requests
import { LoginComponent } from './app/login/login.component';
import { ChatComponent } from './app/chat/chat.component';
import { GroupsComponent } from './app/groups/groups.component';
import { ChannelsComponent } from './app/channels/channels.component';
import { AuthGuard } from './app/auth.guard';  // Ensure AuthGuard is implemented correctly
import { importProvidersFrom } from '@angular/core';  // Import for standalone bootstrapping

// Define your routes
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'channels', component: ChannelsComponent, canActivate: [AuthGuard] },  // Protected route
  { path: '**', redirectTo: '/login' }  // Fallback for unknown routes
];

// Bootstrap the application with routing and HTTP client modules
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),  // Provide routing
    importProvidersFrom(HttpClientModule)  // Provide HttpClientModule
  ]
});
