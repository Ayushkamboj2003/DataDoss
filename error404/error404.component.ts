import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ToasterService } from '@abp/ng.theme.shared';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
})
export class Error404Component implements AfterViewInit {
  showComponent = true;
  // @ViewChild('toastContainer', { read: ElementRef }) toastContainer: ElementRef;
  // constructor(private toastrService: ToasterService) {}

  myError: string = 'Error 400: Your request is not vaild';


  ngAfterViewInit() {

  }


}
