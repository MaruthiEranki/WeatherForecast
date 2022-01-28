import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { WeatherForecastComponent } from './weather-forecast.component';
import {AppModule} from '../../app.module';
import {Constants, Report} from '../../helpers/Constants';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;
  let el: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ReactiveFormsModule],
        providers: [
          {provide: Report}
        ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(WeatherForecastComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('sum of numbers failed', () => {
    const result = component.add(2, 3);
    expect(result).toBe(5);
  });

  it('test dom', () => {
    const list = [];
    list.push(new Report());
    component.weatherSummary = list;

    fixture.detectChanges();

    const cards = el.queryAll(By.css('.card'));

    // console.log(cards[0].query(By.css('mat-grid-tile')));

    expect(cards).toBeTruthy('domEl not truthy');

    expect(cards.length).toBe(1, 'length is not 1');

  });

  it ('check the date format', () => {
    const list = [];
    list.push(new Report());
    component.weatherSummary = list;

    fixture.detectChanges();

    const card = el.query(By.css('.card:first-child'));
    const date = card.query(By.css('mat-grid-tile:first-child'));
    expect(date.nativeElement.textContent).toContain('dd-mm-YY');
  });

  it('Test button existense', (() => {
    const buttonEl = el.query(By.css('.submit-button'));
    console.log(buttonEl);
    expect(buttonEl).toBeTruthy('Button not found');
    // const clickRes = buttonEl.click('click');
  }));

  xit ('click test button', () => {
    const buttonEl = el.query(By.css('.submit-button')).nativeElement;
    // buttonEl.click();
    // expect()
  });

  it('Test form email field valid', () => {
    const email = component.testForm.controls.email;
    email.setValue('eeranki.sriram@gmail.com');
    expect(email.valid).toBeTruthy('No Value provided');
    expect(email.errors).toBeNull('');
  });

  it('Test form email field invalid', () => {
    const email = component.testForm.controls.email;
    expect(email.valid).toBeFalsy('No Value provided');
    expect(email.errors.required).toBeTruthy('Email left empty failed');
    email.setValue('wrongEmail');
    expect(email.errors.email).toBeTruthy('Email format test case failed');
  });

  it('Test form password field valid', () => {
    const password = component.testForm.controls.password;
    password.setValue('password');
    // expect(password.min)
    expect(password.valid).toBeTruthy('No Value provided');
    expect(password.errors).toBeNull('');
  });

  it('Test form password field invalid', () => {
    const password = component.testForm.controls.password;
    expect(password.valid).toBeFalsy('password became valid');
    expect(password.errors).toBeTruthy('No errors thrown');
    expect(password.errors.required).toBeTruthy('Field filled');
    password.setValue('pass');
    expect(password.errors.minlength).toBeTruthy('min length is more than 6');
  });

  it ('Button disabled endabled test', () => {
    const submitButton = el.query(By.css('.submit-button'));
    const form = component.weatherForm;

    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTruthy('Button not disabled');

    const city = form.controls.city;
    city.setValue('Kakinada');
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalsy('Button disabled');
  });
});
