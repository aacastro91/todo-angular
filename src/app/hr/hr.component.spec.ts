import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrComponent } from './hr.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('HrComponent', () => {
  let component: HrComponent;
  let fixture: ComponentFixture<HrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('componente criado', () => {
    expect(component).toBeTruthy();
  });

  it('usando hr tag', () => {
    const de: DebugElement = fixture.debugElement;
    const hr = fixture.nativeElement.querySelector('hr');
    expect(hr).toBeTruthy();
  });

});
