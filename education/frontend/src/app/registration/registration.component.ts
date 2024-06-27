import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.username, this.password).subscribe(() => {
      alert('Regisztráció sikeres!');
    }, error => {
      alert('Regisztráció sikertelen: ' + error.message);
    });
  }
}
