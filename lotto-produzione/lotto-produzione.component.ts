
import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { abpLottoProduzioneDto, lottoProduzioneService } from '@proxy/LottoProduzione';

@Component({
  selector: 'app-lotto-produzione',
  templateUrl: './lotto-produzione.component.html',
  styleUrls: ['./lotto-produzione.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class LottoProduzioneComponent implements OnInit{
  LottoProduzione = { items: [], totalCount: 0 } as PagedResultDto<abpLottoProduzioneDto>;
  
  isModalOpen = false;
  form: FormGroup;
  selectedLottiProduzione = {} as abpLottoProduzioneDto;
  
  constructor(
    public readonly list: ListService,
    private lottoproduzioneService: lottoProduzioneService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    public router : Router
  ){}
  ngOnInit(): void {
   

  
     
    };
  }



