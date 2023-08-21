import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { __await } from 'tslib';



@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.css']
})
export class AuthCardComponent {

  emailLogin!: string;
  passwordLogin!: string;

  emailsignup!: string;
  passwordsignup!: string;

  constructor(private authService: AuthService) {
    
  }
  
  
  
  logIn() {
    //todo: Debo capturar el stsTokenManager para guardarlo en el SessionStorage y hacer que el usuario permanezca loggueado
    this.authService.signIn(this.emailLogin, this.passwordLogin)
    // this.authService.getEmail().subscribe((email)=> console.log("log from controler",email))
    
    
    
  }

  register() {
    this.authService.signUp(this.emailsignup, this.passwordsignup)
  }


  logOut() {
    this.authService.signOut()
  }








}
