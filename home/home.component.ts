import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated
  }

  constructor(
          private authService: AuthService,
          private router: Router
    ) {}

  login() {
    this.authService.navigateToLogin();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.hasLoggedIn) {

      this.router.navigate(['/dashboard'])
    }
  }
}
