import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';
import { AuthGuard } from './auth.guard';  // Ensure AuthGuard is implemented correctly

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'channels', component: ChannelsComponent, canActivate: [AuthGuard] },  // Protected route
  { path: '', redirectTo: '/chat', pathMatch: 'full' },  // Redirect to chat after login
  { path: '**', redirectTo: '/login' }  // Fallback route for invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
