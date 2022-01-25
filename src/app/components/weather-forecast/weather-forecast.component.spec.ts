import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastComponent } from './weather-forecast.component';
import {AppModule} from '../../app.module';

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('sum of numbers failed', () => {
    const result = component.add(2, 3);
    expect(result).toBe(5);
  });

});
