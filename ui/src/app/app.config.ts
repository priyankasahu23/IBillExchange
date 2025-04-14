import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BuyerDashboardComponent } from './pages/buyer-dashboard/buyer-dashboard.component';
import { ComplianceDashboardComponent } from './pages/compliance-dashboard/compliance-dashboard.component';
import {RegisterComponent} from './pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'buyer-dashboard', component: BuyerDashboardComponent },
  { path: 'compliance-dashboard', component: ComplianceDashboardComponent },
  { path: '', redirectTo: 'compliance-dashboard', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent }
  
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule) // Import Forms Module
  ],
};
