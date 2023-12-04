import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LottoProduzioneComponent } from './lotto-produzione.component';

const routes: Routes = [{ path: '', component: LottoProduzioneComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LottoProduzioneRoutingModule { }
