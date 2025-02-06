import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model = {
    email: '',
    password: ''
  };
  errorMessage = "";

  constructor(private authService: AuthService, private router: Router) {}

  login(){
    if(!this.model.email || !this.model.password){
      this.errorMessage = 'Az email és jelszó megadása kötelező!';
      return;
    }

    this.authService.login(this.model.email, this.model.password).subscribe({
      next: (response) => {
        if(this.authService.loggedInUser?.roles.includes('admin')){
          this.router.navigate(['admin']);
        }
        else{
          this.router.navigate(['orders'])
        }
      },
      error: (error) =>{
        this.errorMessage = error.error.message ?? error.message;
      }
    });
  }
}
