import {RouterModule, Routes} from '@angular/router';
import {BuyerDashboardComponent} from './pages/buyer-dashboard/buyer-dashboard.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {RegisterComponent} from './pages/register/register.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'buyer-dashboard', component: BuyerDashboardComponent }, // Ensure this is here
  { path: '**', redirectTo: 'login' }, // Catch-all route
  { path: 'register', component: RegisterComponent } // Register route
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}