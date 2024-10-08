import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { LoginComponent } from './app/login/login.component';
import { ChatComponent } from './app/chat/chat.component';
import { GroupsComponent } from './app/groups/groups.component';
import { ChannelsComponent } from './app/channels/channels.component';
import { AuthGuard } from './app/auth.guard';  // Ensure AuthGuard is implemented correctly
import { importProvidersFrom } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'channels', component: ChannelsComponent, canActivate: [AuthGuard] },  // Protected route
  { path: '**', redirectTo: '/login' }  // Fallback route
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(HttpClientModule)  // Include HttpClientModule here
  ]
});
