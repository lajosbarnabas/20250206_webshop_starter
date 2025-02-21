import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
  model = {
    name: '',
    email: '',
    password: '',
  };
  errorMessage = '';

  register(){
    if(!this.model.name || !this.model.email || !this.model.password){
      this.errorMessage = 'Az összes mező kitöltése kötelező!';
      return;
    }
    this.authService.register(this.model.name, this.model.email, this.model.password).subscribe({
      next: (response) => {
        if(response){
          alert('Sikeres regisztráció!');
          this.router.navigate(['products']);
        }
        else{
          this.errorMessage = "A regisztráció során hiba történt!";
        }
      },
      error: (error) =>{
        this.errorMessage = error.error.message ?? error.message ?? "A regisztráció során hiba történt!";
      }
    });
  }
}
