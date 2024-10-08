import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';
import { ProfileComponent } from './profile/profile.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';  // Ensure your guard is used if needed

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'channels', component: ChannelsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'super-admin', component: SuperAdminComponent },
  { path: 'chat', component: ChatComponent },  // Fix: Ensure Chat route is declared
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default to login
  { path: '**', redirectTo: '/login' }  // Wildcard route handling
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
