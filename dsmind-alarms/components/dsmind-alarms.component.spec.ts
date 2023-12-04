import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsmindAlarmsComponent } from './dsmind-alarms.component';

describe('DsmindAlarmsComponent', () => {
  let component: DsmindAlarmsComponent;
  let fixture: ComponentFixture<DsmindAlarmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsmindAlarmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsmindAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
