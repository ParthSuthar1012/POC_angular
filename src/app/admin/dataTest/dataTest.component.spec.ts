/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DataTestComponent } from './dataTest.component';

describe('DataTestComponent', () => {
  let component: DataTestComponent;
  let fixture: ComponentFixture<DataTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
