import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Adjust the path if needed
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';
import { AuthGuard } from './auth.guard'; // If using guards
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MessagingComponent } from './messaging/messaging.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './auth.service';

NgModule({
  declarations: [
    AppComponent,
    ManageUsersComponent,
    MessagingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // Add FormsModule to imports
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'channels', component: ChannelsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login if no path
  { path: '**', redirectTo: '/login' } // Handle unknown routes
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export class AppModule { }
