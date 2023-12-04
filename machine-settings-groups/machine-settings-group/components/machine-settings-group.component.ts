import { ABP, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { GetMachineSettingsGroupsInput, MachineSettingsGroupService, MachineSettingsGroupWithNavigationPropertiesDto } from '@proxy/machine-settings-groups';
@Component({
  selector: 'app-machine-settings-group',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './machine-settings-group.component.html',
  styleUrls: ['./machine-settings-group.component.scss']
})
export class MachineSettingsGroupComponent implements OnInit {

  data: PagedResultDto<MachineSettingsGroupWithNavigationPropertiesDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetMachineSettingsGroupsInput;

  form: FormGroup;

  isFiltersHidden = true;

  isModalBusy = false;

  isModalOpen = false;

  selected?: MachineSettingsGroupWithNavigationPropertiesDto;

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: MachineSettingsGroupService,
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

    const setData = (list: PagedResultDto<MachineSettingsGroupWithNavigationPropertiesDto>) =>
      (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetMachineSettingsGroupsInput;
  }

  buildForm() {
    const {
      groupDescription,
      cssClass,
      isEnableable,
      renderingOrder,
      parentToolRenderingOrder,
      parentToolGroupId,
    } = this.selected?.machineSettingsGroup || {};

    this.form = this.fb.group({
      groupDescription: [groupDescription ?? null, [Validators.required, Validators.maxLength(50)]],
      cssClass: [cssClass ?? null, [Validators.maxLength(50)]],
      isEnableable: [isEnableable ?? 'false', []],
      renderingOrder: [renderingOrder ?? '1', []],
      parentToolRenderingOrder: [parentToolRenderingOrder ?? '1', []],
      parentToolGroupId: [parentToolGroupId ?? null, []],
      // toolId: [toolId ?? null, [Validators.required]],
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
      ? this.service.update(this.selected.machineSettingsGroup.id, this.form.value)
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

  update(record: MachineSettingsGroupWithNavigationPropertiesDto) {
    this.selected = record;
    this.showForm();
  }

  delete(record: MachineSettingsGroupWithNavigationPropertiesDto) {
    this.confirmation
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.service.delete(record.machineSettingsGroup.id))
      )
      .subscribe(this.list.get);
  }
}
