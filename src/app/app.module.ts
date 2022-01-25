import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {Constants} from './helpers/Constants';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    WeatherForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSnackBarModule,
    MatGridListModule
  ],
  providers: [Constants, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
