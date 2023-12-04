import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsmindFooterComponent } from './dsmind-footer.component';

describe('DsmindFooterComponent', () => {
  let component: DsmindFooterComponent;
  let fixture: ComponentFixture<DsmindFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsmindFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsmindFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
