import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamiento',
  template: `
    <div class="agendamiento-container">
      <div class="submenu-bar">
        <div class="container-fluid">
          <div class="d-flex align-items-center">
            <button class="btn btn-link back-button" routerLink="/module-selection">
              <i class="fas fa-arrow-left"></i>
            </button>
            <span class="module-title">Agendamiento</span>
          </div>
        </div>
      </div>

      <div class="content-area">
        <div class="container">
          <div class="text-center mt-5">
            <i class="fas fa-calendar-alt fa-5x text-primary mb-4"></i>
            <h2>Módulo de Agendamiento</h2>
            <p class="text-muted">Este módulo está en desarrollo</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .agendamiento-container {
      min-height: 100vh;
      background-color: #f5f7fa;
    }

    .submenu-bar {
      background: linear-gradient(90deg, #28a745 0%, #20c997 100%);
      padding: 15px 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .back-button {
      color: white;
      font-size: 18px;
      padding: 5px 15px;
      text-decoration: none;
    }

    .module-title {
      color: white;
      font-size: 18px;
      font-weight: 600;
      margin-left: 15px;
    }

    .content-area {
      padding: 60px 20px;
    }
  `]
})
export class AgendamientoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}