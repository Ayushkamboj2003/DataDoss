import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineSettingsGroupComponent } from './machine-settings-group.component';

describe('MachineSettingsGroupComponent', () => {
  let component: MachineSettingsGroupComponent;
  let fixture: ComponentFixture<MachineSettingsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineSettingsGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineSettingsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
