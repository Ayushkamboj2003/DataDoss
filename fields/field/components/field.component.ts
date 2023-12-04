import { ABP, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import type {
  GetFieldsInput,
  FieldWithNavigationPropertiesDto,
} from '../../../proxy/fields/models';
import { FieldService } from '../../../proxy/fields/field.service';
@Component({
  selector: 'app-field',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './field.component.html',
  styles: [],
})
export class FieldComponent implements OnInit {
  data: PagedResultDto<FieldWithNavigationPropertiesDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetFieldsInput;

  form: FormGroup;

  isFiltersHidden = true;

  isModalBusy = false;

  isModalOpen = false;

  selected?: FieldWithNavigationPropertiesDto;

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: FieldService,
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

    const setData = (list: PagedResultDto<FieldWithNavigationPropertiesDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetFieldsInput;
  }

  buildForm() {
    const {
      name,
      minLenght,
      isNullable,
      isEnableable,
      maxLenght,
      defaultValue,
      renderingOrder,
      cssClass,
      labelDescription,
      hasLookup,
      visionServerParameterID,
      fieldTypeId,
      toolGroupId,
    } = this.selected?.field || {};

    this.form = this.fb.group({
      name: [
        name ?? null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(255)],
      ],
      minLenght: [minLenght ?? null, []],
      isNullable: [isNullable ?? 'false', []],
      isEnableable: [isEnableable ?? 'false', []],
      maxLenght: [maxLenght ?? null, []],
      defaultValue: [defaultValue ?? null, [Validators.maxLength(255)]],
      renderingOrder: [renderingOrder ?? '1', []],
      cssClass: [cssClass ?? null, [Validators.maxLength(255)]],
      labelDescription: [
        labelDescription ?? null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(255)],
      ],
      hasLookup: [hasLookup ?? 'false', []],
      visionServerParameterID: [visionServerParameterID ?? null, []],
      fieldTypeId: [fieldTypeId ?? null, [Validators.required]],
      toolGroupId: [toolGroupId ?? null, [Validators.required]],
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
      ? this.service.update(this.selected.field.id, this.form.value)
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

  update(record: FieldWithNavigationPropertiesDto) {
    this.selected = record;
    this.showForm();
  }

  delete(record: FieldWithNavigationPropertiesDto) {
    this.confirmation
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.service.delete(record.field.id))
      )
      .subscribe(this.list.get);
  }
}
