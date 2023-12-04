import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsmindTopbarComponent } from './dsmind-topbar.component';

describe('DsmindTopbarComponent', () => {
  let component: DsmindTopbarComponent;
  let fixture: ComponentFixture<DsmindTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsmindTopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsmindTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
