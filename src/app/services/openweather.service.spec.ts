import { TestBed } from '@angular/core/testing';

import { OpenweatherService } from './openweather.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Constants} from '../helpers/Constants';
import any = jasmine.any;

describe('OpenweatherService', () => {
  let openWeatherService: OpenweatherService;
  let httpTestingClient: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        OpenweatherService,
        {provide: Constants}
      ]
    });
    openWeatherService = TestBed.get(OpenweatherService);
    httpTestingClient = TestBed.get(HttpClientTestingModule);
  });

  it('should be created', () => {
    const service: OpenweatherService = TestBed.get(OpenweatherService);
    expect(service).toBeTruthy();
  });

  xit ('fetch details', () => {
    openWeatherService.getWeatherForecast('Kakinada').
    subscribe(result => {
      expect(result).toBeTruthy('no data');
    });
    const req = httpTestingClient.expectOne('api.openweathermap.org/data/2.5/forecast/');
    expect(req.request.method).toEqual('GET');
    req.flush({cod: any, city: any, cnt: any, list: any, message: any});
  });

});
