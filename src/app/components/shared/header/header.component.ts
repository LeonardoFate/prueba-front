import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="app-header">
      <div class="container-fluid">
        <div class="row align-items-center py-3">
          <div class="col-md-4">
            <h3 class="brand-name mb-0">Phantom<span class="brand-highlight">X</span></h3>
          </div>
          <div class="col-md-4 text-center">
            <h4>veris<span class="veris-arrow">▼</span></h4>
          </div>
          <div class="col-md-4 text-right">
            <span class="user-name" *ngIf="user">{{ user.name }}</span>
            <button class="btn btn-sm btn-outline-secondary ml-2" (click)="logout()">
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .brand-name {
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }

    .brand-highlight {
      color: #4A90E2;
    }

    .user-name {
      color: #666;
      font-size: 14px;
    }
  `]
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}