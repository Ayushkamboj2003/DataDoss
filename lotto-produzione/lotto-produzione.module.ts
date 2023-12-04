import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LottoProduzioneRoutingModule } from './lotto-produzione-routing.module';
import { LottoProduzioneComponent } from './lotto-produzione.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LottoProduzioneComponent
  ],
  imports: [
    CommonModule,
    LottoProduzioneRoutingModule,
    SharedModule,

  ]
})
export class LottoProduzioneModule { }
