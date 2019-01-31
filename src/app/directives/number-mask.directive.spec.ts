import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NumberMaskDirective } from './number-mask.directive';

@Component({
  template: '<input type="text" appNumberMask>'
})
class TestDirectiveComponent { }


describe('NumberMaskDirective', () => {
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let inputEl: any;
  // Behaviour of this directive must be tested in E2E due to Chromium inconsistencies with programmatically generated keyboard events

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, NumberMaskDirective]
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    const directive = new NumberMaskDirective(inputEl);
    expect(directive).toBeTruthy();
  });
});
