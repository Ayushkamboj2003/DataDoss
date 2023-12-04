import { ABP, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import type { GetFieldTypesInput, FieldTypeDto } from '../../../proxy/field-types/models';
import { FieldTypeService } from '../../../proxy/field-types/field-type.service';
@Component({
  selector: 'app-field-type',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './field-type.component.html',
  styles: [],
})
export class FieldTypeComponent implements OnInit {
  data: PagedResultDto<FieldTypeDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetFieldTypesInput;

  form: FormGroup;

  isFiltersHidden = true;

  isModalBusy = false;

  isModalOpen = false;

  selected?: FieldTypeDto;

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: FieldTypeService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const getData = (query: ABP.PageQueryParams) =>
      this.service.getList({
        ...query,
        ...this.filters,
        filterText: query.filter,
      });

    const setData = (list: PagedResultDto<FieldTypeDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetFieldTypesInput;
  }

  buildForm() {
    const { name, htmlObjectType, fieldDataType } = this.selected || {};

    this.form = this.fb.group({
      name: [
        name ?? null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      ],
      htmlObjectType: [htmlObjectType ?? null, [Validators.maxLength(255)]],
      fieldDataType: [fieldDataType ?? null, [Validators.maxLength(50)]],
    });
  }

  hideForm() {
    this.isModalOpen = false;
    this.form.reset();
  }

  showForm() {
    this.buildForm();
    this.isModalOpen = true;
  }

  submitForm() {
    if (this.form.invalid) return;

    const request = this.selected
      ? this.service.update(this.selected.id, this.form.value)
      : this.service.create(this.form.value);

    this.isModalBusy = true;

    request
      .pipe(
        finalize(() => (this.isModalBusy = false)),
        tap(() => this.hideForm())
      )
      .subscribe(this.list.get);
  }

  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: FieldTypeDto) {
    this.selected = record;
    this.showForm();
  }

  delete(record: FieldTypeDto) {
    this.confirmation
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.service.delete(record.id))
      )
      .subscribe(this.list.get);
  }
}
