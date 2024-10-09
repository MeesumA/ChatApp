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
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login on empty path
  { path: '**', redirectTo: '/login' }  // Catch-all for invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Make sure routes are passed to forRoot()
  exports: [RouterModule]  // Ensure the RouterModule is exported for use in the app
})
export class AppRoutingModule { }
