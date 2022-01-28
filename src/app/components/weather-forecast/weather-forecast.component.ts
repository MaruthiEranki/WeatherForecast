import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OpenweatherService} from '../../services/openweather.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DatePipe} from '@angular/common';
import {Report} from '../../helpers/Constants';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  constructor(private service: OpenweatherService,
              private snackBar: MatSnackBar,
              private datePipe: DatePipe,
    ) { }

  weatherForm = new FormGroup(
    {
      city: new FormControl('', [Validators.required])
    }
  );

  testForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }
  );

  isSpinner: boolean;

  weatherSummary = [];

  ngOnInit() {
  }

  computeAverage(reportResult) {
    for (const result of reportResult.list) {
        const weatherReport = new Report();
        const date = this.datePipe.transform(result.dt_txt, 'yyyy-MM-dd');
        weatherReport.tempMin = result.main.temp_min;
        weatherReport.tempMax = result.main.temp_max;
        weatherReport.pressure = result.main.pressure;
        weatherReport.humidity = result.main.humidity;
        weatherReport.date = date;
        this.pushToSummary(weatherReport);
    }
    console.log(this.weatherSummary);
  }

  pushToSummary(report) {
    let dateMatched = false;
    for (const eachSummary of this.weatherSummary) {
      if (eachSummary.date === report.date) {
        eachSummary.tempMax = eachSummary.tempMax + report.tempMax;
        eachSummary.tempMin = eachSummary.tempMin + report.tempMin;
        eachSummary.pressure = eachSummary.pressure + report.pressure;
        eachSummary.humidity = eachSummary.humidity + report.humidity;
        eachSummary.avg = eachSummary.avg + 1;
        dateMatched = true;
      }
    }
    if (!dateMatched) {
      console.log('date not found', report.date, 'avg', report.avg);
      report.avg = 1;
      this.weatherSummary.push(report);
    }
  }

  formSubmitted() {
    this.isSpinner = true;
    this.weatherSummary = [];
    const city = this.weatherForm.get('city').value;
    this.service.getWeatherForecast(city).subscribe((result: any) => {
      this.computeAverage(result);
      this.isSpinner = false;

    }, error => {
        this.snackBar.open('error occured', 'Please check input', {duration: 1000});
        this.isSpinner = false;
    });
  }

  add(x, y) {
    return x + y;
  }
}
