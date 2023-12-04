import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoProduzioneComponent } from './lotto-produzione.component';

describe('LottoProduzioneComponent', () => {
  let component: LottoProduzioneComponent;
  let fixture: ComponentFixture<LottoProduzioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottoProduzioneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LottoProduzioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
