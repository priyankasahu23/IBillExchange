import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AgGridModule} from 'ag-grid-angular';
//import {ClientSideRowModelModule} from 'ag-grid-community';
import {provideHttpClient} from '@angular/common/http';
import { BuyerDashboardComponent } from './pages/buyer-dashboard/buyer-dashboard.component'; // Import your component
import { ComplianceDashboardComponent } from './pages/compliance-dashboard/compliance-dashboard.component';

@NgModule({
  declarations: [
  AppComponent,
  BuyerDashboardComponent,// Declare the Buyer Dashboard Component
  ComplianceDashboardComponent
],   
    imports: [
        //AppComponent,
        AgGridModule,
        BrowserModule
    ],

  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
