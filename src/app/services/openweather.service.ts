import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../helpers/Constants';

@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {

  constructor(private http: HttpClient,
              private constants: Constants) { }

  getWeatherForecast(q) {
    const url = this.constants.openWeatherUrl;
    const appid = this.constants.key;
    const units = this.constants.units;
    return (
      this.http.get(url, {params: {q, appid, units}})
    );
  }
}
