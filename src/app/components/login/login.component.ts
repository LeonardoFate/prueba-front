import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Si ya está autenticado, redirigir
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/module-selection']);
    }
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor ingrese usuario y contraseña';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.isLoading = false;
        if (response.success) {
          // Guardar token y usuario
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          
          // Redirigir a selección de módulos
          this.router.navigate(['/module-selection']);
        } else {
          this.errorMessage = response.message || 'Error al iniciar sesión';
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Error de conexión. Por favor intente nuevamente.';
      }
    );
  }

  forgotPassword(): void {
    alert('Funcionalidad de recuperación de contraseña');
  }
}