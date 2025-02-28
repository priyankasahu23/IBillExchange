import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AgGridModule} from 'ag-grid-angular';
import {ClientSideRowModelModule} from 'ag-grid-community';
import {provideHttpClient} from '@angular/common/http';

@NgModule({
    imports: [
        AgGridModule,
        BrowserModule
    ],

  providers: [
    provideHttpClient()
  ],
})
export class AppModule { }
