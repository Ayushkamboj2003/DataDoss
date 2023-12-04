import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsmindToolbarComponent } from './dsmind-toolbar.component';

describe('DsmindToolbarComponent', () => {
  let component: DsmindToolbarComponent;
  let fixture: ComponentFixture<DsmindToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsmindToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsmindToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
