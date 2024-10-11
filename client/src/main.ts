import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< Updated upstream
import { FormsModule } from '@angular/forms';
=======
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
>>>>>>> Stashed changes
import { LoginComponent } from './app/login/login.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { GroupsComponent } from './app/groups/groups.component';
import { ChannelsComponent } from './app/channels/channels.component';
<<<<<<< Updated upstream
import { importProvidersFrom } from '@angular/core';
import { UserService } from './app/user.service'; // Import UserService
import { AuthService } from './app/auth.service';
import { provideHttpClient } from '@angular/common/http';
=======
import { AuthGuard } from './app/auth.guard';  // Ensure AuthGuard is implemented correctly
import { importProvidersFrom } from '@angular/core';
>>>>>>> Stashed changes

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
<<<<<<< Updated upstream
  { path: 'dashboard', component: DashboardComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'channels', component: ChannelsComponent },
=======
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'channels', component: ChannelsComponent, canActivate: [AuthGuard] },  // Protected route
  { path: '**', redirectTo: '/login' }  // Fallback route
>>>>>>> Stashed changes
];

bootstrapApplication(AppComponent, {
  providers: [
<<<<<<< Updated upstream
    importProvidersFrom(RouterModule.forRoot(routes),
    FormsModule),
    UserService,
    provideHttpClient(),
    AuthService
=======
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(HttpClientModule)  // Include HttpClientModule here
>>>>>>> Stashed changes
  ]
}).catch(err => console.error(err));
