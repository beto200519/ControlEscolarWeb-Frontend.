import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  // Simulación de base de datos de usuarios
  private usuarios = [
    {
      username: 'admin@escuela.edu',
      password: 'admin123',
      role: 'admin',
      name: 'Administrador',
      redirect: '/admin'
    },
    {
      username: 'docente@escuela.edu',
      password: 'docente123',
      role: 'teacher',
      name: 'Dr. Roberto Mendez',
      redirect: '/teacher'
    },
    {
      username: 'A001',
      password: 'alumno123',
      role: 'student',
      name: 'Ana García López',
      redirect: '/student'
    }
  ];

  constructor(private router: Router) {}

  // Método para alternar visibilidad de contraseña
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    // Limpiar mensajes anteriores
    this.errorMessage = '';
    this.successMessage = '';

    // Validar campos vacíos
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    // Mostrar carga (RNF-03: tiempo < 2 segundos)
    this.isLoading = true;

    // Simular tiempo de respuesta
    setTimeout(() => {
      // Buscar usuario
      const usuario = this.usuarios.find(u => 
        u.username.toLowerCase() === this.username.toLowerCase() && 
        u.password === this.password
      );

      this.isLoading = false;

      if (usuario) {
        // RF-02: El sistema detecta el rol automáticamente
        this.successMessage = `Rol detectado: ${usuario.role.toUpperCase()} - Redirigiendo...`;

        // Guardar sesión (simulación)
        localStorage.setItem('currentUser', JSON.stringify({
          username: usuario.username,
          role: usuario.role,
          name: usuario.name,
          loginTime: new Date().toISOString()
        }));

        // Redirigir según rol detectado
        setTimeout(() => {
          this.router.navigate([usuario.redirect]);
        }, 1500);

      } else {
        this.errorMessage = 'Credenciales incorrectas. Verifica tu usuario y contraseña.';
      }

    }, 1500); // Simula RNF-03: tiempo < 2 segundos
  }
}